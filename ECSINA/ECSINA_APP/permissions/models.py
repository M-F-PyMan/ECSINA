from django.db import models

# 🔹 Permission Model
class Permission(models.Model):
    name = models.CharField("Permission Name", max_length=100, unique=True)
    label = models.CharField("Label", max_length=255, blank=True, null=True)
    description = models.TextField("Description", blank=True, null=True)
    created_at = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "permissions"
        ordering = ["name"]


# 🔹 Role Model
class Role(models.Model):
    name = models.CharField("Role Name", max_length=100, unique=True)
    label = models.CharField("Label", max_length=255, blank=True, null=True)
    description = models.TextField("Description", blank=True, null=True)
    created_at = models.DateTimeField("Created At", auto_now_add=True)

    permissions = models.ManyToManyField(
        Permission,
        through='RoleHasPermission',
        related_name='roles'
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = "roles"
        ordering = ["name"]


# 🔹 RoleHasPermission (Join Table)
class RoleHasPermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField("Assigned At", auto_now_add=True)

    def __str__(self):
        return f"{self.role.name} → {self.permission.name}"

    class Meta:
        db_table = "role_has_permissions"
        unique_together = ("role", "permission")
