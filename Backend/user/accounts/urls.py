from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import AddProfileView, get_user_by_id, get_user_details, RegisterView, LoginView, send_random_profiles, ConnectionCreateView, send_connection_request, ConnectionListByReceiverView, get_filtered_profiles, get_notifications
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/", get_user_details, name="user-details"),

    # API for explore profile page to get random profiles
    path('profiles/random/', send_random_profiles, name='random-profiles'),

    path('user/<int:user_id>/', get_user_by_id, name='get-user-by-id'),

    # filtered profile
    path('profiles/', get_filtered_profiles, name='filtered-profiles'),

    # Notification
    path('notifications/', get_notifications, name='notifications'),

    # Establish Connection
    path('connection/add/', ConnectionCreateView.as_view(),
         name='connection-create'),
    # Send request as a connection
    path('connections/send/', send_connection_request,
         name='send-connection-request'),

    # Receive request
    path('connections/<int:receiver_id>/',
         ConnectionListByReceiverView.as_view(), name='connection-list-by-receiver'),

    path('addprofile/<int:id>', AddProfileView.as_view(), name='add-profile'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
