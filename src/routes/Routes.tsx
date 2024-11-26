import { BrowserRouter, Route, Routes as RouterRoutes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoadingPage from '../pages/LoadingPage'
import LoginPageRoute from './LoginPageRoute'
import SignUpPageRoute from './SignUpPageRoute'
import ProtectedRoute from './ProtectedRoute'
import Error from '../pages/Error'

// USER PAGES
import Dashboard from '../pages/Dashboard'

function Routes() {
    const { isLoading, isAuthenticated } = useAuth()
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <BrowserRouter>
                <RouterRoutes>
                  <Route path="/" element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  } />
                  <Route path="/login" element={<LoginPageRoute />} />
                  <Route path="/signup" element={<SignUpPageRoute />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/error" element={<Error/>}></Route>
                  <Route path="*" element={<Navigate to="/error" replace />} />
                </RouterRoutes>
              </BrowserRouter>
            )}
        </>
    )
}

export default Routes
