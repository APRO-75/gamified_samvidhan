import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path) => {
    return `transition-all duration-200 px-3 py-2 rounded-md ${
      isActive(path)
        ? 'bg-indigo-700 text-white font-medium shadow-sm'
        : 'hover:text-indigo-200'
    }`;
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="text-xl font-bold">
            Gamified Samvidhan
          </Link>

          <div className="flex space-x-2">
            <Link to="/home" className={getLinkStyle('/home')}>
              Home
            </Link>
            <Link to="/learn" className={getLinkStyle('/learn')}>
              Learn
            </Link>
            <Link to="/quiz" className={getLinkStyle('/quiz')}>
              Quiz
            </Link>
            <Link to="/trivia" className={getLinkStyle('/trivia')}>
              Trivia
            </Link>
            <Link to="/badges" className={getLinkStyle('/badges')}>
              Badges
            </Link>
            <Link to="/leaderboard" className={getLinkStyle('/leaderboard')}>
              Leaderboard
            </Link>

            {currentUser ? (
              <>
                <Link to="/profile" className={getLinkStyle('/profile')}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-indigo-200 px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={getLinkStyle('/login')}>
                  Login
                </Link>
                <Link to="/register" className={getLinkStyle('/register')}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 