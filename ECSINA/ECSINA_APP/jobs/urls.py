from rest_framework.routers import DefaultRouter
from .views import JobBatchViewSet, JobViewSet, FailedJobViewSet

router = DefaultRouter()
router.register(r'batches', JobBatchViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'failed-jobs', FailedJobViewSet)

urlpatterns = router.urls
