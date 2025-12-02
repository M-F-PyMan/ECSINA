from rest_framework.permissions import BasePermission

class RoleRequired(BasePermission):
    def __init__(self, role_name):
        self.role_name = role_name

    def has_permission(self, request, view):
        user = request.user
        return hasattr(user, 'roles') and user.roles.filter(name=self.role_name).exists()

def IsAdminRole():
    return RoleRequired('admin')
