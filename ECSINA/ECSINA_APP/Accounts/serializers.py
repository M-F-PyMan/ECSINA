from rest_framework import serializers
from .models import User, Profile, TempUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['date_joined', 'is_active', 'is_staff']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class TempUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempUser
        fields = '__all__'
