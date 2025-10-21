from rest_framework import viewsets
from .models import JobBatch, Job, FailedJob
from .serializers import JobBatchSerializer, JobSerializer, FailedJobSerializer

class JobBatchViewSet(viewsets.ModelViewSet):
    queryset = JobBatch.objects.all()
    serializer_class = JobBatchSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class FailedJobViewSet(viewsets.ModelViewSet):
    queryset = FailedJob.objects.all()
    serializer_class = FailedJobSerializer
