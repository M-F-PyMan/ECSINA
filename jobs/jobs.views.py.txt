from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Job, FailedJob, JobBatch
from .serializers import JobSerializer, FailedJobSerializer, JobBatchSerializer
from permissions.custom import IsAdminRole

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class FailedJobViewSet(viewsets.ModelViewSet):
    queryset = FailedJob.objects.all()
    serializer_class = FailedJobSerializer
    permission_classes = [IsAuthenticated, IsAdminRole()]

class JobBatchViewSet(viewsets.ModelViewSet):
    queryset = JobBatch.objects.all()
    serializer_class = JobBatchSerializer
    permission_classes = [IsAuthenticated]
