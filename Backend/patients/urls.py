from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, MedicalHistoryViewSet, AllergyViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'medical-histories', MedicalHistoryViewSet, basename='medical-history')
router.register(r'allergies', AllergyViewSet, basename='allergy')

urlpatterns = [
    path('', include(router.urls)),
]