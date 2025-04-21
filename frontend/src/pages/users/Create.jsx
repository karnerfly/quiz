import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlus,
  faTrash,
  faSave,
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faCheckCircle,
  faFileCsv,
  faFileExport,
  faEye,
  faClone,
  faListUl,
  faSearch,
  faRandom,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import React, { useState, useRef, useEffect } from "react";

const CreateQuizPage = () => {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("QSection") || "details"
  );

  const [questions, setQuestions] = useState([
    {
      text: "",
      options: [],
      correctAnswer: -1,
      isOpen: true,
      explanation: "",
      points: 1,
    },
  ]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [importMode, setImportMode] = useState(false);
  const [importData, setImportData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const questionContentRef = useRef(null);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const editQuizId = urlParams.get("edit");

  //   if (editQuizId) {
  //     loadQuizForEditing(editQuizId);
  //   }
  // }, []);

  // const loadQuizForEditing = (quizId) => {
  //   console.log(`Loading quiz with ID: ${quizId}`);

  //   setQuizDetails({
  //     title: "Sample Math Quiz",
  //     subject: "Mathematics",
  //     questionCount: "5",
  //     duration: "45",
  //     hasNegativeMarks: true,
  //   });

  //   setQuestions([
  //     {
  //       id: 1,
  //       text: "What is 2 + 2?",
  //       options: [
  //         { id: 1, text: "3" },
  //         { id: 2, text: "4" },
  //         { id: 3, text: "5" },
  //         { id: 4, text: "6" },
  //       ],
  //       correctAnswer: "B",
  //       isOpen: true,
  //       explanation: "Basic addition problem",
  //       points: 1,
  //     },
  //     {
  //       id: 2,
  //       text: "What is the square root of 16?",
  //       options: [
  //         { id: 1, text: "2" },
  //         { id: 2, text: "4" },
  //         { id: 3, text: "8" },
  //         { id: 4, text: "16" },
  //       ],
  //       correctAnswer: "B",
  //       isOpen: false,
  //       explanation: "Square root calculation",
  //       points: 1,
  //     },
  //   ]);
  // };

  const loadSavedQuestions = () => {
    const questions = localStorage.getItem("QQs");
    if (!questions) return [];
    const decodedQuestions = atob(questions);
    const parseData = JSON.parse(decodedQuestions);

    return parseData;
  };

  const addQuestion = () => {
    const savedQuestons = loadSavedQuestions();
    if (!Array.isArray(savedQuestons)) return;

    const problemInput = document.getElementById("questionProblem");
    const optionsInput = document.getElementsByClassName("questionOptions");
    const correctAnsInput = document.getElementById("questionCorrectAnswer");

    const options = Array.from(optionsInput).map((item) => item.value);

    console.log(problemInput.value);
    console.log(options);
    console.log(correctAnsInput.value);
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = questions.find((q) => q.id === questionId);
    if (!questionToDuplicate) return;

    const newQuestion = {
      ...JSON.parse(JSON.stringify(questionToDuplicate)),
      id: Math.max(...questions.map((q) => q.id)) + 1,
      isOpen: true,
    };

    const updatedQuestions = questions.map((q) => ({ ...q, isOpen: false }));

    setQuestions([...updatedQuestions, newQuestion]);
    setActiveQuestionIndex(questions.length);

    setTimeout(() => {
      questionContentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);

      if (activeQuestionIndex >= updatedQuestions.length) {
        setActiveQuestionIndex(updatedQuestions.length - 1);
      }
    }
  };

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: q.options.length + 1, text: "" }],
            }
          : q
      )
    );
  };

  const removeOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId),
              correctAnswer:
                q.correctAnswer === String.fromCharCode(64 + optionId)
                  ? ""
                  : q.correctAnswer,
            }
          : q
      )
    );
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text: value } : o
              ),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionId, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, correctAnswer: value } : q
      )
    );
  };

  const toggleQuestion = (index) => {
    if (previewMode) return;

    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === index ? { ...q, isOpen: !q.isOpen } : { ...q, isOpen: false }
      )
    );
    setActiveQuestionIndex(index);
  };

  // const handleImportQuestions = () => {
  //   try {
  //     const importedQuestions = JSON.parse(importData);
  //     if (Array.isArray(importedQuestions)) {
  //       const processedQuestions = importedQuestions.map((q, index) => ({
  //         ...q,
  //         id: questions.length + index + 1,
  //         isOpen: index === 0,
  //       }));

  //       setQuestions((prev) => {
  //         const updatedQuestions = prev.map((q) => ({ ...q, isOpen: false }));
  //         return [...updatedQuestions, ...processedQuestions];
  //       });

  //       setImportMode(false);
  //       setImportData("");
  //     }
  //   } catch (error) {
  //     alert("Invalid JSON format. Please check your data.");
  //   }
  // };

  // const exportQuestions = () => {
  //   const exportData = questions.map((q) => {
  //     const { isOpen, ...exportQuestion } = q;
  //     return exportQuestion;
  //   });

  //   const dataStr = JSON.stringify(exportData, null, 2);
  //   const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
  //     dataStr
  //   )}`;

  //   const exportFileName = `${quizDetails.title || "quiz"}_questions.json`;

  //   const linkElement = document.createElement("a");
  //   linkElement.setAttribute("href", dataUri);
  //   linkElement.setAttribute("download", exportFileName);
  //   linkElement.click();
  // };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     try {
  //       const parsedData = JSON.parse(event.target.result);
  //       if (Array.isArray(parsedData)) {
  //         setImportData(event.target.result);
  //       } else {
  //         alert("The file does not contain a valid array of questions.");
  //       }
  //     } catch (error) {
  //       alert("Could not parse the file as JSON.");
  //     }
  //   };
  //   reader.readAsText(file);
  // };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(
      shuffled.map((q, idx) => ({ ...q, isOpen: idx === activeQuestionIndex }))
    );
  };

  const isQuestionComplete = (question) => {
    return (
      question.text &&
      question.options.length >= 2 &&
      question.options.every((o) => o.text) &&
      question.correctAnswer
    );
  };

  const allQuestionsComplete = () => {
    return questions.every(isQuestionComplete);
  };

  const filterQuestions = () => {
    if (!searchQuery) return questions;

    return questions.filter(
      (q) =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options.some((opt) =>
          opt.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  const filteredQuestions = filterQuestions();

  const generateShareLink = () => {
    return `https://quiz-app.com/quiz/${quizDetails.title
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFinalSave = () => {
    if (allQuestionsComplete()) {
      setShowSharePopup(true);
    }
  };

  const copyShareLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <main className="flex-1 ml-0 md:ml-8 transition-all duration-300 dark:text-white text-gray-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
        <div
          className={`absolute top-1/2 left-0 h-1 ${
            activeSection === "questions" ? "w-full" : "w-1/2"
          } bg-indigo-600 transition-all duration-300 -z-10`}
        ></div>

        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeSection === "details" ? "text-indigo-600" : "text-gray-500"
          }`}
          onClick={() => setActiveSection("details")}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeSection === "details"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Basic Details</span>
        </div>

        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeSection === "questions" ? "text-indigo-600" : "text-gray-500"
          }`}
          onClick={() => quizDetails.title && setActiveSection("questions")}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeSection === "questions"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Add Questions</span>
        </div>
      </div>

      {/* Section B: Add Questions */}
      {activeSection === "questions" && (
        <div className="rounded-2xl shadow-xl p-6 sm:p-8 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          {/* Question management header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-4 text-indigo-500" />
              {previewMode ? "Preview Quiz" : "Add Questions"}
            </h2>

            <div className="flex flex-wrap gap-3">
              {!previewMode && (
                <>
                  <button
                    onClick={addQuestion}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center text-sm font-medium transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Question
                  </button>

                  <button
                    onClick={() => setShowBulkOperations(!showBulkOperations)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center text-sm font-medium transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faListUl} className="mr-2" />
                    Bulk Actions
                  </button>
                </>
              )}

              <button
                onClick={togglePreviewMode}
                className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 ${
                  previewMode
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                {previewMode ? "Exit Preview" : "Preview Quiz"}
              </button>
            </div>
          </div>

          {/* Question Navigation */}
          {!previewMode && (
            <div className="flex items-center justify-start mb-6 overflow-x-auto py-3 hide-scrollbar">
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => toggleQuestion(index)}
                    className={`px-4 py-2 rounded-lg min-w-max text-sm flex items-center cursor-pointer transition-colors duration-200 ${
                      question.isOpen
                        ? "bg-indigo-600 text-white"
                        : isQuestionComplete(question)
                        ? "bg-green-600 text-white dark:bg-green-700"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {index + 1}
                    {isQuestionComplete(question) && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="ml-2 text-xs"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Content */}
          <div className="space-y-8 mb-8" ref={questionContentRef}>
            {previewMode ? (
              // Scrollable container for preview mode
              <div className="max-h-[60vh] sm:max-h-[50vh] overflow-y-auto border dark:border-gray-700 rounded-lg shadow-inner bg-white dark:bg-gray-800 p-4">
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

                      {/* {question.explanation && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mt-3">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                            Explanation:
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-200">
                            {question.explanation}
                          </p>
                        </div>
                      )} */}

                      {/* <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Points: {question.points}
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show only the active question in edit mode
              filteredQuestions[activeQuestionIndex] && (
                <div
                  key={filteredQuestions[activeQuestionIndex].id}
                  className="border dark:border-gray-700 rounded-lg dark:bg-gray-700 bg-gray-50 shadow-sm"
                >
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          isQuestionComplete(
                            filteredQuestions[activeQuestionIndex]
                          )
                            ? "bg-green-600 text-white dark:bg-green-700"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                        }`}
                      >
                        {activeQuestionIndex + 1}
                      </span>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {filteredQuestions[activeQuestionIndex].text
                          ? filteredQuestions[
                              activeQuestionIndex
                            ].text.substring(0, 30) +
                            (filteredQuestions[activeQuestionIndex].text
                              .length > 30
                              ? "..."
                              : "")
                          : `Question ${activeQuestionIndex + 1}`}
                      </h3>
                      {isQuestionComplete(
                        filteredQuestions[activeQuestionIndex]
                      ) && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="ml-2 text-green-500"
                        />
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateQuestion(
                            filteredQuestions[activeQuestionIndex].id
                          );
                        }}
                        className="text-blue-500 hover:text-blue-700 p-1 mr-2"
                        title="Duplicate Question"
                      >
                        <FontAwesomeIcon icon={faClone} />
                      </button>
                      {questions.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(
                              filteredQuestions[activeQuestionIndex].id
                            );
                          }}
                          className="text-red-500 hover:text-red-700 p-1 mr-2"
                          title="Delete Question"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                      <FontAwesomeIcon
                        icon={
                          filteredQuestions[activeQuestionIndex].isOpen
                            ? faChevronUp
                            : faChevronDown
                        }
                        className="text-gray-500"
                      />
                    </div>
                  </div>

                  {filteredQuestions[activeQuestionIndex].isOpen && (
                    
                  )}
                </div>
              )
            )}

            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-gray-500 border dark:border-gray-700 rounded-lg shadow-sm">
                {searchQuery ? (
                  <>
                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                      No questions match your search.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm font-medium"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    No questions added yet. Click "Add Question" to get started.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
            <button
              onClick={() => setActiveSection("details")}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              Back
            </button>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={addQuestion}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center text-sm font-medium transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save and Add Next Question
              </button>
              <Link
                to=""
                onClick={(e) => {
                  if (!allQuestionsComplete()) {
                    e.preventDefault();
                  } else {
                    handleFinalSave();
                  }
                }}
                className={`px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 ${
                  !allQuestionsComplete()
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Final Save Quiz
              </Link>
            </div>
          </div>

          {/* Enhanced Share Popup */}
          {showSharePopup && (
           
          )}

          {/* Quiz Summary */}
          <div className="mt-8 p-6 dark:bg-gray-700 bg-gray-50 rounded-lg border dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
              Quiz Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p>
                  <strong>Title:</strong> {quizDetails.title}
                </p>
                <p>
                  <strong>Subject:</strong> {quizDetails.subject}
                </p>
              </div>
              <div>
                <p>
                  <strong>Questions:</strong> {questions.length} /{" "}
                  {quizDetails.questionCount}
                </p>
                <p>
                  <strong>Duration:</strong> {quizDetails.duration} minutes
                </p>
              </div>
              <div className="sm:col-span-2">
                <p>
                  <strong>Completion:</strong>{" "}
                  {questions.filter(isQuestionComplete).length} of{" "}
                  {questions.length} questions complete
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (questions.filter(isQuestionComplete).length /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CreateQuizPage;
