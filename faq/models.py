from django.db import models

from django.db import models
from django.utils import timezone
from Accounts.models import User
from Products.models import Category  # یا Proposal یا Template

class FAQ(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='faq/files/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='faqs')  # قابل تغییر به Proposal یا Template

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


