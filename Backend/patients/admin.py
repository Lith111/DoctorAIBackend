from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'doctor', 'gender', 'date_of_birth', 'get_age', 'created_at')
    list_filter = ('gender', 'doctor', 'created_at')
    search_fields = ('first_name', 'last_name', 'national_id', 'phone')
    readonly_fields = ('created_at', 'updated_at', 'get_age')
    
    def get_queryset(self, request):
        # في الـ Admin، يمكن للـ superuser رؤية جميع المرضى
        # لكن الأطباء العاديين يرون فقط مرضاهم
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(doctor=request.user)
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    get_full_name.short_description = 'الاسم الكامل'
    
    def get_age(self, obj):
        return obj.age
    get_age.short_description = 'العمر'
    
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
            'fields': ('created_at', 'updated_at', 'get_age'),
            'classes': ('collapse',)
        }),
    )