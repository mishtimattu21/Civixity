import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Coins } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userCoins?: number;
}

interface NavLinkProps {
  to: string;
  text: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

function Navbar({ isAuthenticated, setIsAuthenticated, userCoins = 0 }: NavbarProps) {
  const handleLeaderboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('src/code/leaderboard.html', '_blank', 'noopener,noreferrer');
  };

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('src/code/feedback.html', '_blank', 'noopener,noreferrer');
  };

  const handleMunicipalityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('src/code/muncipality.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-[#331800] text-white shadow-md sticky top-0 z-50 opacity-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-9" style={{ marginRight: '30px' }}>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="src/components/logo.jpg" 
                alt="CivixityLogo" 
                className="scale-150"
              />
            </div>
            <div className="flex items-center space-x-30" style={{ marginLeft: '30px' }}>
              <NavLink to="/about" text="CIVIXITY" />
            </div>
          </Link>
          
          <div className="flex items-center space-x-9">
            <NavLink 
              to="#" 
              text="About Your Municipality" 
              external={true} 
              onClick={handleMunicipalityClick}
            />
            <NavLink 
              to="#" 
              text="Feedback" 
              external={true} 
              onClick={handleFeedbackClick}
            />
            <NavLink to="/contacts" text="Important Contacts" />
            <button
              onClick={handleLeaderboardClick}
              className="flex items-center space-x-2 hover:text-gray-200 transition-colors font-medium"
              aria-label="View Leaderboard"
            >
              <Coins size={20} />
              <span>{userCoins}</span>
            </button>
            <NavLink to="/login" text="Login" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, text, external, onClick }: NavLinkProps) {
  if (external) {
    return (
      <a 
        href={to}
        onClick={onClick}
        className="text-white hover:text-gray-200 transition-colors font-medium"
      >
        {text}
      </a>
    );
  }

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