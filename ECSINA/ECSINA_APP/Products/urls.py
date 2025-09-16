from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet,ImageViewSet

app_name = 'products'


router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'images', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),

]


