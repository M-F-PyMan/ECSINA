from rest_framework import serializers
from .models import Ticket, TicketReply,UserQuestion,About,AboutFeature

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['user', 'created_at']


class TicketReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketReply
        fields = '__all__'
        read_only_fields = ['responder', 'replied_at']



class UserQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuestion
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class AboutFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFeature
        fields = ["title", "desc"]

class AboutSerializer(serializers.ModelSerializer):
    features = AboutFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = ["title", "subtitle", "description", "features"]