from django.db import models
from django.utils import timezone
from Accounts.models import User




class ProposalAccess(models.Model):
    ACCESS_TYPE_CHOICES = (
        ('free', 'Free'),
        ('paid', 'Paid'),
    )

    user = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, related_name='accessible_proposals')
    proposal = models.ForeignKey('suggestion.Proposal', on_delete=models.CASCADE, related_name='accessed_by')
    access_type = models.CharField(max_length=10, choices=ACCESS_TYPE_CHOICES)
    granted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'proposal')
        ordering = ['-granted_at']

    def __str__(self):
        return f"{self.user.username} → {self.proposal.title} ({self.access_type})"



class SuggestionText(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    name = models.CharField("Title", max_length=500)
    description = models.TextField("Description")
    status = models.CharField("Status", max_length=20, choices=STATUS_CHOICES, default="pending")

    # هدف پیشنهاد
    category = models.ForeignKey('Products.Category', on_delete=models.CASCADE, related_name='suggestions')
    trigger_keyword = models.CharField(max_length=100, blank=True, null=True)  # مثل "مالی", "تحقیق", "دانشجویی"
    priority = models.IntegerField(default=0)  # برای مرتب‌سازی پیشنهادها

    # مالکیت و ثبت
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='suggestions')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_suggestions')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_suggestions')

    created_at = models.DateTimeField("Created At", auto_now_add=True)
    updated_at = models.DateTimeField("Updated At", auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

    class Meta:
        db_table = "suggestion_texts"
        ordering = ["-priority", "-created_at"]


class Proposal(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    published_at = models.DateTimeField()
    category = models.ForeignKey('Products.Category', on_delete=models.CASCADE, related_name='proposals')

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='proposals', default=1)
    status = models.CharField("Status", max_length=20, choices=STATUS_CHOICES, default="pending")

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_proposals')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_proposals')

    # فایل‌ها
    file = models.FileField(upload_to='proposals/files/', blank=True, null=True)
    sample_file = models.FileField(upload_to='proposals/samples/', blank=True, null=True)
    table_file = models.FileField(upload_to='proposals/tables/', blank=True, null=True)
    guide_file = models.FileField(upload_to='proposals/guides/', blank=True, null=True)
    preview_image = models.ImageField(upload_to='proposal_previews/', null=True, blank=True)

    # ویدیو و کاور
    video = models.FileField(upload_to='proposals/videos/', blank=True, null=True)
    video_cover = models.FileField(upload_to='proposals/video_covers/', blank=True, null=True)

    # تصویر کاور
    cover_image = models.ImageField(upload_to='proposals/covers/', blank=True, null=True)

    created_at = models.DateTimeField("Created At", default=timezone.now)
    updated_at = models.DateTimeField("Updated At", auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "proposals"
        ordering = ["-created_at"]

class ProposalImage(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='proposals/images/')
    uploaded_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Image for {self.proposal.title}"

    class Meta:
        db_table = "proposal_images"
        ordering = ["-uploaded_at"]

class Template(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey('Products.Category', on_delete=models.SET_NULL, null=True, blank=True)
    is_public = models.BooleanField(default=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_templates')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_templates')

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']



class ProposalVideo(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='videos/')
    created_at = models.DateTimeField(auto_now_add=True)


class ProposalRoadmap(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name='roadmaps')
    title = models.CharField(max_length=255)
    roadmap_file = models.FileField(upload_to='roadmaps/')
    created_at = models.DateTimeField(auto_now_add=True)


class ProposalGuidebook(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name='guidebooks')
    title = models.CharField(max_length=255)
    guidebook_file = models.FileField(upload_to='guidebooks/')
    created_at = models.DateTimeField(auto_now_add=True)


class ProposalSampleFile(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name='samples')
    title = models.CharField(max_length=255)
    sample_file = models.FileField(upload_to='samples/')
    created_at = models.DateTimeField(auto_now_add=True)

class SuggestedTitle(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)  # مثلاً "بازاریابی"، "مالی"، "فنی"
