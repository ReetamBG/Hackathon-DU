import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve score, userAnswers, and questions from location state
  const { score, userAnswers, questions } = location.state || { score: 0, userAnswers: {}, questions: [] };

  return (
    <div className="text-center text-white mt-4">
      <h2 className="text-3xl mb-4">Test Completed!</h2>
      <p className="text-2xl mb-6">Your score is: {score}</p>

      <table className="mx-auto text-white w-full max-w-3xl border border-gray-500 mt-6">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-500">Question</th>
            <th className="p-2 border border-gray-500">Your Answer</th>
            <th className="p-2 border border-gray-500">Result</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[`question-${index}`];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <tr key={index} className={isCorrect ? "bg-green-500" : "bg-red-500"}>
                <td className="p-2 border border-gray-500">{question.question}</td>
                <td className="p-2 border border-gray-500">{userAnswer || "No Answer"}</td>
                <td className="p-2 border border-gray-500">{isCorrect ? "Correct" : "Wrong"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
