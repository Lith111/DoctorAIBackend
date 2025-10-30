from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
import logging

email_logger = logging.getLogger('email')

class EmailService:
    """
    خدمة مبسطة لإرسال البريد الإلكتروني
    """
    
    @staticmethod
    def send_verification_email(doctor):
        """إرسال بريد التحقق"""
        try:
            token = get_random_string(32)
            
            subject = "🔐 تحقق من بريدك الإلكتروني - DoctorAI"
            message = f"""
            عزيزي/عزيزتي د. {doctor.first_name} {doctor.last_name},
            
            نشكرك على الانضمام إلى منصة DoctorAI. 
            
            يرجى استخدام الرمز التالي لتفعيل حسابك:
            
            📧 رمز التحقق: {token}
            
            أو قم بزيارة الرابط:
            {getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')}/verify-email/{token}/
            
            إذا لم تكن قد قمت بإنشاء هذا الحساب، يرجى تجاهل هذه الرسالة.
            
            مع خالص التقدير،
            فريق DoctorAI
            """
            
            send_mail(
                subject,
                message,
                getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@doctorai.com'),
                [doctor.email],
                fail_silently=False,
            )
            
            email_logger.info(f"Verification email sent to {doctor.email}")
            return True
            
        except Exception as e:
            email_logger.error(f"Failed to send verification email to {doctor.email}: {e}")
            return False

    @staticmethod
    def send_notification(doctor, subject, message):
        """إرسال إشعار عام"""
        try:
            send_mail(
                subject,
                message,
                getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@doctorai.com'),
                [doctor.email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            email_logger.error(f"Failed to send notification to {doctor.email}: {e}")
            return False