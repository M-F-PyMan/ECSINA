from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from permissions.models import Role

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

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20, unique=True)
    sms_sent_code = models.CharField(max_length=10, blank=True, null=True)
    sms_sent_date = models.DateTimeField(blank=True, null=True)
    sms_sent_tries = models.IntegerField(default=0)

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    updated_by = models.ForeignKey('Accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_users')


    deleted_by = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL,related_name='deleted_users')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "mobile"]

    objects = UserManager()

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
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='reviewed_proposals')
    reviewed_at = models.DateTimeField(blank=True, null=True)

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
