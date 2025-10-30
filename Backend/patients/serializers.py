from rest_framework import serializers
from .models import Patient, MedicalRecord, MedicalHistory, Allergy

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class MedicalHistorySerializer(serializers.ModelSerializer):
    bmi = serializers.ReadOnlyField()
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)
    
    class Meta:
        model = MedicalHistory
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'bmi', 'created_by_name']

class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    patient_id = serializers.CharField(source='patient.id', read_only=True)
    
    class Meta:
        model = MedicalRecord
        fields = [
            'id', 'patient', 'patient_id', 'patient_name', 'cancer_type', 
            'cancer_subtype', 'cancer_stage', 'diagnosis_date', 'diagnosis_details',
            'symptoms', 'comorbidities', 'family_history', 'initial_treatment_plan',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'patient', 'patient_id', 'patient_name', 'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        # patient يتم تمريره من الـ view، لا نحتاج لإنشائه هنا
        return super().create(validated_data)

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    full_name = serializers.ReadOnlyField()
    doctor_name = serializers.SerializerMethodField()
    medical_record = MedicalRecordSerializer(read_only=True)
    medical_histories = MedicalHistorySerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = [
            'id', 'national_id', 'first_name', 'last_name', 'full_name',
            'date_of_birth', 'age', 'gender', 'blood_type', 'phone', 'email',
            'address', 'emergency_contact', 'notes', 'is_active',
            'doctor', 'doctor_name', 'medical_record', 'medical_histories', 
            'allergies', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'doctor', 'doctor_name', 'created_at', 'updated_at']
    
    def get_doctor_name(self, obj):
        return f"د. {obj.doctor.first_name} {obj.doctor.last_name}"
    
    def validate_national_id(self, value):
        if value and value.strip():
            doctor = self.context['request'].user
            existing_patient = Patient.objects.filter(
                doctor=doctor, 
                national_id=value
            ).first()
            
            if self.instance and self.instance.national_id == value:
                return value
                
            if existing_patient:
                raise serializers.ValidationError(
                    f"رقم الهوية {value} مسجل مسبقاً لدى هذا الطبيب"
                )
        else:
            value = None
        return value
    
    def create(self, validated_data):
        validated_data['doctor'] = self.context['request'].user
        return super().create(validated_data)

# Serializer مختصر للقوائم
class PatientListSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Patient
        fields = ['id', 'full_name', 'age', 'gender', 'phone', 'is_active', 'created_at']