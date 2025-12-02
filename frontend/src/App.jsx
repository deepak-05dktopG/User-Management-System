import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import EditUser from './pages/EditUser';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
