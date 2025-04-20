import { faBook, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const BasicDataInputPage = () => {
  const durationOptions = [
    "select duration",
    "15",
    "30",
    "45",
    "60",
    "90",
    "120",
    "180",
  ];
  const [quizDetails, setQuizDetails] = useState({
    duration: 0,
    hasNegativeMarking: false,
    questionCount: 0,
    subject: "",
    title: "",
  });

  const handleQuizDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;

    setQuizDetails((prev) => {
      const newDetails = { ...prev };

      if (type === "text") {
        newDetails[name] = value;
      } else if (type === "checkbox") {
        newDetails[name] = checked;
      } else if (type === "number" || type === "select-one") {
        const n = parseInt(value, 10);
        newDetails[name] = isNaN(n) ? 0 : n;
      }

      return newDetails;
    });
  };

  const handleQuizDetailsSave = () => {
    localStorage.removeItem("QBDets");
    const encodedData = btoa(JSON.stringify(quizDetails));
    localStorage.setItem("QBDets", encodedData);
    window.location.href = `${window.location.pathname}?section=qsi`;
  };

  return (
    <div className="flex-1 ml-0 md:ml-8 transition-all duration-300 dark:text-white text-gray-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-2xl shadow-xl p-6 sm:p-8 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faBook} className="mr-4 text-indigo-500" />
          Set Basic Quiz Details
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Quiz Title*
            </label>
            <input
              type="text"
              name="title"
              value={quizDetails.title}
              onChange={handleQuizDetailsChange}
              className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Subject*
              </label>
              <input
                type="text"
                name="subject"
                value={quizDetails.subject}
                onChange={handleQuizDetailsChange}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                placeholder="Enter subject"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Number of Questions*
              </label>
              <input
                type="number"
                step="1"
                name="questionCount"
                value={quizDetails.questionCount}
                onChange={handleQuizDetailsChange}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                placeholder="Enter number of questions"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Quiz Duration*
              </label>
              <select
                name="duration"
                value={quizDetails.duration}
                onChange={handleQuizDetailsChange}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                required
              >
                {durationOptions.map((minutes, index) => {
                  if (index === 0) {
                    return (
                      <option key={minutes} value={minutes}>
                        {minutes}
                      </option>
                    );
                  } else {
                    return (
                      <option key={minutes} value={minutes}>
                        {minutes} minutes
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Quiz Rules
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="negativeMarking"
                name="hasNegativeMarking"
                checked={quizDetails.hasNegativeMarking}
                onChange={handleQuizDetailsChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded hover:cursor-pointer"
              />
              <label
                htmlFor="negativeMarking"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Enable Negative Marking
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleQuizDetailsSave}
              disabled={
                !quizDetails.title ||
                !quizDetails.subject ||
                quizDetails.questionCount === 0 ||
                quizDetails.duration === 0
              }
              className={`px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 hover:cursor-pointer ${
                !quizDetails.title ||
                !quizDetails.subject ||
                quizDetails.questionCount === 0 ||
                quizDetails.duration === 0
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Save & Next
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDataInputPage;
