from rest_framework import serializers
from .models import Role, Permission, RoleHasPermission

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'guard_name']

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['id', 'name', 'guard_name']

class RoleHasPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleHasPermission
        fields = ['id', 'role', 'permission']
