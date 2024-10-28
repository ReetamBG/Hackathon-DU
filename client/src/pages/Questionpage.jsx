import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('questions'));
    if (savedQuestions) {
      setQuestions(savedQuestions);
    }

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerChange = (event) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: event.target.value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Logic for handling the test submission
    navigate('/scoreboard');
  };

  return (
    <div className="text-white mx-auto mt-5">
      <h2>Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</h2>
      {questions.length > 0 && (
        <div className="question-card">
          <h3>{questions[currentQuestionIndex].questionText}</h3>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={userAnswers[currentQuestionIndex] === option}
                onChange={handleAnswerChange}
              />
              {option}
            </label>
          ))}
          <div>
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          </div>
        </div>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleSubmit}>Submit Paper</button>
      )}
    </div>
  );
};

export default QuestionPage;
