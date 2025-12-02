from django.contrib import admin
from django import forms
from .models import Role, Permission, RoleHasPermission

# فرم سفارشی برای مدیریت مجوزهای نقش
class RoleAdminForm(forms.ModelForm):
    permissions = forms.ModelMultipleChoiceField(
        queryset=Permission.objects.all(),
        required=False,
        widget=admin.widgets.FilteredSelectMultiple("مجوزها", is_stacked=False)
    )

    class Meta:
        model = Role
        fields = ['name', 'label', 'description', 'permissions']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['permissions'].initial = self.instance.permissions.all()

    def save(self, commit=True):
        role = super().save(commit=False)
        if commit:
            role.save()
        if role.pk:
            current_perms = set(role.permissions.all())
            new_perms = set(self.cleaned_data['permissions'])

            # حذف مجوزهای قدیمی
            for perm in current_perms - new_perms:
                RoleHasPermission.objects.filter(role=role, permission=perm).delete()

            # افزودن مجوزهای جدید
            for perm in new_perms - current_perms:
                RoleHasPermission.objects.create(role=role, permission=perm)

        return role

# ثبت مدل‌ها در پنل ادمین
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    form = RoleAdminForm
    list_display = ['name', 'label', 'description']
    search_fields = ['name', 'label']
    list_filter = ['created_at']

@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'label']
    search_fields = ['code', 'name', 'label']
    list_filter = ['created_at']

@admin.register(RoleHasPermission)
class RoleHasPermissionAdmin(admin.ModelAdmin):
    list_display = ['role', 'permission', 'is_active', 'assigned_at']
    list_filter = ['is_active', 'assigned_at']
    search_fields = ['role__name', 'permission__code']
