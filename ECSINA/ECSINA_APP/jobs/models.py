from django.db import models
import uuid

class JobBatch(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField("Batch Name", max_length=255)
    created_at = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "job_batches"
        ordering = ["-created_at"]


class Job(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    queue = models.CharField("Queue Name", max_length=255)
    payload = models.TextField("Payload")
    attempts = models.IntegerField("Attempts", default=0)

    reserved_at = models.DateTimeField("Reserved At", null=True, blank=True)
    available_at = models.DateTimeField("Available At", null=True, blank=True)
    created_at = models.DateTimeField("Created At", auto_now_add=True)

    batch = models.ForeignKey(
        JobBatch,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='jobs'
    )

    def __str__(self):
        return f"Job {self.uuid}"

    class Meta:
        db_table = "jobs"
        ordering = ["-created_at"]

class FailedJob(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    connection = models.CharField("Connection", max_length=255)
    queue = models.CharField("Queue Name", max_length=255)
    payload = models.TextField("Payload")
    exception = models.TextField("Exception Message")
    failed_at = models.DateTimeField("Failed At", auto_now_add=True)

    def __str__(self):
        return f"Failed {self.uuid}"

    class Meta:
        db_table = "failed_jobs"
        ordering = ["-failed_at"]


