from rest_framework import viewsets
from .models import User, Profile, TempUser
from .serializers import UserSerializer, ProfileSerializer, TempUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class TempUserViewSet(viewsets.ModelViewSet):
    queryset = TempUser.objects.all()
    serializer_class = TempUserSerializer
