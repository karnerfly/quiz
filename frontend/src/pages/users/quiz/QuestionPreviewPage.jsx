import React from "react";

export const QuestionPreviewPage = () => {
  return (
    <div>
      {/* Scrollable container for preview mode */}
      {/* <div className="max-h-[60vh] sm:max-h-[50vh] overflow-y-auto border dark:border-gray-700 rounded-lg shadow-inner bg-white dark:bg-gray-800 p-4">
        <p>preview mode enabled</p>
        {filteredQuestions.map((question, qIndex) => (
          <div
            key={question.id}
            className="border dark:border-gray-700 rounded-lg dark:bg-gray-800 bg-white mb-4 last:mb-0"
          >
            <div className="p-4 border-t dark:border-gray-700">
              <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                {qIndex + 1}. {question.text}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {question.options.map((option, oIndex) => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border ${
                      question.correctAnswer ===
                      String.fromCharCode(65 + oIndex)
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + oIndex)}.
                    </span>
                    {option.text}
                    {question.correctAnswer ===
                      String.fromCharCode(65 + oIndex) && (
                      <span className="ml-2 text-green-600 dark:text-green-400">
                        (Correct)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
