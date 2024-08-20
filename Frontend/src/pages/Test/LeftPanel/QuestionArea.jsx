import { Button } from "@/components/ui/button";

const QuestionArea = ({
    questions,
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

  export default QuestionArea;