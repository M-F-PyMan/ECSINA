from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    TicketViewSet,
    TicketReplyViewSet,
    ChangeTicketStatusView,
    UserQuestionViewSet,
    AboutView,
    TicketAttachmentViewSet,  # مطمئن شو این ViewSet در views.py پیاده شده
)

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='ticket')
router.register(r'ticket-replies', TicketReplyViewSet, basename='ticket-reply')
router.register(r'user-questions', UserQuestionViewSet, basename='user-question')
# ثبت viewset برای پیوست‌ها (لیست، retrieve، delete و در صورت نیاز upload)
router.register(r'ticket-attachments', TicketAttachmentViewSet, basename='ticket-attachment')

urlpatterns = [
    path("", include(router.urls)),
    path("about/", AboutView.as_view(), name="about"),
    path("tickets/<int:ticket_id>/change-status/", ChangeTicketStatusView.as_view(), name="change-ticket-status"),
]
