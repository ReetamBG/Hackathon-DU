import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Scoreboard = () => {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // Submit feedback logic here (e.g., send to backend)
    console.log('Feedback submitted:', feedback);
    navigate('/dashboard');
  };

  return (
    <div className="text-white mx-auto mt-5">
      <h2>Your Score: {/* Display score here */}</h2>
      <h3>Feedback:</h3>
      <textarea value={feedback} onChange={handleFeedbackChange} rows="4" cols="50" />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default Scoreboard;
