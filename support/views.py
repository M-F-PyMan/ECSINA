from rest_framework import viewsets, permissions,status
from rest_framework.exceptions import PermissionDenied
from .models import Ticket, TicketReply,UserQuestion,About
from .serializers import TicketSerializer, TicketReplySerializer,UserQuestionSerializer,AboutSerializer
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from django.utils.dateparse import parse_date
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.select_related('user').all().order_by('-created_at')
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if from_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(to_date))

        if user.role and user.role.name in ['admin', 'owner']:
            return queryset
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not user.role or user.role.name in ['admin', 'owner']:
            raise PermissionDenied("ادمین‌ها نمی‌تونن تیکت ثبت کنن.")
        serializer.save(user=user)



class TicketReplyViewSet(viewsets.ModelViewSet):
    queryset = TicketReply.objects.select_related('ticket', 'responder').all().order_by('-replied_at')
    serializer_class = TicketReplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if from_date:
            queryset = queryset.filter(replied_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(replied_at__date__lte=parse_date(to_date))

        if user.role and user.role.name in ['admin', 'owner', 'consultant']:
            return queryset
        return queryset.filter(ticket__user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not user.role or user.role.name not in ['admin', 'consultant']:
            raise PermissionDenied("فقط مشاور یا ادمین می‌تونه پاسخ بده.")
        serializer.save(responder=user)



class ChangeTicketStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, ticket_id):
        user = request.user
        if not user.role or user.role.name not in ['admin', 'owner', 'consultant']:
            raise PermissionDenied("فقط مشاور، ادمین یا owner می‌تونن وضعیت تیکت رو تغییر بدن.")

        try:
            ticket = Ticket.objects.get(id=ticket_id)
            new_status = request.data.get('status')
            if new_status not in ['open', 'pending', 'closed']:
                return Response({"detail": "وضعیت نامعتبر است."}, status=status.HTTP_400_BAD_REQUEST)

            ticket.status = new_status
            ticket.save()
            return Response({"detail": f"وضعیت تیکت به '{new_status}' تغییر کرد."}, status=status.HTTP_200_OK)

        except Ticket.DoesNotExist:
            return Response({"detail": "تیکت پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class UserQuestionViewSet(viewsets.ModelViewSet):
    queryset = UserQuestion.objects.select_related('user').order_by('-created_at')
    serializer_class = UserQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AboutView(RetrieveAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer

    def get_object(self):
        # فرض می‌کنیم فقط یک رکورد About داریم
        return About.objects.first()

