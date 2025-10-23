from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Patient
from .serializers import PatientSerializer
from accounts.permissions import IsDoctorOwner, IsPatientDoctor

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctorOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['gender']
    
    def get_queryset(self):
        return Patient.objects.filter(doctor=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        # إنشاء المريض
        patient = serializer.save(doctor=self.request.user)
        
        # تسجيل حدث إنشاء مريض
        from accounts.views import log_security_event
        log_security_event(
            user=self.request.user,
            event_type='patient_created',
            description=f'Created patient: {patient.first_name} {patient.last_name}',
            ip_address=self.get_client_ip()
        )
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        
        # إضافة معلومات الأطباء الآخرين إلى الرد إذا كان المريض موجوداً عندهم
        if response.status_code == status.HTTP_201_CREATED:
            patient_data = response.data
            patient_instance = Patient.objects.get(id=patient_data['id'])
            
            # التحقق إذا كان هناك معلومات عن أطباء آخرين
            if hasattr(patient_instance, '_other_doctors_info') and patient_instance._other_doctors_info:
                patient_data['warning_message'] = "تم إضافة المريض بنجاح - ملاحظة: هذا المريض مسجل لدى أطباء آخرين"
                patient_data['other_doctors'] = patient_instance._other_doctors_info
            else:
                patient_data['success_message'] = "تم إضافة المريض بنجاح"
        
        return response
    
    def get_client_ip(self):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        return ip