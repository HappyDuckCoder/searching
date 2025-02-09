import React from "react";
import SimilarQuestion from "./SimilarQuestion";

const Question = ({ query }: { query: string }) => {
  return (
    <>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          <p className="text-left text-sm font-medium break-words whitespace-normal">
            {query}
          </p>
        </div>
        <div className="collapse-content">
          <SimilarQuestion query={query} />
        </div>
      </div>
    </>
  );
};

export default Question;
