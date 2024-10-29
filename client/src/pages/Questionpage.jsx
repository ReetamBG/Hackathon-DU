import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questionpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve test response from the location state
  const { testResponse } = location.state || { testResponse: null };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState("");  // State to store the hint response from the backend

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
      setHint("");  // Clear hint when moving to the next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setHint("");  // Clear hint when moving to the previous question
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
  
    // Pass score, userAnswers, and questions to the scoreboard
    navigate("/scoreboard", { state: { score: calculatedScore, userAnswers, questions } });
  };
  

  const currentQuestion = questions[currentQuestionIndex];

  // Handler function to fetch hint from the backend
  const hinthandler = async () => {
    try {
      console.log(currentQuestion.question)
      const response = await axios.post('http://127.0.0.1:5000/api/getHint', {
        questionText: currentQuestion.question,  // Only sending the question text
        
      });
      console.log(response.data)
      setHint(response.data?.hint);  // Display hint from the backend response
    } catch (error) {
      console.error("Error fetching hint:", error);
    }
  };
  //this
  async function handleAiFeature() {
    try {
      console.log("sending data to reetam for ai", questions);

      const response = await axios.post('http://127.0.0.1:5000/api/getAiTest', {
          questions,  // Only sending the question text
      });
      const filteredResponse = response.data;

      console.log(response.data);
      navigate("/questionpage",{ state: { testResponse: filteredResponse } })
    } catch (error) {
      console.log("Error in getting response for ai:", error);
    }
  };

  //ths

  return (
    <div className="text-white text-center mx-auto mt-2 w-[500px]">
      <div className="text-2xl flex flex-col gap-5 mt-7 mb-10">
          <p>The Total Number of Questions: <b>{questions.length}</b></p>
        </div>
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
        <button onClick={hinthandler} className="bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
        Get Hint
      </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
          Next
        </button>
      </div>
      <button onClick={handleSubmitTest} className="mt-6 bg-yellow-50 text-richblack-900 rounded-[8px] px-4 py-2">
        Submit Test
      </button>
      <div className='flex flex-col'>
      {hint && (
        <div className="mt-6 text-xl text-white">
          <p><strong>Hint:</strong> {hint}</p>
        </div>
      )}

      
      <button onClick={handleAiFeature} className="mt-6 bg-blue-200 text-richblack-900 rounded-[8px] px-4 py-2 ">
              Create New Test with AI
       </button>
      </div>
    </div>
  );
};

export default Questionpage;
