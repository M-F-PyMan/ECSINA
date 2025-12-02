from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, FailedJobViewSet, JobBatchViewSet

app_name = 'jobs'

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'failed-jobs', FailedJobViewSet)
router.register(r'batches', JobBatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
