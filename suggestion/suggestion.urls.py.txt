from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    ProposalViewSet,
    ProposalImageViewSet,
    SmartSuggestionView,
    SuggestionTextViewSet,
    DeleteProposalImageView,
    DeleteProposalVideoView,
    DeleteProposalFileView,
    UploadProposalFileView,
    ListProposalImagesView,
    UploadProposalImageView,
    TemplateViewSet,
    MyProposalsView,
    ProposalDownloadView,
)

router = DefaultRouter()
router.register(r'proposals', ProposalViewSet, basename='proposal')
router.register(r'proposal-images', ProposalImageViewSet, basename='proposalimage')
router.register(r'suggestion-texts', SuggestionTextViewSet, basename='suggestiontext')
router.register(r'templates', TemplateViewSet, basename='template')




urlpatterns = router.urls + [
    #پیشنهادات
    path('suggestions/smart/', SmartSuggestionView.as_view(), name='smart-suggestions'),

    # فایل‌ها
    path('proposals/<int:proposal_id>/files/<str:file_type>/upload/', UploadProposalFileView.as_view(), name='proposal-file-upload'),
    path('proposals/<int:proposal_id>/files/<str:file_type>/delete/', DeleteProposalFileView.as_view(), name='proposal-file-delete'),
    path('my-proposals/', MyProposalsView.as_view(), name='my-proposals'),
    path('proposals/<int:proposal_id>/download/', ProposalDownloadView.as_view(), name='proposal-download'),


    # ویدیو
    path('proposals/<int:proposal_id>/video/delete/', DeleteProposalVideoView.as_view(), name='proposal-video-delete'),

    # تصویر
    path('proposal-images/<int:image_id>/delete/', DeleteProposalImageView.as_view(), name='proposal-image-delete'),
    path('proposals/<int:proposal_id>/images/upload/', UploadProposalImageView.as_view(), name='proposal-image-upload'),
    path('proposals/<int:proposal_id>/images/', ListProposalImagesView.as_view(), name='proposal-image-list'),
]


