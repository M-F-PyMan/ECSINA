from rest_framework import viewsets
from .models import SystemSetting
from .serializers import SystemSettingSerializer

class SystemSettingViewSet(viewsets.ModelViewSet):
    queryset = SystemSetting.objects.all()
    serializer_class = SystemSettingSerializer

