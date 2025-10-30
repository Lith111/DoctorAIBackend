import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// التخطيطات
import PublicLayout from './components/layout/PublicLayout'
import AuthLayout from './components/layout/AuthLayout'
import ProtectedLayout from './components/layout/ProtectedLayout'

// الصفحات العامة
import HomePage from './pages/public/HomePage/HomePage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import TeamPage from './pages/public/TeamPage'

// صفحات المصادقة
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// الصفحات المحمية
import DashboardPage from './pages/protected/DashboardPage'
import PatientsPage from './pages/protected/PatientsPage'
import PatientDetailsPage from './pages/protected/PatientDetailsPage'
import MedicalRecordsPage from './pages/protected/MedicalRecordsPage'
import AIAssistantPage from './pages/protected/AIAssistantPage'

// مكونات الحماية
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* المسارات العامة */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          {/* مسارات المصادقة */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route 
              path="login" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="register" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <RegisterPage />
                </PublicRoute>
              } 
            />
          </Route>

          {/* المسارات المحمية */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="patients/:id" element={<PatientDetailsPage />} />
            <Route path="medical-records" element={<MedicalRecordsPage />} />
            <Route path="ai-assistant" element={<AIAssistantPage />} />
          </Route>

          {/* مسار للصفحات غير موجودة */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App