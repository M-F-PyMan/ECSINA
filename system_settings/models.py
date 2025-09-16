import uuid
from django.db import models

class SystemSetting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=255, unique=True)
    value = models.TextField()

    class Meta:
        db_table = 'system_settings'

    def __str__(self):
        return self.key
