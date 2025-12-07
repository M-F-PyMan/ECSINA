from rest_framework import serializers
from .models import Category, Product, Image
from suggestion.serializers import (
    ProposalSerializer,
    ProposalVideoSerializer,
    ProposalRoadmapSerializer,
    ProposalGuidebookSerializer,
    ProposalSampleFileSerializer
)
from suggestion.models import (
    ProposalVideo,
    ProposalRoadmap,
    ProposalGuidebook,
    ProposalSampleFile,
)
from faq.serializers import FAQSerializer
from faq.models import FAQ

class ProductDetailSerializer(serializers.ModelSerializer):
    proposal = ProposalSerializer(read_only=True)
    final_price = serializers.SerializerMethodField()
    videos = serializers.SerializerMethodField()
    roadmaps = serializers.SerializerMethodField()
    guidebooks = serializers.SerializerMethodField()
    samples = serializers.SerializerMethodField()
    faqs = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'price', 'discount_percent', 'final_price',
            'is_available', 'is_featured', 'sold_count',
            'allow_preview', 'allow_download_after_payment',
            'proposal', 'created_at', 'updated_at',
            'videos', 'roadmaps', 'guidebooks', 'samples', 'faqs'
        ]

    def get_final_price(self, obj):
        return obj.final_price()

    def _proposal(self, obj):
        return getattr(obj, 'proposal', None)

    def get_videos(self, obj):
        p = self._proposal(obj)
        qs = ProposalVideo.objects.filter(proposal=p) if p else ProposalVideo.objects.none()
        return ProposalVideoSerializer(qs, many=True).data

    def get_roadmaps(self, obj):
        p = self._proposal(obj)
        qs = ProposalRoadmap.objects.filter(proposal=p) if p else ProposalRoadmap.objects.none()
        return ProposalRoadmapSerializer(qs, many=True).data

    def get_guidebooks(self, obj):
        p = self._proposal(obj)
        qs = ProposalGuidebook.objects.filter(proposal=p) if p else ProposalGuidebook.objects.none()
        return ProposalGuidebookSerializer(qs, many=True).data

    def get_samples(self, obj):
        p = self._proposal(obj)
        qs = ProposalSampleFile.objects.filter(proposal=p) if p else ProposalSampleFile.objects.none()
        return ProposalSampleFileSerializer(qs, many=True).data

    def get_faqs(self, obj):
        request = self.context.get('request')
        p = self._proposal(obj)
        if not p or not p.category_id:
            return []
        qs = FAQ.objects.filter(category_id=p.category_id).order_by('-created_at')[:10]
        return FAQSerializer(qs, many=True, context={'request': request}).data
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
