from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('doctor/register/', views.doctor_register, name='doctor_register'), 
    path('doctor/login/', views.doctor_login, name='doctor_login'),
    path('doctor/logout/', views.doctor_logout, name='doctor-logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # الملف الشخصي
    path('doctor/profile/', views.DoctorProfileView.as_view(), name='doctor-profile'),
]
