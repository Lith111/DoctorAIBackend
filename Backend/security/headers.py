from django.utils.deprecation import MiddlewareMixin

class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    middleware لإضافة headers أمنية لجميع الاستجابات
    """
    def process_response(self, request, response):
        # إضافة headers أمنية
        security_headers = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        }
        
        # إضافة CSP بشكل ديناميكي
        csp_directives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "connect-src 'self'",
            "font-src 'self'",
            "object-src 'none'",
            "media-src 'self'",
            "frame-src 'none'"
        ]
        
        security_headers['Content-Security-Policy'] = '; '.join(csp_directives)
        
        # تطبيق headers على الاستجابة
        for header, value in security_headers.items():
            if header not in response:
                response[header] = value
        
        return response

def add_security_headers(response):
    """دالة مساعدة لإضافة headers أمنية لاستجابة معينة"""
    middleware = SecurityHeadersMiddleware(lambda req: response)
    return middleware.process_response(None, response)