import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";

const questions = [
  // Example Questions for MERN Stack Test
  {
    id: 1,
    question: "What is the full form of MERN?",
    options: [
      "MongoDB, Express, React, Node.js",
      "MySQL, Express, React, Node.js",
      "MongoDB, Ember, React, Node.js",
      "MongoDB, Express, Ruby, Node.js",
    ],
  },
  {
    id: 2,
    question: "Which of the following is a NoSQL database?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
  },
  {
    id: 3,
    question: "Which of the following is a JavaScript framework?",
    options: ["React", "Angular", "Vue", "All of the above"],
  },
  {
    id: 4,
    question: "Which of the following is a backend framework?",
    options: ["Express", "React", "Angular", "Vue"],
  },
  {
    id: 5,
    question: "Which of the following is a frontend framework?",
    options: ["React", "Express", "Angular", "Vue"],
  },
  {
    id: 6,
    question: "Which of the following is a CSS framework?",
    options: [
      "Tailwind CSS",
      "Materialize CSS",
      "Bootstrap",
      "All of the above",
    ],
  },
  {
    id: 7,
    question: "What is the full form of CSS?",
    options: [
      "Cascading Style Sheets",
      "Cascading Script Sheets",
      "Cascading Style Scripts",
      "None of the above",
    ],
  },
  {
    id: 8,
    question: "What is the full form of HTML?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Markup Level",
      "Hyper Text Markup Layout",
      "None of the above",
    ],
  },
  {
    id: 9,
    question: "What is the full form of HTTP?",
    options: [
      "Hyper Text Transfer Protocol",
      "Hyper Text Transfer Page",
      "Hyper Text Transfer Package",
      "None of the above",
    ],
  },
  {
    id: 10,
    question: "What is the full form of API?",
    options: [
      "Application Programming Interface",
      "Application Program Interface",
      "Application Programming Interface",
      "None of the above",
    ],
  },
];

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage("answers", {});
  const [markedForReview, setMarkedForReview] = useState({});

  const handleOptionSelect = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
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
    fetch("/api/submit-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    })
      .then((response) => response.json())
      .then((data) => {
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
    <div className="h-screen flex flex-col">
      <Header data={{ name, testName }} handleSubmitTest={handleSubmitTest} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-2/3 flex flex-col">
            <QuestionAreaHeader
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
            />
            <QuestionArea
              question={questions[currentQuestionIndex]}
              onOptionSelect={handleOptionSelect}
              answers={answers}
              currentQuestionIndex={currentQuestionIndex}
              prevQuestion={prevQuestion}
              nextQuestion={nextQuestion}
              toggleMarkForReview={toggleMarkForReview}
              markedForReview={markedForReview[currentQuestionIndex + 1]}
            />
          </div>
          <div className="md:w-1/3 overflow-y-auto">
            <RightPanel
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              answers={answers}
              markedForReview={markedForReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

const Header = ({ data, handleSubmitTest }) => {
  return (
    <header className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-sky-600 to-indigo-800 shadow-sm">
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

const QuestionAreaHeader = ({ currentQuestionIndex, questions }) => {
  return (
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
  );
};

const QuestionArea = ({
  question,
  onOptionSelect,
  answers,
  currentQuestionIndex,
  prevQuestion,
  nextQuestion,
  toggleMarkForReview,
  markedForReview,
}) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {/* Scrollable Question Area */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-xl">{question.question}</h2>
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
        {/* Example of Extra Content */}
        {Array.from({ length: 0 }).map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-200 w-1/2 mt-2"
          >{`Extra Content ${index}`}</div>
        ))}
      </div>

      {/* Fixed Button Area */}
      <div className="flex justify-between p-4 sticky bottom-0">
        <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={() => toggleMarkForReview(question.id)}>
          {markedForReview ? "Unmark" : "Mark for Review"}
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

const AnswerBox = () => {
  return (
    <div className="">
      <div className="flex flex-wrap">
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-green-500 rounded-lg" />
          <span className="ml-2">Answered</span>
        </div>
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-red-500 rounded-lg" />
          <span className="ml-2">Unanswered</span>
        </div>
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-sky-700 rounded-lg" />
          <span className="ml-2">Marked for Review</span>
        </div>
        <div className="p-2 w-1/2 flex items-center whitespace-break-spaces">
          <div className="size-10 bg-sky-700 text-white rounded-lg" />
          <span className="ml-2 text-wrap">Answered & Marked for Review</span>
        </div>
      </div>
    </div>
  );
};

const RightPanel = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  markedForReview,
}) => {
  return (
    <div className="p-4 rounded-md bg-gray-100 h-full">
      <AnswerBox />
      <h2 className="text-xl mb-4">Question Navigation</h2>
      {/* <div className="grid grid-cols-8 gap-2"> */}
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const questionId = question.id;
          const answered = !!answers[questionId];
          const isMarked = markedForReview[questionId];
          const baseClass =
            "p-2 text-center rounded-lg cursor-pointer flex items-center justify-center size-10";
          const bgClass = answered
            ? isMarked
              ? "bg-sky-700 text-white relative"
              : "bg-green-500 text-white"
            : isMarked
            ? "bg-sky-700 text-white"
            : "bg-red-500 text-white";
          return (
            <div
              key={question.id}
              className={`${baseClass} ${bgClass}`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
              {answered && isMarked && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          className="rounded-lg border-2 border-gray-300"
          videoConstraints={{
            height: 200,
            facingMode: "user",
          }}
        />
      </div>
    </div>
  );
};
