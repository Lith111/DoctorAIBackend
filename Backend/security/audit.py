from django.db import models
from django.utils import timezone
from accounts.models import Doctor
import logging

# إعداد logger مخصص
security_logger = logging.getLogger('security')

class SecurityAudit:
    """
    نظام مراقبة أمني مركزي
    """
    @staticmethod
    def log_event(event_type, user=None, request=None, details=None, resource_type=None, resource_id=None):
        """تسجيل حدث أمني"""
        try:
            audit_data = {
                'event_type': event_type,
                'user_id': user.id if user else None,
                'user_email': user.email if user else 'anonymous',
                'timestamp': timezone.now().isoformat(),
                'ip_address': SecurityAudit._get_client_ip(request) if request else None,
                'user_agent': request.META.get('HTTP_USER_AGENT', '') if request else '',
                'resource_type': resource_type,
                'resource_id': resource_id,
                'details': details or {}
            }
            
            # تسجيل في ملف log
            security_logger.info(f"SECURITY_EVENT: {audit_data}")
            
            # تسجيل في قاعدة البيانات (اختياري)
            SecurityAudit._save_to_database(audit_data)
            
            # طباعة للتحقق أثناء التطوير
            print(f"🔐 [SECURITY] {event_type} - User: {audit_data['user_email']} - IP: {audit_data['ip_address']}")
            
            return audit_data
            
        except Exception as e:
            security_logger.error(f"Failed to log security event: {e}")
            return None

    @staticmethod
    def _get_client_ip(request):
        """استخراج IP العميل"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR')

    @staticmethod
    def _save_to_database(audit_data):
        """حفظ الحدث في قاعدة البيانات"""
        try:
            from accounts.models import AuditLog
            AuditLog.objects.create(
                user_id=audit_data['user_id'],
                action=audit_data['event_type'],
                ip_address=audit_data['ip_address'],
                user_agent=audit_data['user_agent'],
                resource_type=audit_data['resource_type'] or '',
                resource_id=str(audit_data['resource_id']) if audit_data['resource_id'] else '',
                details=audit_data['details']
            )
        except Exception as e:
            security_logger.error(f"Failed to save audit log to database: {e}")

    @staticmethod
    def log_login_success(user, request):
        """تسجيل دخول ناجح"""
        return SecurityAudit.log_event(
            'LOGIN_SUCCESS',
            user=user,
            request=request,
            details={'method': 'email_password'}
        )

    @staticmethod
    def log_login_failed(email, request):
        """تسجيل محاولة دخول فاشلة"""
        return SecurityAudit.log_event(
            'LOGIN_FAILED',
            user=None,
            request=request,
            details={'attempted_email': email}
        )

    @staticmethod
    def log_rate_limit_exceeded(request, scope):
        """تسجيل تجاوز حد Rate Limiting"""
        return SecurityAudit.log_event(
            'RATE_LIMIT_EXCEEDED',
            user=request.user if request.user.is_authenticated else None,
            request=request,
            details={'scope': scope, 'path': request.path}
        )