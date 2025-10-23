from django.db import models
from accounts.models import Doctor

class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'ذكر'),
        ('F', 'أنثى'),
    ]
    
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')
    national_id = models.CharField(
        max_length=20, 
        null=True, 
        blank=True,  # إزالة unique=True
        verbose_name="رقم الهوية الوطنية"
    )
    first_name = models.CharField(max_length=100, verbose_name="الاسم الأول")
    last_name = models.CharField(max_length=100, verbose_name="الاسم الأخير")
    date_of_birth = models.DateField(verbose_name="تاريخ الميلاد")
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name="الجنس")
    phone = models.CharField(max_length=20, verbose_name="رقم الهاتف")
    emergency_contact = models.JSONField(
        default=dict, 
        verbose_name="جهة الاتصال في الطوارئ"
    )
    address = models.TextField(blank=True, null=True, verbose_name="العنوان")
    notes = models.TextField(blank=True, null=True, verbose_name="ملاحظات")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'patients'
        verbose_name = 'مريض'
        verbose_name_plural = 'مرضى'
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'national_id'],
                name='unique_patient_per_doctor'
            )
        ]
        indexes = [
            models.Index(fields=['doctor', 'created_at']),
            models.Index(fields=['last_name', 'first_name']),
            models.Index(fields=['national_id']),  # فهرس للبحث السريع
        ]
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.doctor}"
    
    @property
    def age(self):
        from datetime import date
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )
    
    def save(self, *args, **kwargs):
        # السماح بـ national_id فارغ أو مكرر بين أطباء مختلفين
        # ولكن منع التكرار لنفس الطبيب
        if self.national_id == "":
            self.national_id = None
            
        super().save(*args, **kwargs)