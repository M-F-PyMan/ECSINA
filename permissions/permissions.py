from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import RoleHasPermission, Permission

class HasPermission(BasePermission):
    def __init__(self, permission_code):
        self.permission_code = permission_code

    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated or not hasattr(user, 'role') or not user.role:
            return False

        return RoleHasPermission.objects.filter(
            role=user.role,
            permission__code=self.permission_code,
            is_active=True
        ).exists()

class IsAdminOrOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['admin', 'owner']


class IsAdminOrOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True  # اجازه‌ی GET, HEAD, OPTIONS برای همه
        user = request.user
        return user.is_authenticated and (
            user.role and user.role.name in ['admin', 'owner']
        )


