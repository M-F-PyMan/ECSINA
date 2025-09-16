from django.urls import path
from .views import UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = 'accounts'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', TokenObtainPairView.as_view(), name='user-login'),


]

