from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    TravelItemListCreateView,
    TravelItemDetailView,
    register_user,
    get_user_profile,
)

urlpatterns = [
    path(
        "items/", TravelItemListCreateView.as_view(), name="travel-item-list"
    ),  # ✅ List & Create
    path(
        "items/<int:pk>/", TravelItemDetailView.as_view(), name="travel-item-detail"
    ),  # ✅ Retrieve, Update, Delete
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", register_user, name="register_user"),
    path("user-profile/", get_user_profile, name="get_user_profile"),
]
