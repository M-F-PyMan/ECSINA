from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from permissions.models import Role
from datetime import timedelta
import secrets
import requests
from django.conf import settings  # برای AUTH_USER_MODEL


# نقش‌های قابل انتخاب برای کاربران
ROLE_CHOICES = [
    ('member', 'عضو'),
    ('admin', 'ادمین'),
    ('owner', 'مالک'),
]


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        if 'role' not in extra_fields:
            try:
                owner_role = Role.objects.get(name='owner')
                extra_fields['role'] = owner_role
            except Role.DoesNotExist:
                pass

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20, unique=True)


    # آخرین کد ارسال‌شده
    sms_sent_code = models.CharField(max_length=10, blank=True, null=True)
    # زمان آخرین ارسال
    sms_sent_date = models.DateTimeField(blank=True, null=True)
    # شمارنده تعداد ارسال یا تلاش
    sms_sent_tries = models.IntegerField(default=0)
    # شمارنده تلاش برای وارد کردن کد
    otp_verify_attempts = models.IntegerField(default=0)
    otp_last_attempt_at = models.DateTimeField(blank=True, null=True)

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    updated_by = models.ForeignKey('Accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_users')
    deleted_by = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='deleted_users')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_consultant_admin = models.BooleanField(default=False, help_text="اگر فعال باشد، کاربر همزمان نقش مشاور و ادمین دارد.")

    date_joined = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    user_job = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    field = models.CharField(max_length=100, blank=True, null=True)
    meet = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "mobile"]

    objects = UserManager()

    @property
    def is_owner(self):
        return self.is_superuser or (self.role and self.role.name == 'owner')

    def __str__(self):
        return self.email

    def get_role_display(self):
        return self.role.label if self.role else "-"


class Profile(models.Model):
    user = models.OneToOneField('Accounts.User', on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.email}"


class TempUser(models.Model):
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20, unique=True)
    sms_sent_code = models.CharField(max_length=10)
    sms_sent_date = models.DateTimeField()
    sms_sent_tries = models.IntegerField(default=0)

    def __str__(self):
        return self.email


class UserProposalUpload(models.Model):
    user = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, related_name='uploaded_proposals')
    original_proposal = models.ForeignKey('suggestion.Proposal', on_delete=models.SET_NULL, null=True, blank=True, related_name='user_uploads')
    file = models.FileField(upload_to='user_proposals/')
    description = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False)

    font_path = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'در انتظار بررسی'),
            ('approved', 'تأیید شده'),
            ('rejected', 'رد شده'),
            ('needs_review', 'نیاز به بازبینی'),
        ],
        default='pending'
    )
    feedback_text = models.TextField(blank=True, null=True)
    feedback_file = models.FileField(upload_to='proposal_feedbacks/', blank=True, null=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_proposals')
    reviewed_at = models.DateTimeField(blank=True, null=True)

    is_paid = models.BooleanField(default=False)
    is_free = models.BooleanField(default=False)
    is_editable = models.BooleanField(default=True)
    is_downloadable = models.BooleanField(default=True)

    def can_user_edit(self, user):
        return self.user == user or self.is_free or (self.is_paid and self.is_editable)

    def can_user_download(self, user):
        return self.user == user or self.is_free or (self.is_paid and self.is_downloadable)

    def __str__(self):
        return f"{self.user.email} - {self.original_proposal.title if self.original_proposal else 'بدون عنوان'}"


class ConsultantReply(models.Model):
    proposal_upload = models.OneToOneField(UserProposalUpload, on_delete=models.CASCADE, related_name='consultant_reply')
    consultant = models.ForeignKey('Accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='consultant_replies')
    message = models.TextField("پاسخ مشاور")
    file = models.FileField(upload_to='consultant_replies/', blank=True, null=True)
    replied_at = models.DateTimeField(auto_now_add=True)

    def get_display_name(self):
        if not self.consultant or not self.consultant.role:
            return "-"
        if self.consultant.role.name == 'owner':
            return "مالک سایت"
        if self.consultant.role.name == 'admin':
            return "ادمین سایت"
        return self.consultant.name


class UserCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_categories')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'title')


class UserCategoryItem(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'کم'),
        ('medium', 'متوسط'),
        ('high', 'بالا'),
    ]

    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    user_category = models.ForeignKey(UserCategory, on_delete=models.CASCADE, related_name='items')
    file = models.ForeignKey(UserProposalUpload, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_category', 'file')


class UserActivityLog(models.Model):
    ACTION_CHOICES = [
        ('edit', 'ویرایش'),
        ('review', 'بازبینی'),
        ('download', 'دانلود'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.ForeignKey(UserProposalUpload, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=50, choices=ACTION_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.action_type} - {self.file.title}"


class OTP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="otp_codes")
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expire_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    @classmethod
    def create_for_user(cls, user, expire_minutes=30):
        """تولید و ذخیره کد برای کاربر و آپدیت وضعیت در مدل User"""
        code = ''.join(secrets.choice("0123456789") for _ in range(6))
        expire_at = timezone.now() + timedelta(minutes=expire_minutes)
        otp = cls.objects.create(user=user, code=code, expire_at=expire_at)

        # آپدیت وضعیت در پروفایل کاربر
        user.sms_sent_code = code
        user.sms_sent_date = timezone.now()
        user.sms_sent_tries = (user.sms_sent_tries or 0) + 1
        user.save(update_fields=['sms_sent_code', 'sms_sent_date', 'sms_sent_tries'])
        return otp

    def send_sms(self, api_key, sms_url="https://api.farazsms.com/v1/send"):
        """ارسال کد از طریق FarazSMS با هندل خطا"""
        payload = {
            "mobile": self.user.mobile,
            "message": f"کد بازنشانی رمز عبور شما: {self.code}",
            "api_key": settings.FARAZ_SMS_API_KEY
        }
        try:
            response = requests.post(sms_url, data=payload, timeout=10)
            response.raise_for_status()
            return {"success": True, "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": str(e)}

    def is_valid(self):
        """بررسی اعتبار کد"""
        return (not self.is_used) and timezone.now() < self.expire_at

    def mark_used(self):
        """علامت‌گذاری کد به عنوان مصرف‌شده و ریست تلاش‌ها"""
        self.is_used = True
        self.save(update_fields=['is_used'])
        # ریست شمارنده تلاش‌ها بعد از موفقیت
        self.user.otp_verify_attempts = 0
        self.user.otp_last_attempt_at = timezone.now()
        self.user.save(update_fields=['otp_verify_attempts', 'otp_last_attempt_at'])

