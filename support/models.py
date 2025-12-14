from django.db import models
from Accounts.models import User

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'باز'),
        ('pending', 'در انتظار'),
        ('closed', 'بسته'),
    ]
    PRIORITY_CHOICES = [
        ('none', 'بدون اولویت'),
        ('low', 'کم'),
        ('medium', 'متوسط'),
        ('high', 'فوری'),
    ]
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='none')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.user.email}"


class TicketReply(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='replies')
    responder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    message = models.TextField()
    file = models.FileField(upload_to='ticket_replies/', null=True, blank=True)
    replied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply to {self.ticket.subject} by {self.responder.email if self.responder else 'Unknown'}"


class UserQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.question[:30]}"

class About(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    # برای مدیریت ویژگی‌ها می‌تونیم مدل جدا بسازیم
    def __str__(self):
        return self.title

class AboutFeature(models.Model):
    about = models.ForeignKey(About, related_name="features", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    desc = models.TextField()

    def __str__(self):
        return self.title

class TicketAttachment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='ticket_attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return