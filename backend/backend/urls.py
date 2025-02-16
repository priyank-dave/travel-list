from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("travelList.urls")),  # Include URLs from your travelList app
]
