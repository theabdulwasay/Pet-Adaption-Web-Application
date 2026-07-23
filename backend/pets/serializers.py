from rest_framework import serializers
from .models import Pet, AdoptionRequest


class AdoptionRequestSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(source='pet.name', read_only=True)

    class Meta:
        model = AdoptionRequest
        fields = [
            'id', 'pet', 'pet_name', 'applicant_name', 'email', 'phone',
            'message', 'status', 'created_at',
        ]
        read_only_fields = ['status', 'created_at']


class PetSerializer(serializers.ModelSerializer):
    species_display = serializers.CharField(source='get_species_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    request_count = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'species', 'species_display', 'breed', 'age', 'gender',
            'size', 'color', 'description', 'image_url', 'vaccinated', 'neutered',
            'location', 'status', 'status_display', 'date_added', 'request_count',
        ]

    def get_request_count(self, obj):
        return obj.adoption_requests.count()


class PetDetailSerializer(PetSerializer):
    adoption_requests = AdoptionRequestSerializer(many=True, read_only=True)

    class Meta(PetSerializer.Meta):
        fields = PetSerializer.Meta.fields + ['adoption_requests']
