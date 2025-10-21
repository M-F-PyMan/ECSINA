from django.db import models

class SystemSetting(models.Model):
    key = models.CharField("Setting Key", max_length=100, unique=True)
    value = models.TextField("Setting Value", blank=True, null=True)
    description = models.TextField("Description", blank=True, null=True)
    is_active = models.BooleanField("Active", default=True)
    updated_at = models.DateTimeField("Last Updated", auto_now=True)

    def __str__(self):
        return f"{self.key}: {self.value}"

    class Meta:
        db_table = "system_settings"
        ordering = ["-updated_at"]
