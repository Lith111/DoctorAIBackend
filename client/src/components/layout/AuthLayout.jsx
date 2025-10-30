import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* الشعار */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600">DoctorAI</h1>
            <p className="text-gray-600 mt-2">المساعد الذكي لأطباء الأورام</p>
          </Link>
        </div>

        {/* المحتوى */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>

        {/* روابط إضافية */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
              سجل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout