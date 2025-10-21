from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone




class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20, unique=True)
    sms_sent_code = models.CharField(max_length=10, blank=True, null=True)
    sms_sent_date = models.DateTimeField(blank=True, null=True)
    sms_sent_tries = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "mobile"]

    objects = UserManager()

    def __str__(self):
        return self.email
    class Meta:
        db_table = "users"
        ordering = ["-date_joined"]    

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
    if extra_fields.get('is_staff') is not True:
        raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
        raise ValueError('Superuser must have is_superuser=True.')

    return self.create_user(email, password, **extra_fields)
   


class Profile(models.Model):
    user = models.OneToOneField(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='profile'
    )
    bio = models.TextField("Biography", blank=True, null=True)
    avatar = models.ImageField("Avatar", upload_to='avatars/', blank=True, null=True)
    birth_date = models.DateField("Birth Date", blank=True, null=True)
    location = models.CharField("Location", max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.email}"

    class Meta:
        db_table = "user_profiles"
        ordering = ["user__email"]


class TempUser(models.Model):
    email = models.EmailField("Email Address", unique=True)
    mobile = models.CharField("Mobile Number", max_length=20, unique=True)
    sms_sent_code = models.CharField("SMS Code", max_length=10)
    sms_sent_date = models.DateTimeField("SMS Sent Date")
    sms_sent_tries = models.IntegerField("SMS Attempts", default=0)

    def __str__(self):
        return self.email

    class Meta:
        db_table = "temp_users"
        ordering = ["-sms_sent_date"]



