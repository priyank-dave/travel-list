from django.contrib import admin
from .models import TravelItem


@admin.register(TravelItem)
class TravelItemAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "quantity", "packed", "user")
    list_filter = ("packed", "user")
    search_fields = ("description", "user__username")
    ordering = ("id",)


# Alternatively, you can use:
# admin.site.register(TravelItem, TravelItemAdmin)
