import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LearningModule from './pages/LearningModule';
import Quiz from './pages/Quiz';
import Trivia from './pages/Trivia';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Badges from './pages/Badges';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  
  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (!auth?.currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Public Route wrapper component
const PublicRoute = ({ children }) => {
  const auth = useAuth();

  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (auth?.currentUser) {
    return <Navigate to="/home" />;
  }

  return children;
};

// App Layout component
const AppLayout = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {auth?.currentUser && <Navbar />}
      <Routes>
        {/* Root route - redirects to home or login based on auth status */}
        <Route 
          path="/" 
          element={auth?.currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />

        {/* Auth routes - accessible only when logged out */}
        <Route 
          path="/login" 
          element={<PublicRoute><Login /></PublicRoute>} 
        />
        <Route 
          path="/register" 
          element={<PublicRoute><Register /></PublicRoute>} 
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/home"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/learn"
          element={<ProtectedRoute><LearningModule /></ProtectedRoute>}
        />
        <Route
          path="/quiz"
          element={<ProtectedRoute><Quiz /></ProtectedRoute>}
        />
        <Route
          path="/trivia"
          element={<ProtectedRoute><Trivia /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoute><Leaderboard /></ProtectedRoute>}
        />
        <Route
          path="/badges"
          element={<ProtectedRoute><Badges /></ProtectedRoute>}
        />

        {/* Catch all - redirect to home or login */}
        <Route 
          path="*" 
          element={auth?.currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <AppLayout />
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App; 