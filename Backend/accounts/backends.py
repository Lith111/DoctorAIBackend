from django.contrib.auth.backends import ModelBackend
from .models import Doctor

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            doctor = Doctor.objects.get(email=email)
            if doctor.check_password(password):
                return doctor
        except Doctor.DoesNotExist:
            return None
    
    def get_user(self, user_id):
        try:
            return Doctor.objects.get(pk=user_id)
        except Doctor.DoesNotExist:
            return None