from django.contrib import admin
from .models import Role, Permission, RoleHasPermission, ModelHasRole, ModelHasPermission

admin.site.register(Role)
admin.site.register(Permission)
admin.site.register(RoleHasPermission)
admin.site.register(ModelHasRole)
admin.site.register(ModelHasPermission)

# Register your models here.
