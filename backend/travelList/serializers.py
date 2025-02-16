from rest_framework import serializers
from rest_framework.validators import UniqueValidator  # ✅ Correct import
from django.contrib.auth.models import User
from .models import TravelItem


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, min_length=6)

    def create(self, validated_data):
        """Create and return a new user with an encrypted password."""
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])  # ✅ Hash the password
        user.save()
        return user

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]


class TravelItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelItem
        fields = ["id", "description", "quantity", "packed"]  # ❌ No 'user' field
