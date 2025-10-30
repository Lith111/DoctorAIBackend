from httpx import request
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Doctor
from .serializers import DoctorRegistrationSerializer, DoctorLoginSerializer,DoctorProfileSerializer
from .permissions import IsDoctorOwner
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import logout
import logging
from security.rate_limiting import RegisterThrottle, LoginThrottle
from security.audit import SecurityAudit
from security.email_verification import EmailService
from security.rate_limiting import RegisterThrottle, LoginThrottle
from security.audit import SecurityAudit
from security.email_verification import EmailService

@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([RegisterThrottle])
def doctor_register(request):
    """تسجيل طبيب جديد مع Rate Limiting"""
    try:
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            
            # إرسال بريد التحقق
            EmailService.send_verification_email(doctor)
            
            # تسجيل الحدث الأمني
            SecurityAudit.log_event(
                'USER_REGISTERED',
                user=doctor,
                request=request,
                details={'specialization': doctor.specialization}
            )
            
            refresh = RefreshToken.for_user(doctor)
            return Response({
                'message': 'تم تسجيل الطبيب بنجاح - تم إرسال بريد التحقق',
                'doctor': DoctorProfileSerializer(doctor).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'message': 'بيانات التسجيل غير صالحة',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        SecurityAudit.log_event(
            'REGISTRATION_ERROR',
            request=request,
            details={'error': str(e)}
        )
        return Response({
            'message': 'حدث خطأ أثناء التسجيل',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([LoginThrottle])
def doctor_login(request):
    """تسجيل الدخول مع Rate Limiting"""
    try:
        serializer = DoctorLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            doctor = authenticate(request, email=email, password=password)
            
            if doctor is not None and doctor.is_active:
                # تسجيل الدخول الناجح
                SecurityAudit.log_login_success(doctor, request)
                
                refresh = RefreshToken.for_user(doctor)
                return Response({
                    'message': 'تم تسجيل الدخول بنجاح',
                    'doctor': DoctorProfileSerializer(doctor).data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })
            else:
                # تسجيل محاولة الدخول الفاشلة
                SecurityAudit.log_login_failed(email, request)
                return Response({
                    'message': 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'message': 'بيانات الدخول غير صالحة',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({
            'message': 'حدث خطأ أثناء تسجيل الدخول',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DoctorProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated, IsDoctorOwner]  # الصلاحيات تعمل تلقائياً

    def get_object(self):
        # التأكد من أن المستخدم يمكنه الوصول فقط لملفه الشخصي
        obj = self.request.user

        # تسجيل محاولة الوصول (للتتبع الأمني)
        print(f"User {obj.email} accessed their profile at {timezone.now()}")
        
        return obj
    
    def update(self, request, *args, **kwargs):
        # قائمة الحقول المحظورة
        forbidden_fields = [
            'email', 'is_verified', 'is_staff', 'is_superuser', 
            'is_active', 'password', 'last_login', 'date_joined'
        ]
        
        # التحقق من الحقول المحظورة
        for field in forbidden_fields:
            if field in request.data:
                return Response({
                    'message': f'غير مسموح بتعديل الحقل: {field}',
                    'error': 'صلاحيات غير كافية'
                }, status=status.HTTP_403_FORBIDDEN)
        
        # لا حاجة للتحقق من الصلاحيات يدوياً لأن IsDoctorOwner يقوم بذلك تلقائياً
        return super().update(request, *args, **kwargs)

logger = logging.getLogger('security')

def log_security_event(user, event_type, description, ip_address=None):
    """
    تسجيل الأحداث الأمنية في النظام
    """
    try:
        logger.info(
            f"Security Event - User: {user.email}, "
            f"Type: {event_type}, "
            f"Description: {description}, "
            f"IP: {ip_address}, "
            f"Time: {timezone.now()}"
        )
        
        print(f" Security Event: {event_type} - {user.email} - {description}")
        
    except Exception as e:
        logger.error(f"Failed to log security event: {e}")
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def doctor_logout(request):
    """
    تسجيل خروج الطبيب مع تسجيل الحدث الأمني
    """
    try:
        user = request.user
        user_email = user.email
        
        # الحصول على عنوان IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')
        
        # تسجيل حدث الخروج الأمني
        log_security_event(
            user=user,
            event_type='logout',
            description='doctor is logout',
            ip_address=ip_address
        )
        
        # تسجيل الخروج
        logout(request)
        
        return Response({
            'message': 'تم تسجيل الخروج بنجاح',
            'timestamp': timezone.now().isoformat()
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        # في حالة الخطأ، نقوم بتسجيل الخروج دون التأثير على المستخدم
        logout(request)
        return Response({
            'message': 'تم تسجيل الخروج',
            'error': 'حدث خطأ في تسجيل التفاصيل الأمنية'
        }, status=status.HTTP_200_OK)