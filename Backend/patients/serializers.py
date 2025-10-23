from rest_framework import serializers
from .models import Patient
from django.db.models import Q

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    doctor_name = serializers.SerializerMethodField()
    existing_doctors = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Patient
        fields = [
            'id', 'national_id', 'first_name', 'last_name', 
            'date_of_birth', 'age', 'gender', 'phone', 
            'emergency_contact', 'address', 'notes',
            'doctor', 'doctor_name', 'existing_doctors',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'doctor', 'doctor_name', 'existing_doctors', 
            'created_at', 'updated_at'
        ]
    
    def get_doctor_name(self, obj):
        return f"د. {obj.doctor.first_name} {obj.doctor.last_name}"
    
    def get_existing_doctors(self, obj):
        """الحصول على قائمة الأطباء الآخرين الذين لديهم نفس المريض"""
        if not obj.national_id:
            return []
        
        # البحث عن نفس المريض (بنفس الرقم الوطني) عند أطباء آخرين
        existing_patients = Patient.objects.filter(
            national_id=obj.national_id
        ).exclude(
            doctor=obj.doctor
        ).select_related('doctor')
        
        doctors_info = []
        for patient in existing_patients:
            doctors_info.append({
                'doctor_name': f"د. {patient.doctor.first_name} {patient.doctor.last_name}",
                'doctor_phone': patient.doctor.phone,
                'doctor_email': patient.doctor.email,
                'doctor_specialization': patient.doctor.get_specialization_display(),
                'hospital': patient.doctor.hospital,
                'patient_registered_at': patient.created_at.strftime('%Y-%m-%d')
            })
        
        return doctors_info
    
    def validate_national_id(self, value):
        """التحقق من أن رقم الهوية فريد لكل طبيب فقط"""
        if value and value.strip():
            doctor = self.context['request'].user
            existing_patient = Patient.objects.filter(
                doctor=doctor, 
                national_id=value
            ).first()
            
            # السماح بالتحديث لنفس المريض
            if self.instance and self.instance.national_id == value:
                return value
                
            # منع التكرار لنفس الطبيب
            if existing_patient:
                raise serializers.ValidationError(
                    f"رقم الهوية {value} مسجل مسبقاً لدى هذا الطبيب للمريض {existing_patient.first_name} {existing_patient.last_name}"
                )
        else:
            value = None
            
        return value
    
    def create(self, validated_data):
        # تعيين الطبيب الحالي تلقائياً
        validated_data['doctor'] = self.context['request'].user
        national_id = validated_data.get('national_id')
        
        # البحث عن نفس المريض عند أطباء آخرين
        other_doctors_patients = []
        if national_id:
            other_doctors_patients = Patient.objects.filter(
                national_id=national_id
            ).exclude(
                doctor=self.context['request'].user
            ).select_related('doctor')
        
        # إنشاء المريض
        patient = super().create(validated_data)
        
        # تخزين معلومات الأطباء الآخرين في instance للمستخدم لاحقاً
        patient._other_doctors_info = []
        for other_patient in other_doctors_patients:
            patient._other_doctors_info.append({
                'doctor_name': f"د. {other_patient.doctor.first_name} {other_patient.doctor.last_name}",
                'doctor_phone': other_patient.doctor.phone,
                'doctor_email': other_patient.doctor.email,
                'hospital': other_patient.doctor.hospital,
                'specialization': other_patient.doctor.get_specialization_display()
            })
        
        return patient
