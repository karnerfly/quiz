import React, { useEffect, useState } from "react";
import {
  faEye,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import SharePopup from "@src/components/dashboard/SharePopup";
import { createQuiz } from "@src/api";

const QuestionInputPage = () => {
  const [basicDetails, setBasicDetails] = useState({
    title: "",
    subject: "",
    duration: 0,
    questionCount: 0,
  });
  const [questions, setQuestions] = useState([
    { problem: "", options: [""], correct_answer: -1 },
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const currentQuestion = questions[activeQuestionIndex] || {
    problem: "",
    options: [""],
    correct_answer: -1,
  };

  const navigate = useNavigate();

  // fetch and decode the quiz basic details
  useEffect(() => {
    const fetchQuizBasicDetails = () => {
      const encodedQuizDets = localStorage.getItem("QBDets");

      try {
        return JSON.parse(atob(encodedQuizDets));
      } catch (e) {
        return navigate("?section=dts", { replace: true, relative: true });
      }
    };

    setBasicDetails(fetchQuizBasicDetails());
  }, []);

  // fetch and decode the saved questions
  useEffect(() => {
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
    setQuestions(fetchInitialQuestions());
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    const encodedQuestions = btoa(JSON.stringify(questions));
    localStorage.setItem("Qlist", encodedQuestions);
  }, [questions]);

  const isQuestionComplete = (question) => {
    return (
      question?.problem?.trim() &&
      question?.options?.length >= 2 &&
      question.options.every((opt) => opt?.trim()) &&
      question.correct_answer >= 0
    );
  };

  const handleFinalSave = async () => {
    const completedQuestions = questions.filter(isQuestionComplete);

    if (completedQuestions.length !== basicDetails.questionCount) {
      alert(
        `You need exactly ${basicDetails.questionCount} complete questions. Currently you have ${completedQuestions.length}.`
      );
      return;
    }

    try {
      const resp = await createQuiz({
        title: basicDetails.title,
        subject: basicDetails.subject,
        no_of_questions: basicDetails.questionCount,
        duration: basicDetails.duration,
        questions: questions,
      });

      if (resp.data) {
        localStorage.removeItem("Qlist");
        localStorage.removeItem("QBDets");
        setShareCode(resp.data);
        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurrentQuestion = (updates) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[activeQuestionIndex] = {
        ...currentQuestion,
        ...updates,
      };
      return newQuestions;
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    updateCurrentQuestion({ options: newOptions });
  };

  const addOption = () => {
    updateCurrentQuestion({ options: [...currentQuestion.options, ""] });
  };

  const removeOption = (index) => {
    const newOptions = [...currentQuestion.options];
    newOptions.splice(index, 1);

    const newCorrectAnswer =
      currentQuestion.correct_answer === index
        ? -1
        : currentQuestion.correct_answer > index
        ? currentQuestion.correct_answer - 1
        : currentQuestion.correct_answer;

    updateCurrentQuestion({
      options: newOptions,
      correct_answer: newCorrectAnswer,
    });
  };

  const saveQuestion = () => {
    if (!isQuestionComplete(currentQuestion)) {
      alert(
        "Please complete all required fields (question text, at least 2 options, and correct answer)"
      );
      return;
    }

    // If we're at the end, add a new question
    if (activeQuestionIndex === questions.length - 1) {
      setQuestions((prev) => [
        ...prev,
        { problem: "", options: [""], correct_answer: -1 },
      ]);
    }

    // Move to next question
    setActiveQuestionIndex((prev) =>
      Math.min(prev + 1, basicDetails.questionCount - 1)
    );
  };

  const deleteQuestion = (index) => {
    if (questions.length <= 1) return;

    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.splice(index, 1);
      return newQuestions;
    });

    // Adjust active index if needed
    if (index === activeQuestionIndex) {
      setActiveQuestionIndex(Math.max(0, index - 1));
    } else if (index < activeQuestionIndex) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const navigateToQuestion = (index) => {
    setActiveQuestionIndex(index);
  };

  if (showPopup) {
    return (
      <SharePopup
        title={basicDetails.title}
        duration={basicDetails.duration}
        totalQuestions={basicDetails.questionCount}
        link={`${window.location.origin}/quizreal?code=${shareCode}`}
        onClose={() => setShowPopup(false)}
      />
    );
  }

  return (
    <div className="flex-1 ml-0 md:ml-8 transition-all duration-300 dark:text-white text-gray-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-2xl shadow-xl p-6 sm:p-8 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        {/* Question management header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-4 text-indigo-500" />
            Add Questions ({questions.filter(isQuestionComplete).length}/
            {basicDetails.questionCount})
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                navigate("?section=dts", { relative: true, replace: true })
              }
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              Back to Details
            </button>
            <button
              onClick={() =>
                navigate("?section=prvw", { relative: true, replace: true })
              }
              className="px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              Preview Quiz
            </button>
          </div>
        </div>

        {/* Improved Question Navigation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar px-4 py-2">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center shrink-0">
                <button
                  onClick={() => navigateToQuestion(index)}
                  className={`px-4 py-2 rounded-lg min-w-max text-sm flex items-center cursor-pointer transition-colors duration-200 relative
                    ${
                      index === activeQuestionIndex
                        ? "ring-2 ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white scale-110"
                        : isQuestionComplete(question)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                    }`}
                >
                  {index + 1}
                </button>
                {questions.length > 1 && (
                  <button
                    onClick={() => deleteQuestion(index)}
                    className="ml-1 text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </button>
                )}
              </div>
            ))}

            {/* {activeQuestionIndex < basicDetails.questionCount - 1 && (
              <button
                onClick={() => {
                  setQuestions((prev) => [
                    ...prev,
                    { problem: "", options: [""], correct_answer: -1 },
                  ]);
                  setActiveQuestionIndex(questions.length);
                }}
                className={`px-4 py-3 rounded-lg min-w-max text-sm flex items-center cursor-pointer transition-colors duration-200 relative
                  ${
                    activeQuestionIndex === questions.length
                      ? "ring-2 ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white scale-110"
                      : "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-200"
                  }`}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )} */}
          </div>
        </div>

        {/* Question Content */}
        <div className="space-y-8 mb-8">
          <div className="p-4 border-t dark:border-gray-700">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Question Text*
              </label>
              <textarea
                name="problem"
                value={currentQuestion.problem || ""}
                onChange={(e) =>
                  updateCurrentQuestion({ problem: e.target.value })
                }
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                placeholder="Enter question text"
                rows={3}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Options* (Minimum 2 required)
              </label>
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full shrink-0 ${
                        currentQuestion.correct_answer === index
                          ? "bg-green-500 text-white"
                          : "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={option || ""}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        className="w-full p-3 pr-10 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white "
                        placeholder={`Option ${String.fromCharCode(
                          65 + index
                        )}`}
                        required
                      />
                      {currentQuestion.options.length > 2 && (
                        <button
                          onClick={() => removeOption(index)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                        >
                          <FontAwesomeIcon icon={faTrash} size="xs" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm flex items-center mt-2 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Option
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Correct Answer*
                </label>
                <select
                  name="correct_answer"
                  value={currentQuestion.correct_answer ?? -1}
                  onChange={(e) =>
                    updateCurrentQuestion({
                      correct_answer: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  required
                  disabled={currentQuestion.options.length === 0}
                >
                  <option value={-1}>Select correct answer</option>
                  {currentQuestion.options.map((option, index) => (
                    <option key={index} value={index} disabled={!option.trim()}>
                      {String.fromCharCode(65 + index)}: {option || "[Empty]"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
          <div></div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {activeQuestionIndex < basicDetails.questionCount - 1 && (
              <button
                onClick={saveQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 cursor-pointer hover:bg-blue-700"
                disabled={!isQuestionComplete(currentQuestion)}
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {activeQuestionIndex < basicDetails.questionCount - 1
                  ? "Save & Next"
                  : "Save Question"}
              </button>
            )}
            <button
              onClick={handleFinalSave}
              className={`px-6 py-3 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                questions.filter(isQuestionComplete).length !==
                basicDetails.questionCount
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  : "bg-green-600 hover:bg-green-700 text-white"
              } ${
                questions.filter(isQuestionComplete).length !==
                basicDetails.questionCount
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={
                questions.filter(isQuestionComplete).length !==
                basicDetails.questionCount
              }
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Final Save Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionInputPage;
