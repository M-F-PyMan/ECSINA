from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Role, Permission, RoleHasPermission
from .custom import  IsAdminRole
from .serializers import RoleSerializer, PermissionSerializer, RoleHasPermissionSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated, IsAdminRole()]  #بسیار مهم ، دسترسی ها میبایست توسط ادمین اصلی تعیین شوند

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated, IsAdminRole()]  # بسیار مهم ، دسترسی ها میبایست توسط ادمین اصلی تعیین شوند


class RoleHasPermissionViewSet(viewsets.ModelViewSet):
    queryset = RoleHasPermission.objects.all()
    serializer_class = RoleHasPermissionSerializer
   permission_classes = [IsAuthenticated, IsAdminRole()]  # بسیار مهم ، دسترسی ها میبایست توسط ادمین اصلی تعیین شوند

