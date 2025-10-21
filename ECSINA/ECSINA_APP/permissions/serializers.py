from rest_framework import serializers
from .models import Role, Permission, RoleHasPermission

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Role
        fields = '__all__'

class RoleHasPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleHasPermission
        fields = '__all__'
