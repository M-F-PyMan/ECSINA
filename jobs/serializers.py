from rest_framework import serializers
from .models import Job, FailedJob, JobBatch

class JobBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobBatch
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class FailedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailedJob
        fields = '__all__'
