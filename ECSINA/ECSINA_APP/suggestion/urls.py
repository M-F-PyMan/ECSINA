# suggestions/urls.py
from rest_framework.routers import DefaultRouter
from .views import SuggestionTextViewSet

router = DefaultRouter()
router.register(r'suggestions', SuggestionTextViewSet, basename='suggestion')

urlpatterns = router.urls
