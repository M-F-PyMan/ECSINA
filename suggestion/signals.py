import os
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Proposal
from pdf2image import convert_from_path
from django.core.files.base import ContentFile
from io import BytesIO

@receiver(post_save, sender=Proposal)
def generate_pdf_preview(sender, instance, created, **kwargs):
    if not instance.file or instance.preview_image:
        return

    try:
        # تبدیل صفحه اول PDF به تصویر
        images = convert_from_path(instance.file.path, first_page=1, last_page=1)
        if images:
            image_io = BytesIO()
            images[0].save(image_io, format='JPEG')
            image_name = f"preview_{instance.id}.jpg"
            instance.preview_image.save(image_name, ContentFile(image_io.getvalue()), save=True)
    except Exception as e:
        print(f"خطا در تولید thumbnail: {e}")
