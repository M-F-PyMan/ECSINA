from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, TempUserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'temp-users', TempUserViewSet)

urlpatterns = router.urls
