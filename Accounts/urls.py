from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import(
    UserViewSet,
    ProfileViewSet,
    TempUserViewSet,
    DeleteUserView,
    UserCategoryItemViewSet,
    UserCategoryViewSet,
    UserActivityLogViewSet,
    UserProposalUploadViewSet,
    RegisterView,
    LoginView,
    RefreshTokenView,
    LogoutView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'temp-users', TempUserViewSet)
router.register(r'user-categories', UserCategoryViewSet, basename='user-category')
router.register(r'user-category-items', UserCategoryItemViewSet, basename='user-category-item')
router.register(r'user-activity-log', UserActivityLogViewSet)
router.register(r'user-proposal-uploads', UserProposalUploadViewSet)

urlpatterns = router.urls + [
    path('users/<int:user_id>/delete/', DeleteUserView.as_view(), name='delete-user'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/refresh/', RefreshTokenView.as_view(), name='token-refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
]
