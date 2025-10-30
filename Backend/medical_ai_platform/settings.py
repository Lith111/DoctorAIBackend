import os
from datetime import timedelta
from pathlib import Path
from decouple import config 
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = config('SECRET_KEY', default='django-insecure-development-key')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])
# إعدادات المستخدم المخصص
AUTH_USER_MODEL = 'accounts.Doctor'
# Simple JWT settings
SIMPLE_JWT = {
      'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,  # ← تعطيل rotation بدون blacklist
    'BLACKLIST_AFTER_ROTATION': False,  # ← تعطيل blacklist
    'UPDATE_LAST_LOGIN': True,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}
AUTHENTICATION_BACKENDS = [
    'accounts.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]
# إعدادات التطبيقات المخصصة
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    # 'rest_framework_simplejwt.token_blacklist',
    # Local apps
    'accounts.apps.AccountsConfig',  # استخدام التكوين المخصص
    'patients.apps.PatientsConfig',
    'medical.apps.MedicalConfig',
    'ai_services.apps.AiServicesConfig',
    'storage.apps.StorageConfig',
]
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ROOT_URLCONF = 'medical_ai_platform.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'medical_ai_platform.wsgi.application'
# قاعدة البيانات - سيتم تكوينها في المهمة 1.2
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# ملفات Media - مسارات مطلقة من مجلد backend
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# REST Framework settings
# إعدادات الأمان الجديدة
SECURITY_CONFIG = {
    'RATE_LIMITS': {
        'register': '3/hour',
        'login': '5/minute', 
        'patient_create': '10/minute',
        'api': '1000/hour',
    },
    'SECURITY_HEADERS': True,
    'AUDIT_LOGGING': True,
    'EMAIL_VERIFICATION': True,
}

# إعدادات REST Framework المبسطة
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_THROTTLE_CLASSES': [
        'security.rate_limiting.ConcreteRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': SECURITY_CONFIG['RATE_LIMITS'],
}

# إعدادات البريد الإلكتروني
EMAIL_CONFIG = {
    'BACKEND': 'django.core.mail.backends.console.EmailBackend',  # للتطوير
    'HOST': 'localhost',
    'PORT': 1025,
    'USE_TLS': False,
}

# تطبيق إعدادات البريد
EMAIL_BACKEND = EMAIL_CONFIG['BACKEND']
EMAIL_HOST = EMAIL_CONFIG['HOST']
EMAIL_PORT = EMAIL_CONFIG['PORT']
EMAIL_USE_TLS = EMAIL_CONFIG['USE_TLS']
DEFAULT_FROM_EMAIL = 'noreply@doctorai.com'

# إعدادات Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'security.headers.SecurityHeadersMiddleware',  # Middleware الجديد
]

# إعدادات Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'security_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'security.log',
        },
        'email_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'email.log',
        },
    },
    'loggers': {
        'security': {
            'handlers': ['security_file'],
            'level': 'INFO',
            'propagate': True,
        },
        'email': {
            'handlers': ['email_file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}