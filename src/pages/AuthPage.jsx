import { useState } from 'react';
import Splash from './Splash';

export default function AuthPage() {

  const [currentView, setCurrentView] = useState('splash');

  const handleViewChange = (viewName) => {
    setCurrentView(viewName);
  };

  return (
    <div className="min-h-screen bg-[#000022] text-white">
      
      {currentView === 'splash' && (
        <Splash onAction={() => handleViewChange('login')} />
      )}

      {currentView === 'login' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold mb-6 text-gray-300">Log In</h2>
          <p className="mb-4">Login form under construction...</p>
          
          <button 
            onClick={() => handleViewChange('register')}
            className="mt-4 text-orange-400 hover:text-orange-300 underline cursor-pointer"
          >
            Join the adventure? Register here
          </button>
        </div>
      )}

      {currentView === 'register' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold mb-6 text-gray-300">Choose Character</h2>
          <p className="mb-4">Register form under construction...</p>
          
          <button 
            onClick={() => handleViewChange('login')}
            className="mt-4 text-orange-400 hover:text-orange-300 underline cursor-pointer"
          >
            Back to Log In
          </button>
        </div>
      )}

    </div>
  );
}