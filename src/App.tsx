import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Chatbot from './components/Chatbot';
import Contacts from './components/Contacts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/library" element={<Library />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      {showChatbot && <Chatbot />}
    </div>
  );
}

const LandingPage = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:'/components/CIVIXITY[1].png',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-white opacity-10"></div>

      <div className="relative flex justify-between px-6 py-16 mx-auto max-w-[1800px]">
        {/* Left Sticky Box */}
        <div className="w-[350px]">
          <div 
            className="fixed w-[350px] p-9 rounded-3xl shadow-md"
            style={{
              backgroundColor: 'beige',
              height: '620px',
              borderRadius: '20px',
            }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Left Sticky Box
            </h1>
            <p className="text-lg text-black-600 mb-8">
              This box will stay in place while scrolling.
            </p>
          </div>
        </div>

        {/* Middle Scrollable Content */}
        <div className="flex flex-col gap-4 mx-6">
          {[1, 2, 3].map((box) => (
            <div
              key={box}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-3xl shadow-md"
              style={{
                backgroundColor: 'beige',
                width: '700px',
                height: '200px',
              }}
            >
              <h2 className="text-xl font-bold">Box {box}</h2>
              <p>Description for Box {box}</p>
            </div>
          ))}
        </div>

        {/* Right Sticky Box */}
        <div className="w-[350px]">
          <div 
            className="fixed w-[350px] p-9 rounded-3xl shadow-md mr-3"
            style={{
              backgroundColor: 'beige',
              height: '630px',
              borderRadius: '20px',
            }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Right Sticky Box
            </h1>
            <p className="text-lg text-black-600 mb-8">
              This box will also stay in place while scrolling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
