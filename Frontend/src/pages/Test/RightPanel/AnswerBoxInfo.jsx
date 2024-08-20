const AnswerBoxInfo = ({ counts }) => {
  return (
    <div className="">
      <div className="flex flex-wrap">
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-green-500 rounded-lg flex justify-center items-center text-white">
            {counts.answered}
          </div>
          <span className="ml-2 text-sm">Answered</span>
        </div>
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-red-500 rounded-lg flex justify-center items-center text-white">
            {counts.unanswered}
          </div>
          <span className="ml-2 text-sm">Unanswered</span>
        </div>
        <div className="p-2 w-1/2 flex items-center">
          <div className="size-10 bg-sky-700 rounded-lg flex justify-center items-center text-white">
            {counts.markedForReview}
          </div>
          <span className="ml-2 text-sm">Marked for Review</span>
        </div>
        <div className="p-2 w-1/2 flex items-center">
          <div className="relative size-10 bg-sky-700 text-white rounded-lg flex justify-center items-center">
            {counts.answeredAndMarkedForReview}
            <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          <span className="ml-2 text-sm">
            Answered & <br /> Marked for Review
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnswerBoxInfo;
