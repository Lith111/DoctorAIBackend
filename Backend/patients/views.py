from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from security.rate_limiting import PatientCreateThrottle
from .models import Patient, MedicalRecord, MedicalHistory, Allergy
from .serializers import (
    PatientSerializer, PatientListSerializer, MedicalRecordSerializer,
    MedicalHistorySerializer, AllergySerializer
)
from accounts.permissions import IsDoctorOwner
from security.audit import SecurityAudit

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    permission_classes = [IsDoctorOwner]
    throttle_classes = [PatientCreateThrottle] 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['gender', 'blood_type', 'is_active']
    
    def get_queryset(self):
        return Patient.objects.filter(doctor=self.request.user).order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PatientListSerializer
        return PatientSerializer
    
    def perform_create(self, serializer):
        patient = serializer.save(doctor=self.request.user)
        SecurityAudit.log_event(
            'PATIENT_CREATED',
            user=self.request.user,
            request=self.request,
            resource_type='patient',
            resource_id=patient.id,
            details={'patient_name': patient.full_name}
        )
    
    def perform_update(self, serializer):
        patient = serializer.save()
        SecurityAudit.log_event(
            'PATIENT_UPDATED',
            user=self.request.user,
            request=self.request,
            resource_type='patient',
            resource_id=patient.id,
            details={'patient_name': patient.full_name}
        )
    
    def perform_destroy(self, instance):
        SecurityAudit.log_event(
            'PATIENT_DELETED',
            user=self.request.user,
            request=self.request,
            resource_type='patient',
            resource_id=instance.id,
            details={'patient_name': instance.full_name}
        )
        instance.delete()
    
    @action(detail=True, methods=['get', 'post'])
    def medical_record(self, request, pk=None):
        """إدارة السجل الطبي للمريض"""
        try:
            patient = self.get_object()
            
            if request.method == 'GET':
                try:
                    medical_record = patient.medical_record
                    serializer = MedicalRecordSerializer(medical_record)
                    return Response(serializer.data)
                except MedicalRecord.DoesNotExist:
                    return Response({
                        'detail': 'لا يوجد سجل طبي',
                        'patient_id': patient.id,
                        'patient_name': patient.full_name
                    }, status=status.HTTP_404_NOT_FOUND)
            
            elif request.method == 'POST':
                # التحقق من أن المريض ليس لديه سجل طبي بالفعل
                if hasattr(patient, 'medical_record'):
                    return Response({
                        'detail': 'المريض لديه سجل طبي بالفعل',
                        'existing_record_id': patient.medical_record.id
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                serializer = MedicalRecordSerializer(data=request.data)
                if serializer.is_valid():
                    # حفظ السجل الطبي مع ربطه بالمريض
                    medical_record = serializer.save(patient=patient)
                    
                    SecurityAudit.log_event(
                        'MEDICAL_RECORD_CREATED',
                        user=request.user,
                        request=request,
                        resource_type='medical_record',
                        resource_id=medical_record.id,
                        details={'patient_id': patient.id, 'patient_name': patient.full_name}
                    )
                    
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                
                return Response({
                    'detail': 'بيانات السجل الطبي غير صالحة',
                    'errors': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        
        except Patient.DoesNotExist:
            return Response({
                'detail': 'المريض غير موجود'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            SecurityAudit.log_event(
                'MEDICAL_RECORD_ERROR',
                user=request.user,
                request=request,
                details={'error': str(e), 'patient_id': pk}
            )
            return Response({
                'detail': 'حدث خطأ في استرجاع السجل الطبي',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get', 'post'])
    def medical_histories(self, request, pk=None):
        """إدارة التاريخ المرضي"""
        patient = self.get_object()
        
        if request.method == 'GET':
            histories = patient.medical_histories.all()
            serializer = MedicalHistorySerializer(histories, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = MedicalHistorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(patient=patient, created_by=request.user)
                SecurityAudit.log_event(
                    'MEDICAL_HISTORY_CREATED',
                    user=request.user,
                    request=request,
                    resource_type='medical_history',
                    resource_id=serializer.instance.id,
                    details={'patient_id': patient.id}
                )
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
    
    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """إحصائيات المريض"""
        patient = self.get_object()
        
        stats = {
            'total_visits': patient.medical_histories.count(),
            'total_allergies': patient.allergies.count(),
            'last_visit': patient.medical_histories.order_by('-visit_date').first().visit_date if patient.medical_histories.exists() else None,
            'has_medical_record': hasattr(patient, 'medical_record'),
        }
        
        return Response(stats)

class MedicalHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsDoctorOwner]
    
    def get_queryset(self):
        return MedicalHistory.objects.filter(
            patient__doctor=self.request.user
        ).order_by('-visit_date')
    
    def perform_create(self, serializer):
        medical_history = serializer.save(created_by=self.request.user)
        SecurityAudit.log_event(
            'MEDICAL_HISTORY_CREATED',
            user=self.request.user,
            request=self.request,
            resource_type='medical_history',
            resource_id=medical_history.id,
            details={'patient_id': medical_history.patient.id}
        )

class AllergyViewSet(viewsets.ModelViewSet):
    serializer_class = AllergySerializer
    permission_classes = [IsDoctorOwner]
    
    def get_queryset(self):
        return Allergy.objects.filter(
            patient__doctor=self.request.user
        ).order_by('-onset_date')
    
    def perform_create(self, serializer):
        allergy = serializer.save()
        SecurityAudit.log_event(
            'ALLERGY_CREATED',
            user=self.request.user,
            request=self.request,
            resource_type='allergy',
            resource_id=allergy.id,
            details={'patient_id': allergy.patient.id}
        )