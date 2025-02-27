from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import get_user_details, RegisterView, LoginView,send_random_profiles
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/", get_user_details, name="user-details"),
    path('random/<int:user_id>/', send_random_profiles, name='send_random_profiles'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
