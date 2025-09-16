from rest_framework import viewsets
from .models import Role, Permission, RoleHasPermission
from .serializers import RoleSerializer, PermissionSerializer, RoleHasPermissionSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class RoleHasPermissionViewSet(viewsets.ModelViewSet):
    queryset = RoleHasPermission.objects.all()
    serializer_class = RoleHasPermissionSerializer
