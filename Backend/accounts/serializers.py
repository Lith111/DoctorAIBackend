from rest_framework import serializers
from .models import Doctor
from django.contrib.auth.password_validation import validate_password

class DoctorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    class Meta:
        model = Doctor
        fields = (  'email', 'first_name', 'last_name', 'specialization',
            'license_number', 'hospital', 'phone', 'password', 'password_confirm')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'specialization': {'required': True},
            'license_number': {'required': True},
        }
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm":"passwords do not match"})
        
        if Doctor.objects.filter(license_number=attrs['license_number']).exists():
            raise serializers.ValidationError({"license_number": "A doctor with this license number already exists."})
        
        return attrs
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        doctor = Doctor(**validated_data)
        doctor.set_password(password)
        doctor.save()
        return doctor
class DoctorLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    class Meta :
        model = Doctor
        fields = ['email', 'password']
        
class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'id', 'email', 'first_name', 'last_name', 'specialization',
            'license_number', 'hospital', 'phone', 'is_verified',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'email', 'license_number', 'is_verified', 
            'created_at', 'updated_at'
        ]
    def validate(self, attrs):
            # منع تغيير بعض الحقول بعد التسجيل
            instance = getattr(self, 'instance', None)
            if instance:
                if 'license_number' in attrs and attrs['license_number'] != instance.license_number:
                    raise serializers.ValidationError({
                        "license_number": "لا يمكن تغيير رقم الترخيص بعد التسجيل"
                    })
            
            return attrs