from django.shortcuts import render
from rest_framework import viewsets
from .models import FAQ
from .serializers import FAQSerializer
from permissions.permissions import IsAdminOrOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all().order_by('-created_at')
    serializer_class = FAQSerializer
    permission_classes = [IsAdminOrOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save()

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        title = self.request.query_params.get('title')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if title:
            queryset = queryset.filter(title__icontains=title)
        if from_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(to_date))

        return queryset



