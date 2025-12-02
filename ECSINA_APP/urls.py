from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #  API Routes
    path('api/', include('home.urls')),
    path('api/v1/accounts/', include('Accounts.urls')),
    path('api/v1/products/', include('Products.urls')),
    path('api/v1/system/', include("system_settings.urls")),
    path('api/v1/access/', include('permissions.urls')),
    path('api/v1/jobs/', include('jobs.urls')),
    path('api/v1/suggestions/', include('suggestion.urls')),
    path('api/v1/comments/', include('comments.urls')),
    path('api/v1/faq/', include('faq.urls')),
    path('api/v1/support/', include('support.urls')),

]

#  Static & Media Files (for development)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
