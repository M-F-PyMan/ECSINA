from django.db import models
import uuid

class JobBatch(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Job(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    queue = models.CharField(max_length=255)
    payload = models.TextField()
    attempts = models.IntegerField(default=0)
    reserved_at = models.DateTimeField(null=True, blank=True)
    available_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    batch = models.ForeignKey(JobBatch, on_delete=models.SET_NULL, null=True, blank=True, related_name='jobs')

    def __str__(self):
        return f"Job {self.uuid}"

class FailedJob(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    connection = models.CharField(max_length=255)
    queue = models.CharField(max_length=255)
    payload = models.TextField()
    exception = models.TextField()
    failed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Failed {self.uuid}"
