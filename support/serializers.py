from rest_framework import serializers
from .models import (
    Ticket,
    TicketReply,
    UserQuestion,
    About,
    AboutFeature,
    TicketAttachment,
)

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


class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = ['id', 'file', 'uploaded_at']


class TicketSerializer(serializers.ModelSerializer):
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    # write-only field to accept files from multipart form (not required but explicit)
    files = serializers.ListField(
        child=serializers.FileField(max_length=10000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'attachments']

    def create(self, validated_data):
        # pop files if present (DRF already put them in validated_data via files field)
        files = validated_data.pop('files', None)
        ticket = super().create(validated_data)
        request = self.context.get('request')
        # also support files coming directly from request.FILES['files']
        if files is None and request is not None:
            # request.FILES may contain multiple entries under same key 'files'
            files = request.FILES.getlist('files') if hasattr(request.FILES, 'getlist') else None

        if files:
            for f in files:
                TicketAttachment.objects.create(ticket=ticket, file=f)
        return ticket