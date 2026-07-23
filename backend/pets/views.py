from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Pet, AdoptionRequest
from .serializers import PetSerializer, PetDetailSerializer, AdoptionRequestSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['species', 'status', 'size', 'gender']
    search_fields = ['name', 'breed', 'description', 'location']
    ordering_fields = ['date_added', 'age', 'name']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PetDetailSerializer
        return PetSerializer

    @action(detail=False)
    def stats(self, request):
        total = Pet.objects.count()
        available = Pet.objects.filter(status='available').count()
        adopted = Pet.objects.filter(status='adopted').count()
        pending = Pet.objects.filter(status='pending').count()
        return Response({
            'total': total,
            'available': available,
            'adopted': adopted,
            'pending': pending,
        })

    @action(detail=True, methods=['post'])
    def adopt(self, request, pk=None):
        """Shortcut endpoint to submit an adoption request for this pet."""
        pet = self.get_object()
        data = request.data.copy()
        data['pet'] = pet.id
        serializer = AdoptionRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        pet.status = 'pending'
        pet.save(update_fields=['status'])
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AdoptionRequestViewSet(viewsets.ModelViewSet):
    queryset = AdoptionRequest.objects.all()
    serializer_class = AdoptionRequestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'pet']

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        req = self.get_object()
        req.status = 'approved'
        req.save(update_fields=['status'])
        req.pet.status = 'adopted'
        req.pet.save(update_fields=['status'])
        return Response(self.get_serializer(req).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        req = self.get_object()
        req.status = 'rejected'
        req.save(update_fields=['status'])
        req.pet.status = 'available'
        req.pet.save(update_fields=['status'])
        return Response(self.get_serializer(req).data)
