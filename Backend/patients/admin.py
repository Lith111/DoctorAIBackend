from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'doctor', 'gender', 'date_of_birth', 'age', 'created_at')
    list_filter = ('gender', 'doctor', 'created_at')
    search_fields = ('first_name', 'last_name', 'national_id', 'phone')
    readonly_fields = ('created_at', 'updated_at', 'age')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('doctor', 'national_id', 'first_name', 'last_name', 'date_of_birth', 'gender')
        }),
        ('Contact Information', {
            'fields': ('phone', 'address', 'emergency_contact')
        }),
        ('Additional Information', {
            'fields': ('notes',)
        }),
        ('System Information', {
            'fields': ('created_at', 'updated_at', 'age'),
            'classes': ('collapse',)
        }),
    )