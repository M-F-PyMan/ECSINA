from rest_framework.routers import DefaultRouter
from .views import SuggestionTextViewSet

router = DefaultRouter()
router.register(r'suggestions', SuggestionTextViewSet)

urlpatterns = router.urls
