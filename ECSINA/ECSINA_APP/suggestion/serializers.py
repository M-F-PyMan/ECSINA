from rest_framework import serializers
from .models import SuggestionText

class SuggestionTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionText
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
