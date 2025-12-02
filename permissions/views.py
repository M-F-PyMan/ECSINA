from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Role, Permission, RoleHasPermission
from .serializers import RoleSerializer, PermissionSerializer, RoleHasPermissionSerializer
from permissions.permissions import IsAdminOrOwner

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all().order_by('-created_at')
    serializer_class = PermissionSerializer
    permission_classes = [IsAdminOrOwner]


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all().order_by('-created_at')
    serializer_class = RoleSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        queryset = Role.objects.all()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset


class RoleHasPermissionViewSet(viewsets.ModelViewSet):
    queryset = RoleHasPermission.objects.select_related('role', 'permission').all().order_by('-assigned_at')
    serializer_class = RoleHasPermissionSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        queryset = RoleHasPermission.objects.select_related('role', 'permission').all()
        role_id = self.request.query_params.get('role')
        permission_id = self.request.query_params.get('permission')
        is_active = self.request.query_params.get('active')

        if role_id:
            queryset = queryset.filter(role_id=role_id)
        if permission_id:
            queryset = queryset.filter(permission_id=permission_id)
        if is_active in ['true', 'false']:
            queryset = queryset.filter(is_active=(is_active == 'true'))

        return queryset
