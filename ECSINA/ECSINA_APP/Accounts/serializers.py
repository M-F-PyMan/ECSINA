from rest_framework import serializers
from .models import User, Profile
#فیلد ثبت نام بهینه شده
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    bio = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['name', 'email', 'mobile', 'password', 'bio', 'avatar']

    def create(self, validated_data):
        bio = validated_data.pop('bio', '')
        avatar = validated_data.pop('avatar', None)
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, bio=bio, avatar=avatar)
        return user
