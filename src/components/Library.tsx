import React from 'react';
import { Book, Brain, Heart } from 'lucide-react';

function Library() {
  const resources = [
    {
      id: 1,
      title: 'Mental Health Basics',
      description: 'Learn about the fundamentals of mental health and well-being.',
      icon: <Brain className="w-6 h-6" />,
      categories: ['Mental Health', 'Wellness']
    },
    {
      id: 2,
      title: 'Emotional Intelligence',
      description: 'Develop your emotional awareness and understanding.',
      icon: <Heart className="w-6 h-6" />,
      categories: ['Emotional Health', 'Personal Growth']
    },
    {
      id: 3,
      title: 'Study Techniques',
      description: 'Effective methods for better learning and retention.',
      icon: <Book className="w-6 h-6" />,
      categories: ['Education', 'Skills']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Learning Library</h1>
        
        <div className="grid gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {resource.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;