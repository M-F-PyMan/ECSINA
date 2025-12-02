from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, PermissionViewSet, RoleHasPermissionViewSet

router = DefaultRouter()
router.register(r'roles', RoleViewSet)
router.register(r'permissions', PermissionViewSet)
router.register(r'role-permissions', RoleHasPermissionViewSet)

urlpatterns = router.urls
