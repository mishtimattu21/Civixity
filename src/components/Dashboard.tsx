import React from 'react';
import { Trophy, Book, Brain, MessageCircle, Star } from 'lucide-react';

function Dashboard() {
  const milestones = [
    { id: 1, title: 'Complete First Math Game', completed: true },
    { id: 2, title: 'Practice English Vocabulary', completed: true },
    { id: 3, title: 'Use TalkSmart AI', completed: false },
    { id: 4, title: 'Complete Homework Assistant', completed: false },
  ];

  const features = [
    {
      id: 1,
      title: 'Math Games',
      icon: <Brain className="w-6 h-6" />,
      games: ['Addition Adventure', 'Multiplication Master', 'Division Quest']
    },
    {
      id: 2,
      title: 'English Learning',
      icon: <Book className="w-6 h-6" />,
      games: ['Vocabulary Builder', 'Grammar Galaxy', 'Reading Rapids']
    },
    {
      id: 3,
      title: 'Homework Helper',
      icon: <MessageCircle className="w-6 h-6" />,
      games: ['Math Solver', 'Essay Assistant', 'Research Helper']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
          <nav className="space-y-2">
            {features.map((feature) => (
              <div key={feature.id} className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600">
                  {feature.icon}
                  <span>{feature.title}</span>
                </button>
                <div className="ml-8 space-y-1">
                  {feature.games.map((game) => (
                    <button 
                      key={game} 
                      className="w-full text-left px-4 py-1.5 text-sm text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50"
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome back, Learner! 🐼
            </h1>
            <p className="text-gray-600">
              Ready to continue your learning journey? Here's what you can do today:
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Milestones</h2>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {milestone.completed && <Star className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`${milestone.completed ? 'text-gray-800' : 'text-gray-600'}`}>
                      {milestone.title}
                    </span>
                  </div>
                  {!milestone.completed && (
                    <button className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;