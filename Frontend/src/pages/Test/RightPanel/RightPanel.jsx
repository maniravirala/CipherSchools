import React, { useState, useEffect } from "react";
import OptionsBox from "./OptionsBox";
import Camera from "./Camera";
import AnswerBoxInfo from "./AnswerBoxInfo";

const RightPanel = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  markedForReview,
}) => {
  // Group questions by section
  const sections = questions.reduce((acc, question, index) => {
    if (!acc[question.section]) {
      acc[question.section] = [];
    }
    acc[question.section].push({ ...question, index });
    return acc;
  }, {});

  // State to track the expanded section
  const [expandedSection, setExpandedSection] = useState(null);

  // Automatically expand the section of the current question
  useEffect(() => {
    const currentSection = questions[currentQuestionIndex].section;
    setExpandedSection(currentSection);
  }, [currentQuestionIndex]);

  // Handle section click
  const handleSectionClick = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  // Calculate counts for answered, unanswered, marked for review, and answered & marked for review
  const counts = questions.reduce(
    (acc, question) => {
      const answered = !!answers[question.id];
      const isMarked = markedForReview[question.id];

      if (answered && isMarked) {
        acc.answeredAndMarkedForReview += 1;
      } else if (answered) {
        acc.answered += 1;
      } else if (isMarked) {
        acc.markedForReview += 1;
      } else {
        acc.unanswered += 1;
      }
      return acc;
    },
    { answered: 0, unanswered: 0, markedForReview: 0, answeredAndMarkedForReview: 0 }
  );

  return (
    <div className="p-4 rounded-md bg-gray-100 h-full">
      <AnswerBoxInfo counts={counts} />
      <OptionsBox
        sections={sections}
        expandedSection={expandedSection}
        handleSectionClick={handleSectionClick}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        answers={answers}
        markedForReview={markedForReview}
        currentQuestionIndex={currentQuestionIndex}
      />
      <Camera />
    </div>
  );
};

export default RightPanel;
