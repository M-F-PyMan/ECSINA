from rest_framework import viewsets, permissions
from .models import Category, Product, Image
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ImageSerializer,
    ProductDetailSerializer,
)
from permissions.permissions import IsAdminOrOwner
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('proposal').all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminOrOwner()]

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=True, methods=['get'])
    def detail(self, request, pk=None):
        product = self.get_object()
        serializer = ProductDetailSerializer(product, context={'request': request})
        return Response(serializer.data)




class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
