from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class TravelItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    packed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity}x {self.description} - {'Packed' if self.packed else 'Not Packed'}"
