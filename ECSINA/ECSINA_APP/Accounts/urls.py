from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserViewSet, ProfileViewSet, TempUserViewSet, DeleteUserView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'temp-users', TempUserViewSet)

urlpatterns = router.urls + [
    path('users/<int:user_id>/delete/', DeleteUserView.as_view(), name='delete-user'),
]
