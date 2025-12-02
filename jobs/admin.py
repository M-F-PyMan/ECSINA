from django.contrib import admin
from .models import Job, FailedJob, JobBatch

admin.site.register(Job)
admin.site.register(FailedJob)
admin.site.register(JobBatch)
