from django.db import models
from django.utils import timezone
from Accounts.models import User

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField("متن نظر")
    created_at = models.DateTimeField(default=timezone.now)
    is_approved = models.BooleanField(default=False)
    proposal = models.ForeignKey('suggestion.Proposal', on_delete=models.CASCADE, related_name='comments',null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:30]}"

    class Meta:
        db_table = "comments"
        ordering = ["-created_at"]


class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='replies')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_replies')
    content = models.TextField("متن پاسخ")
    created_at = models.DateTimeField(default=timezone.now)

    def get_display_name(self):
        if not self.user.role:
            return self.user.name  # کاربر معمولی
        if self.user.role.name == 'admin':
            return "ادمین سایت"
        if self.user.role.name == 'owner':
            return "مالک سایت"
        return self.user.name
