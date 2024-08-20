import { useState } from 'react';

const MCQCard = ({ question, options, onSelectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    onSelectAnswer(answer);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="flex flex-col space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-3 rounded-lg ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleSelectAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MCQCard;
