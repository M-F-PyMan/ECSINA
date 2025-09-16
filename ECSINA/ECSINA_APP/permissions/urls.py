from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, PermissionViewSet, RoleHasPermissionViewSet

app_name = "permission"


router = DefaultRouter()
router.register(r'roles', RoleViewSet)
router.register(r'permissions', PermissionViewSet)
router.register(r'role-permissions', RoleHasPermissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

