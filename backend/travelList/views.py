from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import TravelItem
from .serializers import TravelItemSerializer, UserSerializer
from rest_framework import status


# 🔹 User Profile View
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Return the authenticated user's details."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# 🔹 User Registration
@api_view(["POST"])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data["password"])  # ✅ Hash password
        user.save()
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TravelItemListCreateView(generics.ListCreateAPIView):
    serializer_class = TravelItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TravelItem.objects.filter(user=self.request.user)  # ✅ Filter by user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ✅ Ensure the user is set


# 🔹 Retrieve, Update & Delete a Single Travel Item
class TravelItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TravelItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TravelItem.objects.filter(user=self.request.user)  # ✅ Filter by user
