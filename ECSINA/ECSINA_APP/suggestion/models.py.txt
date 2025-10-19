from django.db import models


STATUS_CHOICES = (
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
)


class SuggestionText(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_id = models.BigIntegerField(db_column="user_id")
    category_id = models.BigIntegerField(
        models.DO_NOTHING,
        db_column="category_id",
    )
    created_by = models.BigIntegerField(db_column="created_by")
    updated_by = models.BigIntegerField(db_column="updated_by")

    class Meta:
        db_table = "suggestions_text"
        managed = True

    def __str__(self):
        return f"{self.name} - ({self.status})"
