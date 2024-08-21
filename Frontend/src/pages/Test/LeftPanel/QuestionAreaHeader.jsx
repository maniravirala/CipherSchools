const QuestionAreaHeader = ({ currentQuestionIndex, questions, handleClearAnswer, answers }) => {
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
      {/* Clearing answer */}
      {answers[questions[currentQuestionIndex].id] && (
        <div className="flex gap-4 items-center ml-auto">
          <button className="text-blue-600 hover:underline" onClick={handleClearAnswer}>
            Clear Response
          </button>
        </div>
      )}
      <div className="flex gap-4 items-center ml-auto">
        Marking Scheme
        <div className="size-10 rounded-lg bg-gray-200 flex justify-center items-center">
          +{questions[currentQuestionIndex].marks || 1}
        </div>
        <div className="size-10 rounded-lg bg-gray-200 flex justify-center items-center">
          0
        </div>
      </div>
    </div>
  );
};

export default QuestionAreaHeader;
