import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, GraduationCap, Users } from 'lucide-react';

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    role: '',
    interests: [],
    diagnosis: false
  });

  const roles = [
    { id: 'student', title: 'Student', icon: <GraduationCap className="w-8 h-8" /> },
    { id: 'teacher', title: 'Teacher', icon: <Brain className="w-8 h-8" /> },
    { id: 'parent', title: 'Parent', icon: <Users className="w-8 h-8" /> }
  ];

  const interests = [
    'Math', 'English', 'Science', 'History', 
    'Art', 'Music', 'Programming', 'Languages'
  ];

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">What's your role?</h2>
                <div className="grid grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setUserData({ ...userData, role: role.id });
                        setStep(2);
                      }}
                      className={`p-6 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-colors ${
                        userData.role === role.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {role.icon}
                        <span className="font-medium">{role.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">What interests you?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => {
                        const newInterests = userData.interests.includes(interest)
                          ? userData.interests.filter((i) => i !== interest)
                          : [...userData.interests, interest];
                        setUserData({ ...userData, interests: newInterests });
                      }}
                      className={`p-4 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-colors ${
                        userData.interests.includes(interest)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Would you like a learning diagnosis?</h2>
                <p className="text-gray-600">
                  This will help us personalize your learning experience and identify areas where you might need extra support.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setUserData({ ...userData, diagnosis: true });
                      handleComplete();
                    }}
                    className="p-6 rounded-xl border-2 border-green-500 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    Yes, please
                  </button>
                  <button
                    onClick={() => {
                      setUserData({ ...userData, diagnosis: false });
                      handleComplete();
                    }}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;