import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    // إذا كان المستخدم مسجلاً، إعادة التوجيه إلى لوحة التحكم
    return <Navigate to="/app" replace />
  }

  return children
}

export default PublicRoute