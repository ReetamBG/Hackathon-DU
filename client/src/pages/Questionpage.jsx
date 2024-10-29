import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Questionpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve test response from the location state
  const { testResponse } = location.state || { testResponse: null };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // Check if testResponse is valid
  if (!testResponse || !testResponse.questions || testResponse.questions.length === 0) {
    return (
      <div className="text-white text-center mt-2">
        <h2>No questions available.</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const questions = testResponse.questions;

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    let calculatedScore = 0;
  
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[`question-${index}`];
      if (userAnswer === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
  
    setScore(calculatedScore);
    console.log('User Answers:', userAnswers);
    console.log('Score:', calculatedScore);
  
    navigate("/scoreboard", { state: { score: calculatedScore } });
  };
  

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="text-white text-center mx-auto mt-2">
      <h2 className="text-3xl mb-4">{currentQuestion.question}</h2>
      <div className="flex flex-col gap-4 text-xl">
        {Object.entries(currentQuestion.options).map(([key, option]) => (
          <label key={key} className="flex gap-2">
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value={option}
              checked={userAnswers[`question-${currentQuestionIndex}`] === option}
              onChange={handleOptionChange}
              className="text-black"
            />
            {option}
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
          Next
        </button>
      </div>
      <button onClick={handleSubmitTest} className="mt-6 bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
        Submit Test
      </button>
      {score !== null && (
        <div className=" text-2xl flex flex-col gap-5 mt-7">
          <p>The Total Number of Questions available are : <b>{questions.length}</b></p>
          <p className='text-4xl'>Good Luck!!</p>
        </div>
      )}
        <button className="mt-6 bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
          Take Your Test with AI
        </button>

    </div>
  );
};

export default Questionpage;
