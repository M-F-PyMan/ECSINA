from rest_framework import serializers
from .models import User, Profile, TempUser,UserProposalUpload,ConsultantReply
from permissions.models import Role


class UserSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), source='role', write_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'name', 'email', 'mobile',
            'role', 'role_id', 'role_display',
            'sms_sent_code', 'sms_sent_date', 'sms_sent_tries',
            'is_active', 'is_staff', 'date_joined',
        ]
        read_only_fields = ['date_joined', 'role_display']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user if request else None

        # فقط owner یا admin اجازه تغییر نقش و وضعیت‌ها رو دارن
        if not user or not user.role or user.role.name not in ['owner', 'admin']:
            validated_data.pop('role', None)
            validated_data.pop('is_active', None)
            validated_data.pop('is_staff', None)

        return super().update(instance, validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class TempUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempUser
        fields = '__all__'


class UserProposalUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProposalUpload
        fields = '__all__'
        read_only_fields = ['user', 'uploaded_at', 'is_reviewed','reviewed_by', 'reviewed_at']


class ConsultantReplySerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = ConsultantReply
        fields = ['id', 'proposal_upload', 'consultant', 'message', 'file', 'replied_at', 'display_name']
        read_only_fields = ['consultant', 'replied_at', 'display_name']

    def get_display_name(self, obj):
        return obj.get_display_name()

