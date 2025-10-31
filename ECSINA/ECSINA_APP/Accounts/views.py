from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Profile, TempUser,UserProposalUpload,ConsultantReply
from .serializers import UserSerializer, ProfileSerializer, TempUserSerializer,UserProposalUploadSerializer,ConsultantReplySerializer
from permissions.permissions import IsAdminOrOwner
from rest_framework.exceptions import PermissionDenied
from django.utils.dateparse import parse_date
from django.utils import timezone
from rest_framework.parsers import MultiPartParser, FormParser
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        email = self.request.query_params.get('email')
        is_active = self.request.query_params.get('active')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if role:
            queryset = queryset.filter(role__name=role)
        if email:
            queryset = queryset.filter(email__icontains=email)
        if is_active in ['true', 'false']:
            queryset = queryset.filter(is_active=(is_active == 'true'))
        if from_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(to_date))

        return queryset

    def update(self, request, *args, **kwargs):
        user = request.user
        if not user.role or user.role.name not in ['owner', 'admin']:
            request.data.pop('role_id', None)
            request.data.pop('is_active', None)
            request.data.pop('is_staff', None)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        # همین منطق برای PATCH هم اعمال بشه
        return self.update(request, *args, **kwargs)



# ویوست پروفایل‌ها
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related('user').all().order_by('-user__created_at')
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrOwner]


# ویوست کاربران موقت
class TempUserViewSet(viewsets.ModelViewSet):
    queryset = TempUser.objects.all().order_by('-sms_sent_date')
    serializer_class = TempUserSerializer
    permission_classes = [IsAdminOrOwner]


# حذف کاربر خاص
class DeleteUserView(APIView):
    permission_classes = [IsAdminOrOwner]

    def delete(self, request, user_id):
        try:
            user_to_delete = User.objects.get(id=user_id)
            user_to_delete.deleted_by = request.user
            user_to_delete.save()
            user_to_delete.delete()
            return Response({"detail": f"کاربر با موفقیت حذف شد توسط {request.user.name}."}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"detail": "کاربر پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class UserProposalUploadViewSet(viewsets.ModelViewSet):
    queryset = UserProposalUpload.objects.select_related('user', 'original_proposal').all().order_by('-uploaded_at')
    serializer_class = UserProposalUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()

        # فیلترهای مدیریتی
        status = self.request.query_params.get('status')
        name = self.request.query_params.get('name')
        email = self.request.query_params.get('email')
        from_date = self.request.query_params.get('from_date')
        to_date = self.request.query_params.get('to_date')

        if status:
            queryset = queryset.filter(status=status)
        if name:
            queryset = queryset.filter(user__name__icontains=name)
        if email:
            queryset = queryset.filter(user__email__icontains=email)
        if from_date:
            queryset = queryset.filter(uploaded_at__date__gte=parse_date(from_date))
        if to_date:
            queryset = queryset.filter(uploaded_at__date__lte=parse_date(to_date))

        # نقش‌ها
        if user.role and user.role.name in ['admin', 'owner']:
            return queryset
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.role and user.role.name in ['admin', 'owner', 'consultant']:
            serializer.save(reviewed_by=user, reviewed_at=timezone.now())
        else:
            serializer.save()


class ConsultantReplyViewSet(viewsets.ModelViewSet):
    queryset = ConsultantReply.objects.select_related('consultant', 'proposal_upload__user').all().order_by('-replied_at')
    serializer_class = ConsultantReplySerializer
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

        if user.role and user.role.name in ['admin', 'owner']:
            return queryset
        return queryset.filter(proposal_upload__user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not user.role or user.role.name != 'consultant':
            raise PermissionDenied("فقط مشاورها می‌تونن پاسخ بدن.")
        serializer.save(consultant=user)
