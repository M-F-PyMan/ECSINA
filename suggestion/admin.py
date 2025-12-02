# suggestion/admin.py

from django.contrib import admin
from .models import (
    ProposalVideo,
    ProposalRoadmap,
    ProposalGuidebook,
    ProposalSampleFile
)

@admin.register(ProposalVideo)
class ProposalVideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'proposal', 'created_at']
    search_fields = ['title', 'proposal__title']
    list_filter = ['created_at']


@admin.register(ProposalRoadmap)
class ProposalRoadmapAdmin(admin.ModelAdmin):
    list_display = ['title', 'proposal', 'created_at']
    search_fields = ['title', 'proposal__title']
    list_filter = ['created_at']


@admin.register(ProposalGuidebook)
class ProposalGuidebookAdmin(admin.ModelAdmin):
    list_display = ['title', 'proposal', 'created_at']
    search_fields = ['title', 'proposal__title']
    list_filter = ['created_at']


@admin.register(ProposalSampleFile)
class ProposalSampleFileAdmin(admin.ModelAdmin):
    list_display = ['title', 'proposal', 'created_at']
    search_fields = ['title', 'proposal__title']
    list_filter = ['created_at']
