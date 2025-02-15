import React from "react";
import SimilarQuestion from "./SimilarQuestion";

const Question = ({ query }: { query: string }) => {
  return (
    <div className="w-full p-4 bg-slate-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-2">Question:</h2>
      <div className="collapse collapse-arrow">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-xl font-semibold text-white peer-checked:text-blue-400 transition-all">
          <p className="text-left text-sm font-medium text-gray-300 break-words whitespace-normal">
            {query}
          </p>
        </div>
        <div className="collapse-content text-white">
          <SimilarQuestion query={query} />
        </div>
      </div>
    </div>
  );
};

export default Question;
