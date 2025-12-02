from rest_framework import viewsets
from .models import Comment,CommentReply
from .serializers import CommentSerializer,CommentReplySerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils.dateparse import parse_date

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        email = self.request.query_params.get('email')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if name:
            queryset = queryset.filter(user__name__icontains=name)
        if email:
            queryset = queryset.filter(user__email__icontains=email)
        if from_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(to_date))

        return queryset

    def get_permissions(self):
        if self.action in ['create','list']:
            return [IsAuthenticated()]
        return [IsAdminUser()]

class CommentReplyViewSet(viewsets.ModelViewSet):
    queryset = CommentReply.objects.select_related('user', 'comment').all().order_by('-created_at')
    serializer_class = CommentReplySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        email = self.request.query_params.get('email')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if name:
            queryset = queryset.filter(user__name__icontains=name)
        if email:
            queryset = queryset.filter(user__email__icontains=email)
        if from_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(to_date))

        return queryset



    def get_permissions(self):
        if self.action in ['destroy']:
            return [IsAdminUser()]
        return super().get_permissions()
