from django.contrib import admin
from .models import Pet, AdoptionRequest


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'species', 'breed', 'age', 'status', 'date_added')
    list_filter = ('species', 'status', 'size', 'gender')
    search_fields = ('name', 'breed', 'description')


@admin.register(AdoptionRequest)
class AdoptionRequestAdmin(admin.ModelAdmin):
    list_display = ('pet', 'applicant_name', 'email', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('applicant_name', 'email')
