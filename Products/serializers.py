from rest_framework import serializers
from .models import Category, Product, Image
from suggestion.serializers import ProposalSerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# product/serializers.py



class ProductSerializer(serializers.ModelSerializer):
    proposal_title = serializers.CharField(source='proposal.title', read_only=True)
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'proposal', 'proposal_title',
            'price', 'discount_percent', 'final_price',
            'is_available', 'is_featured', 'sold_count',
            'allow_preview', 'allow_download_after_payment',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'sold_count']

    def get_final_price(self, obj):
        return obj.final_price()

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
