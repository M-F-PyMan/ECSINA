from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketReplyViewSet,ChangeTicketStatusView,UserQuestionViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)
router.register(r'ticket-replies', TicketReplyViewSet)
router.register(r'user-questions', UserQuestionViewSet)

urlpatterns = router.urls +[
    path('tickets/<int:ticket_id>/change-status/', ChangeTicketStatusView.as_view(), name='change-ticket-status'),
]
