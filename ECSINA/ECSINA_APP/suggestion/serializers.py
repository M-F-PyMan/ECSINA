from rest_framework import serializers
from .models import Proposal, ProposalImage, SuggestionText,Template,ProposalAccess




class ProposalPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ['id', 'title', 'description', 'preview_image']



class ProposalAccessSerializer(serializers.ModelSerializer):
    proposal_title = serializers.CharField(source='proposal.title', read_only=True)
    proposal_id = serializers.IntegerField(source='proposal.id', read_only=True)

    class Meta:
        model = ProposalAccess
        fields = ['proposal_id', 'proposal_title', 'access_type', 'granted_at']



class ProposalSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    file_url = serializers.SerializerMethodField()
    preview_url = serializers.SerializerMethodField()
    is_free = serializers.SerializerMethodField()

    class Meta:
        model = Proposal
        fields = [
            'id', 'title', 'description', 'price', 'status', 'published_at',
            'category', 'category_name',
            'user', 'user_email',
            'file', 'sample_file', 'table_file', 'guide_file',
            'cover_image', 'video', 'video_cover',
            'file_url', 'preview_url', 'is_free',
            'created_by', 'updated_by', 'created_at', 'updated_at']

        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']

    def get_file_url(self, obj):
        request = self.context.get('request')
        user = request.user if request else None

        if obj.price == 0:
            return request.build_absolute_uri(obj.file.url)
        if user and user.is_authenticated and getattr(user.role, 'name', None) in ['owner', 'admin']:
            return request.build_absolute_uri(obj.file.url)
        return None

    def get_preview_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/media/previews/{obj.id}_preview.pdf')

    def get_is_free(self, obj):
        return obj.price == 0


class ProposalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalImage
        fields = '__all__'
        read_only_fields = ['uploaded_at']


class SuggestionTextSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = SuggestionText
        fields = [
            'id', 'name', 'description', 'status',
            'category', 'category_name',
            'trigger_keyword', 'priority',
            'user', 'user_email',
            'created_by', 'updated_by',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['created_by', 'updated_by', 'created_at', 'updated_at']


class TemplateSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    created_by_email = serializers.EmailField(source='created_by.email', read_only=True)

    class Meta:
        model = Template
        fields = [
            'id', 'name', 'description',
            'category', 'category_name',
            'is_public',
            'created_by', 'created_by_email',
            'updated_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'updated_by', 'created_at', 'updated_at']

