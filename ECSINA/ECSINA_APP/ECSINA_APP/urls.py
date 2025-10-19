
from django.contrib import admin
from django.urls import path,include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from Accounts import urls



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/products/', include('products.urls')),
    path('api/v1/system/', include('system_settings.urls')),
    path('api/v1/access/', include('permissions.urls')),
    path('api/v1/jobs/', include('jobs.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/', include('suggestions.urls'))
]




