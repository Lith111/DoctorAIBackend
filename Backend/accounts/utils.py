from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from .models import Doctor

def send_verification_email(doctor):
    """إرسال بريد التحقق للمستخدم الجديد"""
    try:
        # إنشاء token للتحقق
        verification_token = get_random_string(50)
        
        # في بيئة الإنتاج، سنخزن هذا الـ token في قاعدة البيانات
        # doctor.verification_token = verification_token
        # doctor.save()
        
        subject = 'تحقق من بريدك الإلكتروني - منصة DoctorAI'
        message = f"""
        عزيزي/عزيزتي د. {doctor.first_name} {doctor.last_name},
        
        شكراً لتسجيلك في منصة DoctorAI. يرجى استخدام الرمز التالي للتحقق من بريدك الإلكتروني:
        
        رمز التحقق: {verification_token}
        
        أو قم بالضغط على الرابط التالي:
        {settings.FRONTEND_URL}/verify-email/{verification_token}/
        
        إذا لم تكن قد قمت بالتسجيل، يرجى تجاهل هذا البريد.
        
        مع خالص التقدير،
        فريق DoctorAI
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [doctor.email],
            fail_silently=False,
        )
        
        return True
    except Exception as e:
        print(f"Failed to send verification email: {e}")
        return False

def send_password_reset_email(doctor):
    """إرسال بريد إعادة تعيين كلمة المرور"""
    try:
        reset_token = get_random_string(50)
        
        subject = 'إعادة تعيين كلمة المرور - منصة DoctorAI'
        message = f"""
        عزيزي/عزيزتي د. {doctor.first_name} {doctor.last_name},
        
        تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك. يرجى استخدام الرمز التالي:
        
        رمز إعادة التعيين: {reset_token}
        
        أو قم بالضغط على الرابط التالي:
        {settings.FRONTEND_URL}/reset-password/{reset_token}/
        
        إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد.
        
        مع خالص التقدير،
        فريق DoctorAI
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [doctor.email],
            fail_silently=False,
        )
        
        return True
    except Exception as e:
        print(f"Failed to send reset email: {e}")
        return False