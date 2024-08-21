import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";
import Header from "./Header";
import QuestionAreaHeader from "./LeftPanel/QuestionAreaHeader";
import QuestionArea from "./LeftPanel/QuestionArea";
import RightPanel from "./RightPanel/RightPanel";
import { useParams } from "react-router-dom";
import { startTest, submitTest } from "@/services/testServices";
import { deductDurationFromStartTime } from "@/lib/utils";
import Restriction from "@/components/Restriction";

// const questions = [
//   {
//     id: 23,
//     section: "Quant",
//     question: "What is the full form of MERN?",
//     options: [
//       "MongoDB, Express, React, Node.js",
//       "MySQL, Express, React, Node.js",
//       "MongoDB, Ember, React, Node.js",
//       "MongoDB, Express, Ruby, Node.js",
//     ],
//   },
//   {
//     id: 2,
//     section: "Quant",
//     question: "Which of the following is a NoSQL database?",
//     options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
//   },
//   {
//     id: 3,
//     section: "Verbal",
//     question: "Which of the following is a JavaScript framework?",
//     options: ["React", "Angular", "Vue", "All of the above"],
//   },
//   {
//     id: 4,
//     section: "Verbal",
//     question: "Which of the following is a backend framework?",
//     options: ["Express", "React", "Angular", "Vue"],
//   },
//   // Add more questions as needed
// ];

const Test = () => {
  const { id } = useParams();
  // State stored in localStorage
  const [testState, setTestState] = useLocalStorage(id, {
    answers: {},
    markedForReview: {},
  });

  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(0);
  const [headerData, setHeaderData] = useState({});


  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await startTest(id);
        setQuestions(response.test.questions);
        setDuration(deductDurationFromStartTime(response.test.startedAt, response.test.duration));
        setHeaderData({testName: response.test.title});
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message || error);
        window.opener.postMessage({ type: "TEST_SUBMISSION_FAILED", message: error.message || error }, "*");
        window.close();
        localStorage.removeItem(id); // Clear storage on error
      }
    };
    fetchTest();
  }, [id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Extract answers and markedForReview from testState
  const { answers, markedForReview } = testState;

  const handleOptionSelect = (questionId, option) => {
    setTestState((prevState) => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [questionId]: option,
      },
    }));
  };

  const toggleMarkForReview = (questionId) => {
    setTestState((prevState) => ({
      ...prevState,
      markedForReview: {
        ...prevState.markedForReview,
        [questionId]: !prevState.markedForReview[questionId],
      },
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

  const handleSubmitTest = async () => {
    const answers = Object.keys(testState.answers).map((questionId) => ({
      questionId,
      answer: testState.answers[questionId],
      markedForReview: testState.markedForReview[questionId],
    }));

    try {
      const response = await submitTest(id, answers);
      window.opener.postMessage({ type: "TEST_SUBMITTED" }, "*");
      window.close();
      localStorage.removeItem(id); // Clear storage after submission
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || error);
    }
  }


  const handleClearAnswer = () => {
    setTestState((prevState) => {
      const { [questions[currentQuestionIndex].id]: _, ...rest } = prevState.answers;
      return {
        ...prevState,
        answers: rest,
      };
    });
  }
  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Restriction />
      <Header data={headerData} handleSubmitTest={handleSubmitTest} duration={duration} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-2/3 flex flex-col">
            <QuestionAreaHeader
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              handleClearAnswer={handleClearAnswer}
              answers={answers}
            />
            <QuestionArea
              questions={questions}
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
