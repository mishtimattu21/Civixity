import React, { useState } from 'react';
import { X } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm Eddie. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log("User input:", input);
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    setTimeout(() => {
      console.log("Bot response triggered");
      setMessages(prev => [...prev, {
        text: "I'm here to help! What would you like to learn about?",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-xl w-80 h-104 flex flex-col">
          <div className="p-4 bg-yellow-900 text-white rounded-t-xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Eddie</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-yellow-900 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-transparent text-white p-4 rounded-full shadow-lg hover:bg-yellow-700"
        >
          <img 
            src="src\components\logo.jpg"
            alt="Chatbot Icon" 
            className="w-[50px] h-[50px] object-cover" 
          />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
