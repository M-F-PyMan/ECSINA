from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, ImageViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'images', ImageViewSet)

urlpatterns = router.urls
