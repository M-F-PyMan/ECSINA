from django.db import models
from django.utils import timezone



class Permission(models.Model):
    name = models.CharField("Permission Name", max_length=100, unique=True)
    code = models.CharField("Code", max_length=100, unique=True)  # برای استفاده در کد
    label = models.CharField("Label", max_length=255, blank=True, null=True)
    description = models.TextField("Description", blank=True, null=True)
    created_at = models.DateTimeField("Created At", default=timezone.now)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "permissions"
        ordering = ["-created_at"]  # آخرین مجوزها اول نمایش داده شوند


class Role(models.Model):
    name = models.CharField("Role Name", max_length=100, unique=True)
    label = models.CharField("Label", max_length=255, blank=True, null=True)
    description = models.TextField("Description", blank=True, null=True)
    created_at = models.DateTimeField("Created At", default=timezone.now)

    permissions = models.ManyToManyField(
        Permission,
        through='RoleHasPermission',
        related_name='roles'
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = "roles"
        ordering = ["-created_at"]  # آخرین نقش‌ها اول نمایش داده شوند


class RoleHasPermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField("Assigned At", default=timezone.now)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.role.name} → {self.permission.code}"

    class Meta:
        db_table = "role_has_permissions"
        unique_together = ("role", "permission")
        ordering = ["-assigned_at"]  # آخرین اتصال‌ها اول نمایش داده شوند
