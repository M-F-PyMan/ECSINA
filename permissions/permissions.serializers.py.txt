from rest_framework import serializers
from .models import Role, Permission, RoleHasPermission

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = [
            'id', 'name', 'code', 'label',
            'description', 'created_at'
        ]
        read_only_fields = ['created_at']


class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    permission_ids = serializers.PrimaryKeyRelatedField(
        queryset=Permission.objects.all(),
        many=True,
        write_only=True,
        source='permissions'
    )

    class Meta:
        model = Role
        fields = [
            'id', 'name', 'label', 'description',
            'created_at', 'permissions', 'permission_ids'
        ]
        read_only_fields = ['created_at']


class RoleHasPermissionSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    permission_code = serializers.CharField(source='permission.code', read_only=True)

    class Meta:
        model = RoleHasPermission
        fields = [
            'id', 'role', 'role_name',
            'permission', 'permission_code',
            'is_active', 'assigned_at'
        ]
        read_only_fields = ['assigned_at']
