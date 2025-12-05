from rest_framework import serializers
from .models import (
    User,
    Profile,
    TempUser,
    UserProposalUpload,
    ConsultantReply,
    UserCategory,
    UserCategoryItem,
    UserActivityLog,
    OTP,
)
from permissions.models import Role
from django.core.validators import RegexValidator, EmailValidator
from django.utils.html import strip_tags
from django.contrib.auth.hashers import make_password



class ContactMessageSerializer(serializers.Serializer):
    message = serializers.CharField()

    def validate_message(self, value):
        clean = strip_tags(value)
        if clean != value:
            raise serializers.ValidationError("متن شامل تگ‌های HTML غیرمجاز است")
        return clean
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
    consultant_reply = serializers.SerializerMethodField()
    can_edit = serializers.SerializerMethodField()
    can_download = serializers.SerializerMethodField()
    editable_content = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = UserProposalUpload
        fields = ['id', 'title', 'file', 'is_paid', 'editable_content','is_free', 'can_edit', 'can_download', 'consultant_reply']

    def get_can_edit(self, obj):
        user = self.context['request'].user
        return obj.can_user_edit(user)

    def get_can_download(self, obj):
        user = self.context['request'].user
        return obj.can_user_download(user)

    def get_consultant_reply(self, obj):
        reply = ConsultantReply.objects.filter(proposal_upload=obj).last()
        if reply:
            return {
                "message": reply.message,
                "replied_at": reply.replied_at
            }
        return None



class ConsultantReplySerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = ConsultantReply
        fields = ['id', 'proposal_upload', 'consultant', 'message', 'file', 'replied_at', 'display_name']
        read_only_fields = ['consultant', 'replied_at', 'display_name']

    def get_display_name(self, obj):
        return obj.get_display_name()




class UserCategoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategoryItem
        fields = '__all__'


class UserCategorySerializer(serializers.ModelSerializer):
    items = UserCategoryItemSerializer(many=True, read_only=True)

    class Meta:
        model = UserCategory
        fields = ['id', 'title', 'created_at', 'items']


class UserActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivityLog
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[EmailValidator()])
    mobile = serializers.CharField(
        validators=[RegexValidator(regex=r'^09\d{9}$', message='شماره موبایل معتبر نیست')]
    )
    password = serializers.CharField(min_length=8, max_length=128, write_only=True)
    user_job = serializers.CharField(required=False, allow_blank=True)
    position = serializers.CharField(required=False, allow_blank=True)
    field = serializers.CharField(required=False, allow_blank=True)
    meet = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'mobile', 'password', 'user_job', 'position', 'field', 'meet']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            mobile=validated_data['mobile'],
            user_job=validated_data.get('user_job', ''),
            position=validated_data.get('position', ''),
            field=validated_data.get('field', ''),
            meet=validated_data.get('meet', '')
        )
        return user


class SendOTPSerializer(serializers.Serializer):
    identifier = serializers.CharField()

    def validate_identifier(self, value):
        if "@" in value:
            if not User.objects.filter(email=value).exists():
                raise serializers.ValidationError("کاربری با این ایمیل وجود ندارد.")
        else:
            if not User.objects.filter(mobile=value).exists():
                raise serializers.ValidationError("کاربری با این شماره وجود ندارد.")
        return value


class VerifyOTPSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    code = serializers.CharField(max_length=6)


class ResetPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    new_password = serializers.CharField(min_length=8, max_length=128)



