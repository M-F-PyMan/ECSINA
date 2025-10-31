from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, TempUser, Profile
from permissions.models import Role

# فرم سفارشی برای تعیین نقش کاربر
class CustomUserAdminForm(forms.ModelForm):
    role = forms.ModelChoiceField(
        queryset=Role.objects.all(),
        required=False,
        label="نقش کاربر"
    )

    class Meta:
        model = User
        fields = '__all__'

# کلاس ادمین سفارشی با فرم سفارشی
class CustomUserAdmin(BaseUserAdmin):
    form = CustomUserAdminForm
    model = User
    list_display = ('email', 'name', 'mobile', 'role', 'is_staff', 'is_active','deleted_by')
    list_filter = ('is_staff', 'is_active', 'role')
    fieldsets = (
        (None, {'fields': ('email', 'name', 'mobile', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'mobile', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'name', 'mobile')
    ordering = ('email',)

# ثبت مدل‌ها در پنل ادمین
admin.site.register(User, CustomUserAdmin)
admin.site.register(TempUser)
admin.site.register(Profile)
