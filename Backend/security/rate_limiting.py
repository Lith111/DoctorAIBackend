from rest_framework.throttling import SimpleRateThrottle
from django.core.cache import cache
from django.conf import settings
import time

class ConcreteRateThrottle(SimpleRateThrottle):
    """
    نظام Rate Limiting مضمون وسهل التتبع
    """
    def __init__(self, scope, rate):
        self.scope = scope
        self.rate = rate
        super().__init__()

    def get_cache_key(self, request, view):
        # استخدام IP + scope كمفتاح فريد
        ident = self.get_ident(request)
        return f"throttle_{self.scope}_{ident}"

    def allow_request(self, request, view):
        # السماح للطلبات غير الخاضعة لل throttling
        if not self.should_throttle(request, view):
            return True
            
        return super().allow_request(request, view)

    def should_throttle(self, request, view):
        """تحديد إذا كان الطلب يجب أن يخضع لل throttling"""
        return True

# Throttle Classes المخصصة
class RegisterThrottle(ConcreteRateThrottle):
    def __init__(self):
        super().__init__('register', '3/hour')
    
    def should_throttle(self, request, view):
        return request.method == 'POST' and 'register' in request.path

class LoginThrottle(ConcreteRateThrottle):
    def __init__(self):
        super().__init__('login', '5/minute')
    
    def should_throttle(self, request, view):
        return request.method == 'POST' and 'login' in request.path

from rest_framework.throttling import SimpleRateThrottle
from django.core.cache import cache

class RegisterThrottle(SimpleRateThrottle):
    """
    Throttle مخصص لتسجيل المستخدمين - 3 في الساعة
    """
    scope = 'register'
    
    def get_cache_key(self, request, view):
        if request.method == 'POST' and 'register' in request.path:
            ident = self.get_ident(request)
            return self.cache_format % {
                'scope': self.scope,
                'ident': ident
            }
        return None

class LoginThrottle(SimpleRateThrottle):
    """
    Throttle مخصص لتسجيل الدخول - 5 في الدقيقة
    """
    scope = 'login'
    
    def get_cache_key(self, request, view):
        if request.method == 'POST' and 'login' in request.path:
            ident = self.get_ident(request)
            return self.cache_format % {
                'scope': self.scope,
                'ident': ident
            }
        return None

class PatientCreateThrottle(SimpleRateThrottle):
    """
    Throttle مخصص لإضافة المرضى - 10 في الدقيقة
    """
    scope = 'patient_create'
    
    def get_cache_key(self, request, view):
        if request.method == 'POST' and hasattr(view, 'basename') and view.basename == 'patient':
            ident = self.get_ident(request)
            return self.cache_format % {
                'scope': self.scope,
                'ident': ident
            }
        return None

# إزالة ConcreteRateThrottle المعقد - نستخدم SimpleRateThrottle مباشرة
# دالة مساعدة لفحص حالة ال Rate Limiting
def get_throttle_status(request, scope):
    """الحصول على حالة ال Rate Limiting لطلب معين"""
    throttle = ConcreteRateThrottle()
    throttle.scope = scope
    throttle.rate = '1/minute'  # قيمة افتراضية
    
    key = f"throttle_{scope}_{throttle.get_ident(request)}"
    history = cache.get(key, [])
    
    return {
        'key': key,
        'remaining_requests': max(0, 3 - len(history)),
        'history_count': len(history),
        'reset_time': min(history) if history else None
    }