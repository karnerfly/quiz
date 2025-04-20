import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

/**
 * @param {{title:string, link:string, totalQuestions:number, duration:number, copyShareLink:Function}} param0
 */
const SharePopup = ({
  title,
  link,
  totalQuestions,
  duration,
  copyShareLink,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Quiz Saved Successfully!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
          Thank you for using our platform to create your quiz!
        </p>
        <div className="mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            <strong>Title:</strong> {title}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            <strong>Total Questions:</strong> {totalQuestions}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            <strong>Duration:</strong> {duration} minutes
          </p>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 text-center">
            Share this link with your students to take the quiz:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 p-3 border dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm text-gray-900 dark:text-white"
            />
            <button
              onClick={copyShareLink}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center text-sm font-medium transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/dashboard/quizzes"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors duration-200"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
