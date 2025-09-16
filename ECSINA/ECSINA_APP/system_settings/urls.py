from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SystemSettingViewSet

app_name='systems'


router = DefaultRouter()
router.register(r'settings', SystemSettingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

