import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";

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
  const [answers, setAnswers] = useLocalStorage("answers", {});

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
    fetch("/api/submit-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Notify that the test has been submitted
        window.opener.postMessage({ type: "TEST_SUBMITTED" }, "*");
        window.close();
        localStorage.removeItem("answers");
      })
      .catch((error) => {
        toast.error("Failed to submit test. Please try again.");
        console.error("Error submitting test:", error);
      });
  };

  const name = "John Doe";
  const testName = "Cipher Schools Aptitude Test - 2025";

  return (
    <div className="h-screen">
      <Header data={{ name, testName }} handleSubmitTest={handleSubmitTest} />
      <div className="rounded-md">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="size-full md:w-2/3 overflow-y-auto ">
            <div className="flex py-3 px-2">
              <div className="flex gap-4 items-center">
                <span className="text-lg ">Question</span>
                <span className="text-lg p-1 bg-blue-600 text-white rounded-lg py-1 px-4">
                  {currentQuestionIndex + 1}
                  <span className="mx-2">/</span>
                  {questions.length}
                </span>
              </div>
              <div className="flex gap-4 items-center ml-auto">
                Marking Scheme
                <div className="size-10 rounded-lg bg-gray-200 flex justify-center items-center">
                  +1
                </div>
                <div className="size-10 rounded-lg bg-gray-200 flex justify-center items-center">
                  0
                </div>
              </div>
            </div>
            <QuestionArea
              question={questions[currentQuestionIndex]}
              onOptionSelect={handleOptionSelect}
              answers={answers}
              currentQuestionIndex={currentQuestionIndex}
              prevQuestion={prevQuestion}
              nextQuestion={nextQuestion}
            />
          </div>
          <div className="size-full md:w-1/3">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

const Header = ({ data, handleSubmitTest }) => {
  return (
    <header className="px-2 py-2 flex justify-between items-center text-white bg-gradient-to-r from-sky-600 to-indigo-800 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="size-10 rounded-full bg-gray-200 flex justify-center items-center text-gray-500 text-xl font-bold">
          {data.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
        <span className="font-semibold text-lg">{data.name}</span>
      </div>
      <div className="">
        <span className="font-semibold text-lg">{data.testName}</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-sm">Time Remaining</span>
          <span className="mt-1 px-6 py-1 rounded-lg font-semibold text-lg bg-gray-200 bg-opacity-20">
            30:00
          </span>
        </div>
        <Button
          variant="secondary"
          onClick={handleSubmitTest}
          className="font-medium text-xl"
        >
          Submit
        </Button>
      </div>
    </header>
  );
};

const QuestionArea = ({
  question,
  onOptionSelect,
  answers,
  currentQuestionIndex,
  prevQuestion,
  nextQuestion,
}) => {
  return (
    <div className="bg-yellow-50 flex flex-col justify-between overflow-y-auto">
      <div className="p-4 rounded-md bg-pink-100">
        <h2 className="text-xl">
          {questions[currentQuestionIndex].question}
        </h2>
        <div className="mt-4 space-y-2">
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`q${question.id}_option${index}`}
                name={`q${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => onOptionSelect(question.id, option)}
                className="mr-2"
              />
              <label htmlFor={`q${question.id}_option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        {/* array of 100 lines to test sscroll */}
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} className="h-1 bg-gray-200 my-2"></div>
        ))}
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
    </div>
  );
};

const RightPanel = () => {
  return (
    <div>
      <div className="p-4 rounded-md">
        <h2 className="text-xl">Instructions</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Read the questions carefully before answering.</li>
          <li>Select the correct answer from the given options.</li>
          <li>Click on the "Next" button to move to the next question.</li>
          <li>
            Click on the "Previous" button to go back to the previous question.
          </li>
          <li>Click on the "Submit" button to submit the test.</li>
        </ul>
      </div>
      <div className="mt-4">
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
  );
};
