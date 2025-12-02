from rest_framework.routers import DefaultRouter
from .views import CommentViewSet,CommentReplyViewSet

router = DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'comment-replies', CommentReplyViewSet)


urlpatterns = router.urls
