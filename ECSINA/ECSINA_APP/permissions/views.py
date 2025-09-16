from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Role, Permission, RoleHasPermission
from .serializers import RoleSerializer, PermissionSerializer, RoleHasPermissionSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated]

class RoleHasPermissionViewSet(viewsets.ModelViewSet):
    queryset = RoleHasPermission.objects.all()
    serializer_class = RoleHasPermissionSerializer
    permission_classes = [IsAuthenticated]
