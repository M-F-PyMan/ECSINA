from rest_framework import serializers
from .models import Ticket, TicketReply,UserQuestion

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
