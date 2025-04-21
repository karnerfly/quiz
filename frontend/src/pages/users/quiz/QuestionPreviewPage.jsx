import React, { useState } from "react";
import { useNavigate } from "react-router";

const QuestionPreviewPage = () => {
  const fetchInitialQuestions = () => {
    const savedQuestions = localStorage.getItem("Qlist");
    if (savedQuestions) {
      try {
        return JSON.parse(atob(savedQuestions));
      } catch (e) {
        return [{ problem: "", options: [""], correct_answer: -1 }];
      }
    }
    return [{ problem: "", options: [""], correct_answer: -1 }];
  };

  const [questions, setQuestions] = useState(fetchInitialQuestions());
  const navigate = useNavigate();

  return (
    <div className="w-full p-4">
      {/* Scrollable container for preview mode */}
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-bold">Preview Mode</h2>
        <button
          onClick={() =>
            navigate("?section=qsi", { relative: true, replace: true })
          }
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer"
        >
          Back to Editing
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto border dark:border-gray-700 rounded-lg shadow-inner bg-white dark:bg-gray-800 px-2 py-4 mt-4 sm:p-4">
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="border dark:border-gray-700 rounded-lg dark:bg-gray-800 bg-white mb-4 last:mb-0"
          >
            <div className="p-4 border-t dark:border-gray-700">
              <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                {qIndex + 1}. {question.problem}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`p-3 rounded-lg border ${
                      question.correct_answer === oIndex
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + oIndex)}.
                    </span>
                    {option}
                    {question.correct_answer === oIndex && (
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
      </div>
    </div>
  );
};

export default QuestionPreviewPage;
