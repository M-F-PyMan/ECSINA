from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from Products.models import Product, Category
from Products.serializers import ProductSerializer, CategorySerializer
from comments.models import Comment
from comments.serializers import CommentSerializer
class HomeViewSet(ViewSet):
    def list(self, request):
        categories = Category.objects.all()
        products = Product.objects.all().order_by("-created_at")
        comments = Comment.objects.all().order_by('-created_at')[:10]
        return Response({
            "categories": CategorySerializer(categories, many=True).data,
            "products": ProductSerializer(products, many=True).data,
            "comments": CommentSerializer(comments, many=True).data,
        })
