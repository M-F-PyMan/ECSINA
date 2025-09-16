from rest_framework import viewsets
from .models import Job, FailedJob, JobBatch
from .serializers import JobSerializer, FailedJobSerializer, JobBatchSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class FailedJobViewSet(viewsets.ModelViewSet):
    queryset = FailedJob.objects.all()
    serializer_class = FailedJobSerializer

class JobBatchViewSet(viewsets.ModelViewSet):
    queryset = JobBatch.objects.all()
    serializer_class = JobBatchSerializer
