import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve score from location state
  const { score } = location.state || { score: 0 };

  return (
    <div className="text-center text-white mt-4 text-5xl">
      <h2 className="text-3xl mb-4">Test Completed!</h2>
      <p className="text-2xl">Your score is: {score}</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Scoreboard;
