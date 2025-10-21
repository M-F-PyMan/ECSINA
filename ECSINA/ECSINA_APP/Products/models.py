from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=255)
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children'
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']



class Product(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    size = models.CharField(max_length=50)
    format = models.CharField(max_length=50)

    file_path = models.FileField(upload_to='products/files/', blank=True, null=True)
    image_path = models.ImageField(upload_to='products/images/', blank=True, null=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.title


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    path = models.ImageField(upload_to='products/images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.path.name} → {self.product.title}"


