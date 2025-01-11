import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import image from './mascot.png'

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[url('https://www.shutterstock.com/image-illustration/old-nautical-treasure-map-background-600nw-317285174.jpg')]">
      <div className="absolute inset-0 bg-white opacity-20"></div>
      
      <div className="w-full max-w-5xl h-[600px] flex justify-end">
        {/* Right side - Login Form */}
        <div className="w-[400px] bg-white/95 p-4 rounded-3xl shadow-xl relative top-8 ml-10" style={{ position: 'absolute', right: 200, top: 120, backgroundColor: '#FEF9E7'}}>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif mb-2">Log In</h2>
            <p className="text-gray-600">Become a part of our community!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="rounded border-gray-300 text-[#8B5E3C] focus:ring-[#8B5E3C]"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg font-semibold hover:bg-[#7A4E2C] transition-colors"
            >
              LOGIN
            </button>

            <div className="text-center text-gray-600">
              <a href="#" className="hover:text-[#8B5E3C]">
                Forgot you password? Get help
              </a>
            </div>

            <div className="flex items-center justify-between text-gray-600 pt-4">
              <span>Not a member?</span>
              <Link 
                to="/register" 
                className="text-[#8B5E3C] font-semibold hover:text-[#7A4E2C]"
              >
                SIGN UP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;