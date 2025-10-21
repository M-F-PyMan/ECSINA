from rest_framework import viewsets
from .models import SuggestionText
from .serializers import SuggestionTextSerializer

class SuggestionTextViewSet(viewsets.ModelViewSet):
    queryset = SuggestionText.objects.all()
    serializer_class = SuggestionTextSerializer
