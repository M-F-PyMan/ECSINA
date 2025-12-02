from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'short_content', 'created_at', 'is_approved')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('content', 'user__username')
    list_editable = ('is_approved',)
    date_hierarchy = 'created_at'

    def short_content(self, obj):
        return obj.content[:50]
    short_content.short_description = 'متن نظر'
