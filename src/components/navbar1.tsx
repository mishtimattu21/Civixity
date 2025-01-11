import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Brain, Home, GamepadIcon, User } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

function Navbar({ isAuthenticated, setIsAuthenticated }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=96&h=96&fit=crop" 
              alt="PandaLearn Logo" 
              className="w-12 h-12 rounded-full"
            />
            <span className="text-2xl font-bold text-gray-800">PandaLearn</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" icon={<Home />} text="Dashboard" />
                <NavLink to="/games" icon={<GamepadIcon />} text="Games" />
                <NavLink to="/library" icon={<Book />} text="Library" />
                <NavLink to="/learn" icon={<Brain />} text="Learn" />
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <User className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link to={to} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;
