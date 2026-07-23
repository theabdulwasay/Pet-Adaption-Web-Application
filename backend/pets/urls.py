from rest_framework.routers import DefaultRouter
from .views import PetViewSet, AdoptionRequestViewSet

router = DefaultRouter()
router.register('pets', PetViewSet)
router.register('requests', AdoptionRequestViewSet)

urlpatterns = router.urls
