// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const [currentQuestion, setCurrentQuestion] = useState(0);
// const [showScore, setShowScore] = useState(false);
// const [score, setScore] = useState(0);
// function Quiz() {
//   const location = useLocation();
//   const name = location.state.name; // Access the name prop from the location
//   console.log(QuizData.length);
//   const handleAnswerButtonClick = (isCorrect) => {
//     if (isCorrect === true) {
//       setScore(score + 1);
// }
// const nextQuetions = currentQuestion + 1;
    
// if (nextQuetions < questions.length) {
//   setCurrentQuestion(nextQuetions);
// }
// else {
//   setShowScore(true)
// }
// }
//   return (


    
    
//     <>
//   {showScore ? (
//     <div className="score-section">
//       You scored {score} out of {questions.length}
//     </div>
//   ) : (
//     <div className="question-section">
//       <div className="question-count">
//         <span>Question {currentQuestion + 1}</span>
//         / {questions.length} {/* Corrected the syntax */}
//       </div>
//       <div className="question-level">
//         {questions[currentQuestion].question}
//       </div>
//     </div>
    
//     )}

   
//   </>
//   )
// }
// export default Quiz;

import React, { useState, useEffect, useRef } from 'react';
import QuizData from '../QuizData.json'; // Import your JSON file
import { useLocation } from "react-router-dom";
function shuffleArray(array) {
  // Use the Fisher-Yates shuffle algorithm to shuffle the array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15); // Initial time in seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const timerRef = useRef(null); // Ref to store the timer interval
  const location = useLocation();
  const name = location.state.name;
  useEffect(() => {
    // Shuffle the quiz data only once when the component mounts
    const shuffledQuizData = shuffleArray(QuizData);
    setRemainingTime(15); // Reset the timer when a new question is loaded
    setSelectedAnswer(null); // Clear selected answer for the new question

    // Clear the previous timer interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new timer interval
    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          // Auto-submit the question if the timer runs out
          handleAnswerButtonClick(false); // Pass false to indicate an incorrect answer
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [currentQuestion]);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < QuizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-2xl font-semibold mb-4'>Hi! {name}, Let's Play Quiz</h1>
        {showScore ? (
          <div className='score-section'>
            <p className='text-xl font-semibold mb-4'>
              You scored {score} out of {QuizData.length}
            </p>
            <p className='text-gray-700'>Thanks for playing!</p>
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <p className='text-sm font-semibold mb-2'>
                  Question {currentQuestion + 1} / {QuizData.length}
                </p>
              </div>
              <div className='question-card'>
                <p className='text-lg font-medium'>{QuizData[currentQuestion].question}</p>
              </div>
            </div>

            <div className='answer-section'>
              {QuizData[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-2 rounded-md cursor-pointer ${
                    selectedAnswer === option ? 'bg-blue-500' : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='answerOptions'
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                  />
                  <span className='ml-2'>{option}</span>
                </label>
              ))}
            </div>
            <div className='timer-section'>
              <p className='text-sm text-gray-600 mt-2'>
                Time Remaining: {remainingTime} seconds
              </p>
            </div>
            <button
              onClick={() => handleAnswerButtonClick(selectedAnswer === QuizData[currentQuestion].answer)}
              className={`mt-4 p-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-700 ${
                selectedAnswer === null ? 'cursor-not-allowed' : ''
              }`}
              disabled={selectedAnswer === null}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;




