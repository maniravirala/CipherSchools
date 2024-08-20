import { ChevronDown } from "lucide-react";

const OptionsBox = ({ sections, expandedSection, handleSectionClick, setCurrentQuestionIndex, answers, markedForReview, currentQuestionIndex }) => {
  return (
    <div className="space-y-4 mt-4">
        {Object.keys(sections).map((section) => (
          <div key={section} className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer bg-slate-300 py-2 px-4 rounded-lg"
              onClick={() => handleSectionClick(section)}
            >
              <h3 className="text-lg font-semibold">{section}</h3>
              <ChevronDown
                size={24}
                className={`transform transition-transform ${
                  expandedSection === section ? "rotate-180" : ""
                }`}
              />
            </div>
            {expandedSection === section && (
              <div className="flex flex-wrap gap-2">
                {sections[section].map(({ id, index }) => {
                  const answered = !!answers[id];
                  const isMarked = markedForReview[id];
                  const baseClass =
                    "p-2 text-center rounded-lg cursor-pointer flex items-center justify-center size-10";
                  const bgClass = answered
                    ? isMarked
                      ? "bg-sky-700 text-white relative"
                      : "bg-green-500 text-white"
                    : isMarked
                    ? "bg-sky-700 text-white"
                    : "bg-red-500 text-white";
                    const currentQuestionClass = index === currentQuestionIndex ? "ring-2 ring-blue-700 ring-offset-2" : "";
                  return (
                    <div
                      key={id}
                      className={`${baseClass} ${bgClass} ${currentQuestionClass}`}
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
            )}
          </div>
        ))}
      </div>
  );
};

export default OptionsBox;
