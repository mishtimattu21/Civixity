import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

function Navbar({ isAuthenticated, setIsAuthenticated }: NavbarProps) {
  return (
    <nav className="bg-[#331800] text-white shadow-md sticky top-0 z-50 opacity-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-9" style={{ marginRight: '30px' }}>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="https://img.freepik.com/free-vector/cute-panda-reading-book-cartoon-icon-illustration_138676-2683.jpg?t=st=1736486588~exp=1736490188~hmac=18cf9d754f3e014d5e7d63c9a8cfd4a8784c0d563e4f219682a018750a8e54b6&w=5000&fit=crop" 
                alt="PandaLearn Logo" 
                className="scale-150"
              />
            </div>
            <div className="flex items-center space-x-30" style={{ marginLeft: '30px' }}>
              <NavLink to="/about" text="CIVIXITY" />
            </div>
          </Link>
          
          <div className="flex items-center space-x-9">
            <NavLink to="/about" text="About Your Municipality" />
            <NavLink to="/library" text="Library" />
            <NavLink to="/feedback" text="Feedback" />
            <NavLink to="/contacts" text="Important Contacts" />
            <NavLink to="/login" text="Login" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, text }: { to: string; text: string }) {
  return (
    <Link 
      to={to} 
      className="text-white hover:text-gray-200 transition-colors font-medium"
    >
      {text}
    </Link>
  );
}

export default Navbar;

