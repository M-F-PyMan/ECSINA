from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User
from django.core.exceptions import PermissionDenied
class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="رمز عبور", widget=forms.PasswordInput)
    password2 = forms.CharField(label="تکرار رمز عبور", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'name', 'mobile', 'role', 'is_consultant_admin')

    def clean_password2(self):
        p1 = self.cleaned_data.get("password1")
        p2 = self.cleaned_data.get("password2")
        if p1 and p2 and p1 != p2:
            raise forms.ValidationError("رمز عبور و تکرار آن یکسان نیستند")
        return p2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)
        # اگر غیرمالک است، فیلد پسورد را فقط‌خواندنی کن
        if self.request and not (self.request.user.is_superuser or getattr(self.request.user.role, 'name', '') == 'owner'):
            if 'password' in self.fields:
                self.fields['password'].disabled = True

    def clean(self):
        cleaned = super().clean()
        # ممنوعیت تغییر پسورد مالک برای غیرمالک
        if self.request:
            is_owner_requester = (self.request.user.is_superuser or getattr(self.request.user.role, 'name', '') == 'owner')
            is_target_owner = (getattr(self.instance.role, 'name', '') == 'owner' or self.instance.is_superuser)
            if not is_owner_requester and is_target_owner:
                # هرگونه تغییر روی مالک ممنوع
                raise PermissionDenied("اجازه تغییر مالک را نداری.")
        return cleaned