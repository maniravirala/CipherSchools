import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
  },
  // Add more questions here...
];

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionSelect = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleSubmitTest = () => {
    // Submit the answers to the backend
    fetch('/api/submit-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })
    .then(response => response.json())
    .then(data => {
      // Notify that the test has been submitted
      window.opener.postMessage({ type: 'TEST_SUBMITTED' }, '*');
      window.close();
    })
    .catch(error => {
      toast.error('Failed to submit test. Please try again.');
      window.opener.postMessage({ type: 'TEST_SUBMITTED' }, '*');
      window.close();

      console.error("Error submitting test:", error);
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">MCQ Test</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Question and Options */}
        <div className="w-full md:w-2/3">
          <div className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl">
              Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
            </h2>
            <div className="mt-4 space-y-2">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`q${questions[currentQuestionIndex].id}_option${index}`}
                    name={`q${questions[currentQuestionIndex].id}`}
                    value={option}
                    checked={answers[questions[currentQuestionIndex].id] === option}
                    onChange={() =>
                      handleOptionSelect(questions[currentQuestionIndex].id, option)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`q${questions[currentQuestionIndex].id}_option${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>

          {/* Submit Test Button */}
          <div className="mt-4">
            <Button onClick={handleSubmitTest} variant="primary" className="w-full">
              Submit Test
            </Button>
          </div>
        </div>

        {/* Camera Feed */}
        <div className="w-full md:w-1/3">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            className="rounded-lg border-2 border-gray-300"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
