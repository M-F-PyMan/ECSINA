
from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = [
            'id', 'title', 'description', 'file_url',
            'category', 'created_by', 'created_at'
        ]
        read_only_fields = ['created_by', 'created_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
