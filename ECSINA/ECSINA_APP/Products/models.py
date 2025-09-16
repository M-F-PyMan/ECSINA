from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    size = models.CharField(max_length=50)
    format = models.CharField(max_length=50)
    file_path = models.CharField(max_length=255)
    image_path = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.title


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
