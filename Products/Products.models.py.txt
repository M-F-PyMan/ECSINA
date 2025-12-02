from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from suggestion.models import Proposal
from django.utils import timezone

class Category(models.Model):
    title = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.title

class Product(models.Model):
    proposal = models.OneToOneField('suggestion.Proposal', on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='product')

    price = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    discount_percent = models.PositiveIntegerField(default=0)
    sold_count = models.PositiveIntegerField(default=0)

    # کنترل دسترسی
    allow_preview = models.BooleanField(default=True)  # فقط پیش‌نمایش قابل نمایش باشه
    allow_download_after_payment = models.BooleanField(default=True)  # لینک دانلود فقط بعد از پرداخت فعال بشه

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def final_price(self):
        if self.discount_percent:
            return int(self.price * (100 - self.discount_percent) / 100)
        return self.price

    def __str__(self):
        return f"Product for {self.proposal.title}"

    class Meta:
        db_table = "products"
        ordering = ["-created_at"]


class Image(models.Model):
    path = models.CharField(max_length=255)
    imageable_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    imageable_id = models.PositiveIntegerField()
    imageable = GenericForeignKey('imageable_type', 'imageable_id')

    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'images'

    def __str__(self):
        return self.path