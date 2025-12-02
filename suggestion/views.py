from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from .models import(
    Proposal,
    ProposalImage,
    SuggestionText,
    Template,
    ProposalAccess,
    ProposalGuidebook,
    ProposalRoadmap,
    ProposalVideo,
    ProposalSampleFile,
    SuggestedTitle,
)
from .serializers import(
    ProposalSerializer,
    ProposalImageSerializer,
    SuggestionTextSerializer,
    TemplateSerializer,
    ProposalPreviewSerializer,
    ProposalAccessSerializer,
    ProposalGuidebookSerializer,
    ProposalRoadmapSerializer,
    ProposalSampleFileSerializer,
    ProposalVideoSerializer,
    SuggestedTitleSerializer,
)
from rest_framework.parsers import MultiPartParser
from permissions.permissions import IsAdminOrOwner
from django.db.models import Q
from permissions.permissions import HasPermission
from django.utils import timezone
from .utils.previews import generate_pdf_preview
from rest_framework.permissions import IsAuthenticated
from .models import ProposalAccess
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.apps import apps
from Accounts.models import UserCategory,UserCategoryItem
from .utils.cache_helpers import (
    get_cached_related_educations,
    set_cached_related_educations,
    get_related_educations_cache_key
)

class ProposalPreviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, proposal_id):
        proposal = get_object_or_404(Proposal, id=proposal_id)

        # فقط اطلاعات محدود برمی‌گرده
        serializer = ProposalPreviewSerializer(proposal)
        return Response(serializer.data)


def has_proposal_access(request, proposal):
    """
    بررسی اینکه آیا کاربر فعلی اجازه دسترسی به پروپوزال را دارد یا نه.
    فقط صاحب پروپوزال یا کسی که مجوز edit_proposal دارد مجاز است.
    """
    return proposal.user == request.user or HasPermission("edit_proposal").has_permission(request, None)


class ProposalDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, proposal_id):
        Proposal = apps.get_model('suggestion', 'Proposal')
        ProposalAccess = apps.get_model('suggestion', 'ProposalAccess')

        proposal = get_object_or_404(Proposal, id=proposal_id)

        if proposal.is_free:
            # رایگان = دسترسی مستقیم
            return Response({"download_url": proposal.file.url})

        # بررسی دسترسی پولی
        has_access = ProposalAccess.objects.filter(
            user=request.user,
            proposal=proposal,
            access_type='paid'
        ).exists()

        if not has_access:
            return Response(
                {"detail": "برای دانلود این پروپوزال باید ابتدا آن را خریداری کنید."},
                status=status.HTTP_403_FORBIDDEN
            )

        return Response({"download_url": proposal.file.url})


class MyProposalsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        accesses = ProposalAccess.objects.filter(user=request.user).select_related('proposal')
        serializer = ProposalAccessSerializer(accesses, many=True)
        return Response(serializer.data)


class UploadProposalImageView(APIView):
    permission_classes = [IsAdminOrOwner]
    parser_classes = [MultiPartParser]

    def post(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
            if not has_proposal_access(request, proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            image_file = request.FILES.get('image')
            if not image_file:
                return Response({"detail": "تصویری ارسال نشده است."}, status=status.HTTP_400_BAD_REQUEST)

            ProposalImage.objects.create(proposal=proposal, image=image_file)
            return Response({"detail": "تصویر با موفقیت آپلود شد."}, status=status.HTTP_201_CREATED)

        except Proposal.DoesNotExist:
            return Response({"detail": "پروپوزال پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class ListProposalImagesView(APIView):
    permission_classes = [IsAdminOrOwner]

    def get(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
            if not has_proposal_access(request, proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            images = proposal.images.all()
            serializer = ProposalImageSerializer(images, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Proposal.DoesNotExist:
            return Response({"detail": "پروپوزال پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class UploadProposalFileView(APIView):
    permission_classes = [IsAdminOrOwner]
    parser_classes = [MultiPartParser]

    def post(self, request, proposal_id, file_type):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
            if not has_proposal_access(request, proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            uploaded_file = request.FILES.get('file')
            if not uploaded_file:
                return Response({"detail": "فایلی ارسال نشده است."}, status=status.HTTP_400_BAD_REQUEST)

            if file_type == "file":
                proposal.file = uploaded_file
            elif file_type == "sample":
                proposal.sample_file = uploaded_file
            elif file_type == "table":
                proposal.table_file = uploaded_file
            elif file_type == "guide":
                proposal.guide_file = uploaded_file
            elif file_type == "cover":
                proposal.cover_image = uploaded_file
            elif file_type == "video":
                proposal.video = uploaded_file
            elif file_type == "video_cover":
                proposal.video_cover = uploaded_file
            else:
                return Response({"detail": "نوع فایل نامعتبر است."}, status=status.HTTP_400_BAD_REQUEST)

            proposal.save()

            if file_type == "file":
                generate_pdf_preview(proposal)

            return Response({"detail": f"{file_type} با موفقیت آپلود شد."}, status=status.HTTP_200_OK)

        except Proposal.DoesNotExist:
            return Response({"detail": "پروپوزال پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class ProposalViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Proposal.objects.all()

        if not user.is_authenticated:
            queryset = queryset.filter(status="approved", published_at__lte=timezone.now())
        elif getattr(user.role, 'name', None) in ['owner', 'admin']:
            return queryset
        else:
            queryset = queryset.filter(status="approved", published_at__lte=timezone.now())

        category = self.request.query_params.get('category')
        status = self.request.query_params.get('status')
        published_after = self.request.query_params.get('published_after')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if status:
            queryset = queryset.filter(status=status)
        if published_after:
            queryset = queryset.filter(published_at__gte=published_after)
        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(description__icontains=search))

        return queryset

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminOrOwner()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        proposal = self.get_object()
        self.perform_destroy(proposal)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProposalImageViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user.role, 'name', None) == 'owner':
            return ProposalImage.objects.all()
        return ProposalImage.objects.filter(proposal__user=user)


class SmartSuggestionView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        keyword = request.query_params.get('keyword')
        category_id = request.query_params.get('category')

        queryset = SuggestionText.objects.filter(status="approved")

        if keyword:
            queryset = queryset.filter(trigger_keyword__icontains=keyword)
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        suggestions = queryset.order_by('-priority')[:5]
        serializer = SuggestionTextSerializer(suggestions, many=True)
        return Response(serializer.data)


class DeleteProposalImageView(APIView):
    permission_classes = [IsAdminOrOwner]

    def delete(self, request, image_id):
        try:
            image = ProposalImage.objects.get(id=image_id)
            if not has_proposal_access(request, image.proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            image.delete()
            return Response({"detail": "تصویر حذف شد."}, status=status.HTTP_204_NO_CONTENT)

        except ProposalImage.DoesNotExist:
            return Response({"detail": "تصویر پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class DeleteProposalVideoView(APIView):
    permission_classes = [IsAdminOrOwner]

    def delete(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
            if not has_proposal_access(request, proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            proposal.video.delete(save=False)
            proposal.video_cover.delete(save=False)
            proposal.save()
            return Response({"detail": "ویدیو حذف شد."}, status=status.HTTP_204_NO_CONTENT)

        except Proposal.DoesNotExist:
            return Response({"detail": "پروپوزال پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class DeleteProposalFileView(APIView):
    permission_classes = [IsAdminOrOwner]

    def delete(self, request, proposal_id, file_type):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
            if not has_proposal_access(request, proposal):
                return Response({"detail": "دسترسی غیرمجاز."}, status=status.HTTP_403_FORBIDDEN)

            if file_type == "file":
                proposal.file.delete(save=False)
            elif file_type == "sample":
                proposal.sample_file.delete(save=False)
            elif file_type == "table":
                proposal.table_file.delete(save=False)
            elif file_type == "guide":
                proposal.guide_file.delete(save=False)
            elif file_type == "cover":
                proposal.cover_image.delete(save=False)
            else:
                return Response({"detail": "نوع فایل نامعتبر است."}, status=status.HTTP_400_BAD_REQUEST)

            proposal.save()
            return Response({"detail": f"{file_type} حذف شد."}, status=status.HTTP_204_NO_CONTENT)

        except Proposal.DoesNotExist:
            return Response({"detail": "پروپوزال پیدا نشد."}, status=status.HTTP_404_NOT_FOUND)


class SuggestionTextViewSet(viewsets.ModelViewSet):
    queryset = SuggestionText.objects.all()
    serializer_class = SuggestionTextSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        queryset = SuggestionText.objects.all()
        status = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        keyword = self.request.query_params.get('keyword')

        if status:
            queryset = queryset.filter(status=status)
        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if keyword:
            queryset = queryset.filter(trigger_keyword__icontains=keyword)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all().order_by('-created_at')
    serializer_class = TemplateSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if not user.is_authenticated or not user.role or user.role.name not in ['owner', 'admin']:
            queryset = queryset.filter(is_public=True)

        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.role and user.role.name in ['owner', 'admin']:
            serializer.save(updated_by=user)
        else:
            raise PermissionDenied("شما اجازه ویرایش این قالب را ندارید.")

    def perform_destroy(self, instance):
        user = self.request.user
        if user.role and user.role.name in ['owner', 'admin']:
            instance.delete()
        else:
            raise PermissionDenied("شما اجازه حذف این قالب را ندارید.")


class RelatedEducationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        category_id = request.query_params.get('user_category_id')
        if not category_id:
            return Response({"detail": "شناسه دسته‌بندی ارسال نشده."}, status=400)


        cached = get_cached_related_educations(request.user.id, category_id)
        if cached:
            return Response(cached)

        # محاسبه داده‌ها
        items = UserCategoryItem.objects.filter(user_category_id=category_id, user_category__user=request.user)
        proposal_ids = items.values_list('file__original_proposal_id', flat=True).distinct()

        videos = ProposalVideo.objects.filter(proposal_id__in=proposal_ids)
        roadmaps = ProposalRoadmap.objects.filter(proposal_id__in=proposal_ids)
        guidebooks = ProposalGuidebook.objects.filter(proposal_id__in=proposal_ids)
        samples = ProposalSampleFile.objects.filter(proposal_id__in=proposal_ids)

        result = {
            "category_id": category_id,
            "videos": ProposalVideoSerializer(videos, many=True).data,
            "roadmaps": ProposalRoadmapSerializer(roadmaps, many=True).data,
            "guidebooks": ProposalGuidebookSerializer(guidebooks, many=True).data,
            "samples": ProposalSampleFileSerializer(samples, many=True).data
        }

        set_cached_related_educations(request.user.id, category_id, result)
        return Response(result)


class SuggestedTitleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SuggestedTitleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = SuggestedTitle.objects.all().order_by('title')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset