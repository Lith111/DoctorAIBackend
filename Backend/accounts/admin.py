from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Doctor

@admin.register(Doctor)
class DoctorAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'specialization', 'hospital', 'is_verified', 'is_active')
    list_filter = ('specialization', 'is_verified', 'is_active', 'created_at')
    search_fields = ('email', 'first_name', 'last_name', 'license_number', 'hospital')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'phone')}),
        ('Professional Info', {'fields': ('specialization', 'license_number', 'hospital')}),
        ('Permissions', {'fields': ('is_verified', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'specialization', 'license_number', 'hospital', 'phone', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')