from rest_framework import permissions

class IsDoctorOwner(permissions.BasePermission):
    """
    صلاحية للتحقق من أن المستخدم يصل لبياناته فقط
    """
    def has_permission(self, request, view):
        # السماح للجميع بالوصول للقوائم (سيتم фильترتها لاحقاً)
        if request.method in permissions.SAFE_METHODS:
            return True
        return True
    
    def has_object_permission(self, request, view, obj):
        # التحقق من أن الطبيب يصل فقط لمرضاه
        if hasattr(obj, 'doctor'):
            return obj.doctor == request.user
        elif hasattr(obj, 'patient'):
            return obj.patient.doctor == request.user
        return obj == request.user

class IsPatientDoctor(permissions.BasePermission):
    """
    صلاحية للتحقق من أن المريض يتبع للطبيب
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        return obj.doctor == request.user

class CanAccessPatientData(permissions.BasePermission):
    """
    صلاحية للتحقق من إمكانية الوصول لبيانات المريض
    """
    def has_permission(self, request, view):
        # التحقق من patient_id في URL
        if hasattr(view, 'get_patient_id'):
            patient_id = view.get_patient_id()
            if patient_id:
                from patients.models import Patient
                try:
                    patient = Patient.objects.get(id=patient_id)
                    return patient.doctor == request.user
                except Patient.DoesNotExist:
                    return False
        return True