from django.db import models
from accounts.models import Doctor
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator

class Patient(models.Model):
    # النموذج الحالي (موجود) - نضيف تحسينات فقط
    GENDER_CHOICES = [
        ('M', 'ذكر'),
        ('F', 'أنثى'),
    ]
    
    BLOOD_TYPE_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'), 
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]
    
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')
    national_id = models.CharField(max_length=20, null=True, blank=True, verbose_name="الرقم الوطني")
    first_name = models.CharField(max_length=100, verbose_name="الاسم الأول")
    last_name = models.CharField(max_length=100, verbose_name="الاسم الأخير")
    date_of_birth = models.DateField(verbose_name="تاريخ الميلاد")
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name="الجنس")
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES, blank=True)
    phone = models.CharField(max_length=20, verbose_name="رقم الهاتف")
    email = models.EmailField(blank=True, verbose_name="البريد الإلكتروني")
    address = models.TextField(blank=True, null=True, verbose_name="العنوان")
    emergency_contact = models.JSONField(default=dict, verbose_name="جهة الاتصال في الطوارئ")
    notes = models.TextField(blank=True,null=True ,verbose_name="ملاحظات عامة")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
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
            models.Index(fields=['national_id']),
            models.Index(fields=['is_active']),
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
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class MedicalRecord(models.Model):
    """السجل الطبي الرئيسي للمريض"""
    CANCER_TYPE_CHOICES = [
        ('breast', 'سرطان الثدي'),
        ('lung', 'سرطان الرئة'),
        ('colon', 'سرطان القولون'),
        ('prostate', 'سرطان البروستاتا'),
        ('leukemia', 'سرطان الدم (لوكيميا)'),
        ('lymphoma', 'لمفوما'),
        ('melanoma', 'ميلانوما'),
        ('pancreatic', 'سرطان البنكرياس'),
        ('liver', 'سرطان الكبد'),
        ('brain', 'سرطان الدماغ'),
        ('other', 'أخرى'),
    ]
    
    STAGE_CHOICES = [
        ('0', 'المرحلة 0'),
        ('I', 'المرحلة I'),
        ('II', 'المرحلة II'),
        ('III', 'المرحلة III'),
        ('IV', 'المرحلة IV'),
        ('unknown', 'غير معروف'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='medical_record')
    cancer_type = models.CharField(max_length=50, choices=CANCER_TYPE_CHOICES, verbose_name="نوع السرطان")
    cancer_subtype = models.CharField(max_length=100, blank=True, verbose_name="النوع الفرعي")
    cancer_stage = models.CharField(max_length=10, choices=STAGE_CHOICES, verbose_name="مرحلة السرطان")
    diagnosis_date = models.DateField(verbose_name="تاريخ التشخيص")
    diagnosis_details = models.TextField(blank=True, verbose_name="تفاصيل التشخيص")
    symptoms = models.JSONField(default=list, verbose_name="الأعراض")
    comorbidities = models.JSONField(default=list, verbose_name="الأمراض المصاحبة")
    family_history = models.TextField(blank=True, verbose_name="التاريخ العائلي")
    initial_treatment_plan = models.TextField(blank=True, verbose_name="الخطة العلاجية الأولية")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'medical_records'
        verbose_name = 'سجل طبي'
        verbose_name_plural = 'سجلات طبية'
    
    def __str__(self):
        return f"السجل الطبي - {self.patient.full_name}"

class MedicalHistory(models.Model):
    """التاريخ المرضي التفصيلي"""
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_histories')
    visit_date = models.DateField(verbose_name="تاريخ الزيارة")
    visit_type = models.CharField(max_length=50, choices=[
        ('initial', 'زيارة أولى'),
        ('followup', 'متابعة'),
        ('emergency', 'طوارئ'),
        ('consultation', 'استشارة'),
    ], verbose_name="نوع الزيارة")
    
    # العلامات الحيوية
    blood_pressure = models.CharField(max_length=10, blank=True, verbose_name="ضغط الدم")
    heart_rate = models.IntegerField(null=True, blank=True, verbose_name="معدل ضربات القلب")
    temperature = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True, verbose_name="درجة الحرارة")
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name="الوزن (كجم)")
    height = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True, verbose_name="الطول (م)")
    
    # المعلومات السريرية
    chief_complaint = models.TextField(verbose_name="الشكوى الرئيسية")
    physical_exam = models.TextField(blank=True, verbose_name="الفحص البدني")
    assessment = models.TextField(blank=True, verbose_name="التشخيص")
    plan = models.TextField(blank=True, verbose_name="الخطة")
    
    # نتائج مختبرية
    lab_results = models.JSONField(default=dict, verbose_name="نتائج المختبر")
    imaging_results = models.JSONField(default=dict, verbose_name="نتائج الأشعة")
    
    created_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, verbose_name="مسجل بواسطة")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'medical_histories'
        verbose_name = 'تاريخ مرضي'
        verbose_name_plural = 'تواريخ مرضية'
        ordering = ['-visit_date', '-created_at']
    
    def __str__(self):
        return f"{self.visit_date} - {self.patient.full_name} - {self.visit_type}"
    
    @property
    def bmi(self):
        """حساب مؤشر كتلة الجسم"""
        if self.weight and self.height:
            return round(self.weight / (self.height ** 2), 1)
        return None

class Allergy(models.Model):
    """حساسيات المريض"""
    SEVERITY_CHOICES = [
        ('mild', 'خفيفة'),
        ('moderate', 'متوسطة'),
        ('severe', 'شديدة'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='allergies')
    allergen = models.CharField(max_length=100, verbose_name="المادة المسببة للحساسية")
    reaction = models.TextField(verbose_name="رد الفعل")
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, verbose_name="الخطورة")
    onset_date = models.DateField(verbose_name="تاريخ الظهور")
    notes = models.TextField(blank=True, verbose_name="ملاحظات")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'allergies'
        verbose_name = 'حساسية'
        verbose_name_plural = 'حساسيات'
        ordering = ['-onset_date']
    
    def __str__(self):
        return f"{self.allergen} - {self.patient.full_name}"