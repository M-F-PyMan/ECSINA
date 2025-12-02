from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, TempUser, Profile, UserCategory, UserCategoryItem
from permissions.models import Role
from .forms import UserCreationForm,UserChangeForm
from django.core.exceptions import PermissionDenied




# فرم سفارشی برای نقش کاربر
class CustomUserAdminForm(UserChangeForm):
    role = forms.ModelChoiceField(
        queryset=Role.objects.all(),
        required=False,
        label="نقش کاربر"
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = getattr(self, "request", None)
        if request and not (request.user.is_superuser or getattr(request.user.role, 'name', '') == 'owner'):
            self.fields.pop('is_consultant_admin', None)






class CustomUserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User

    list_display = ('email', 'name', 'mobile', 'role', 'is_consultant_admin', 'is_staff', 'is_active', 'deleted_by')
    list_filter = ('is_staff', 'is_active', 'role', 'is_consultant_admin')

    fieldsets = (
        (None, {'fields': ('email', 'name', 'mobile', 'password', 'role', 'is_consultant_admin')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'mobile', 'password1', 'password2', 'role', 'is_consultant_admin', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'name', 'mobile')
    ordering = ('email',)

    # فقط مالک اجازه اضافه کردن کاربر دارد
    def has_add_permission(self, request):
        return request.user.is_owner

    # فقط مالک اجازه تغییر کاربر دارد
    def has_change_permission(self, request, obj=None):
        return request.user.is_owner

    # readonly کردن فیلدهای حساس برای غیرمالک
    def get_readonly_fields(self, request, obj=None):
        base = set(super().get_readonly_fields(request, obj))
        if not request.user.is_owner:
            base |= {
                'password', 'is_superuser', 'groups', 'user_permissions',
                'role', 'is_consultant_admin', 'is_staff'
            }
        return tuple(base)

    # جلوگیری از تغییر رمز توسط غیرمالک
    def save_model(self, request, obj, form, change):
        if not request.user.is_owner:
            if 'password' in getattr(form, 'changed_data', []):
                raise PermissionDenied("اجازه‌ی تغییر رمز را نداری.")
            if obj.is_owner:
                raise PermissionDenied("اجازه‌ی تغییر مالک را نداری.")
        super().save_model(request, obj, form, change)

    # ویوی تغییر رمز فقط برای مالک
    def user_change_password(self, request, id, form_url=''):
        if not request.user.is_owner:
            raise PermissionDenied("اجازه‌ی تغییر رمز را نداری.")
        return super().user_change_password(request, id, form_url=form_url)

# ثبت مدل‌ها
admin.site.register(User, CustomUserAdmin)
admin.site.register(TempUser)
admin.site.register(Profile)

@admin.register(UserCategory)
class UserCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'created_at']
    search_fields = ['title', 'user__email']
    list_filter = ['created_at']

@admin.register(UserCategoryItem)
class UserCategoryItemAdmin(admin.ModelAdmin):
    list_display = ['user_category', 'file', 'added_at']
    search_fields = ['user_category__title', 'file__title']
    list_filter = ['added_at']
