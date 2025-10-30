from django.contrib import admin
from .models import Patient, MedicalRecord, MedicalHistory, Allergy

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'doctor', 'age', 'gender', 'blood_type', 'is_active', 'created_at']
    list_filter = ['gender', 'blood_type', 'is_active', 'doctor', 'created_at']
    search_fields = ['first_name', 'last_name', 'national_id', 'phone']
    readonly_fields = ['created_at', 'updated_at', 'age', 'full_name']
    
    fieldsets = (
        ('المعلومات الأساسية', {
            'fields': ('doctor', 'national_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'blood_type')
        }),
        ('معلومات الاتصال', {
            'fields': ('phone', 'email', 'address', 'emergency_contact')
        }),
        ('معلومات إضافية', {
            'fields': ('notes', 'is_active')
        }),
        ('معلومات النظام', {
            'fields': ('created_at', 'updated_at', 'age', 'full_name'),
            'classes': ('collapse',)
        }),
    )

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ['patient', 'cancer_type', 'cancer_stage', 'diagnosis_date']
    list_filter = ['cancer_type', 'cancer_stage', 'diagnosis_date']
    search_fields = ['patient__first_name', 'patient__last_name']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(MedicalHistory)
class MedicalHistoryAdmin(admin.ModelAdmin):
    list_display = ['patient', 'visit_date', 'visit_type', 'chief_complaint']
    list_filter = ['visit_type', 'visit_date', 'created_by']
    search_fields = ['patient__first_name', 'patient__last_name', 'chief_complaint']
    readonly_fields = ['created_at', 'updated_at', 'bmi']

@admin.register(Allergy)
class AllergyAdmin(admin.ModelAdmin):
    list_display = ['patient', 'allergen', 'severity', 'onset_date']
    list_filter = ['severity', 'onset_date']
    search_fields = ['patient__first_name', 'patient__last_name', 'allergen']
    readonly_fields = ['created_at']