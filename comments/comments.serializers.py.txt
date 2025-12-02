from rest_framework import serializers
from .models import Comment,CommentReply

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentReplySerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = CommentReply
        fields = ['id', 'comment', 'user', 'content', 'created_at', 'display_name']

    def get_display_name(self, obj):
        return obj.get_display_name()
