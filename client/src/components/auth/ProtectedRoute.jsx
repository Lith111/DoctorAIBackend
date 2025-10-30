import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    // إعادة التوجيه إلى صفحة Login مع حفظ المسار المحاول الوصول إليه
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute