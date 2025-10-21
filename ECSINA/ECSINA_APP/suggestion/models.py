from django.db import models
from django.utils import timezone

# اگر اپ accounts و products جدا هستن، باید به صورت 'accounts.User' و 'products.Category' اشاره کنیم

class SuggestionText(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    name = models.CharField("Title", max_length=500)
    description = models.TextField("Description")
    status = models.CharField("Status", max_length=20, choices=STATUS_CHOICES, default="pending")

    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE,
        related_name='suggestions'
    )
    category = models.ForeignKey(
        'products.Category',
        on_delete=models.CASCADE,
        related_name='suggestions'
    )

    created_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_suggestions'
    )
    updated_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='updated_suggestions'
    )

    created_at = models.DateTimeField("Created At", auto_now_add=True)
    updated_at = models.DateTimeField("Updated At", auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

    class Meta:
        db_table = "suggestion_texts"
        ordering = ["-created_at"]
