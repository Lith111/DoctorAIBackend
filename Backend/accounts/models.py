from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import BaseUserManager

class DoctorManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('يجب تقديم البريد الإلكتروني')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('المشرف يجب أن يكون is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('المشرف يجب أن يكون is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)
class Doctor(AbstractUser):
    SPECIALIZATION_CHOICES = [
        ('oncology', 'أورام'),
        ('hematology', 'أمراض الدم'),
        ('radiology', 'أشعة'),
        ('surgery', 'جراحة الأورام'),
    ]
    
    specialization = models.CharField(max_length=50, choices=SPECIALIZATION_CHOICES)
    
    license_number = models.CharField(max_length=50, unique=True)
    hospital = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = DoctorManager()
    # استخدام البريد الإلكتروني بدلاً من اسم المستخدم
    username = None
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'specialization']
    
    class Meta:
        db_table = 'doctors'
        verbose_name = 'طبيب'
        verbose_name_plural = 'أطباء'
    
    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} - {self.specialization}"