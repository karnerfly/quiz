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
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";


const CreateQuizPage = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    subject: "",
    questionCount: "",
    duration: "30",
    hasNegativeMarks: false
  });


  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: [{ id: 1, text: "" }],
      correctAnswer: "",
      isOpen: true,
      explanation: "",
      points: 1
    }
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


  const durationOptions = ["15", "30", "45", "60", "90", "120"];


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editQuizId = urlParams.get('edit');
   
    if (editQuizId) {
      loadQuizForEditing(editQuizId);
    }
  }, []);


  const loadQuizForEditing = (quizId) => {
    console.log(`Loading quiz with ID: ${quizId}`);
   
    setQuizDetails({
      title: "Sample Math Quiz",
      subject: "Mathematics",
      questionCount: "5",
      duration: "45",
      hasNegativeMarks: true
    });
   
    setQuestions([
      {
        id: 1,
        text: "What is 2 + 2?",
        options: [
          { id: 1, text: "3" },
          { id: 2, text: "4" },
          { id: 3, text: "5" },
          { id: 4, text: "6" }
        ],
        correctAnswer: "B",
        isOpen: true,
        explanation: "Basic addition problem",
        points: 1
      },
      {
        id: 2,
        text: "What is the square root of 16?",
        options: [
          { id: 1, text: "2" },
          { id: 2, text: "4" },
          { id: 3, text: "8" },
          { id: 4, text: "16" }
        ],
        correctAnswer: "B",
        isOpen: false,
        explanation: "Square root calculation",
        points: 1
      }
    ]);
  };


  const handleQuizDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizDetails(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      options: [{ id: 1, text: "" }],
      correctAnswer: "",
      isOpen: true,
      explanation: "",
      points: 1
    };
   
    const updatedQuestions = questions.map(q => ({...q, isOpen: false}));
   
    setQuestions([...updatedQuestions, newQuestion]);
    setActiveQuestionIndex(questions.length);
   
    setTimeout(() => {
      questionContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  const saveAndAddNextQuestion = () => {
    addQuestion();
  };


  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return;
   
    const newQuestion = {
      ...JSON.parse(JSON.stringify(questionToDuplicate)),
      id: Math.max(...questions.map(q => q.id)) + 1,
      isOpen: true
    };
   
    const updatedQuestions = questions.map(q => ({...q, isOpen: false}));
   
    setQuestions([...updatedQuestions, newQuestion]);
    setActiveQuestionIndex(questions.length);
   
    setTimeout(() => {
      questionContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  const removeQuestion = (id) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter(q => q.id !== id);
      setQuestions(updatedQuestions);
     
      if (activeQuestionIndex >= updatedQuestions.length) {
        setActiveQuestionIndex(updatedQuestions.length - 1);
      }
    }
  };


  const addOption = (questionId) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? {
            ...q,
            options: [...q.options, { id: q.options.length + 1, text: "" }]
          }
        : q
    ));
  };


  const removeOption = (questionId, optionId) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? {
            ...q,
            options: q.options.filter(o => o.id !== optionId),
            correctAnswer: q.correctAnswer === String.fromCharCode(64 + optionId) ? "" : q.correctAnswer
          }
        : q
    ));
  };


  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };


  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? {
            ...q,
            options: q.options.map(o =>
              o.id === optionId ? { ...o, text: value } : o
            )
          }
        : q
    ));
  };


  const handleCorrectAnswerChange = (questionId, value) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, correctAnswer: value } : q
    ));
  };


  const toggleQuestion = (index) => {
    if (previewMode) return;
   
    setQuestions(prev => prev.map((q, idx) =>
      idx === index
        ? { ...q, isOpen: !q.isOpen }
        : { ...q, isOpen: false }
    ));
    setActiveQuestionIndex(index);
  };


  const handleImportQuestions = () => {
    try {
      const importedQuestions = JSON.parse(importData);
      if (Array.isArray(importedQuestions)) {
        const processedQuestions = importedQuestions.map((q, index) => ({
          ...q,
          id: questions.length + index + 1,
          isOpen: index === 0
        }));
       
        setQuestions(prev => {
          const updatedQuestions = prev.map(q => ({...q, isOpen: false}));
          return [...updatedQuestions, ...processedQuestions];
        });
       
        setImportMode(false);
        setImportData("");
      }
    } catch (error) {
      alert("Invalid JSON format. Please check your data.");
    }
  };


  const exportQuestions = () => {
    const exportData = questions.map(q => {
      const { isOpen, ...exportQuestion } = q;
      return exportQuestion;
    });
   
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
   
    const exportFileName = `${quizDetails.title || 'quiz'}_questions.json`;
   
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
   
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (Array.isArray(parsedData)) {
          setImportData(event.target.result);
        } else {
          alert("The file does not contain a valid array of questions.");
        }
      } catch (error) {
        alert("Could not parse the file as JSON.");
      }
    };
    reader.readAsText(file);
  };


  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };


  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.map((q, idx) => ({...q, isOpen: idx === activeQuestionIndex})));
  };


  const isQuestionComplete = (question) => {
    return question.text &&
           question.options.length >= 2 &&
           question.options.every(o => o.text) &&
           question.correctAnswer;
  };


  const allQuestionsComplete = () => {
    return questions.every(isQuestionComplete);
  };


  const filterQuestions = () => {
    if (!searchQuery) return questions;
   
    return questions.filter(q =>
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some(opt => opt.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };


  const filteredQuestions = filterQuestions();


  const generateShareLink = () => {
    return `https://quiz-app.com/quiz/${quizDetails.title.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
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
          className={`absolute top-1/2 left-0 h-1 ${activeSection === "questions" ? "w-full" : "w-1/2"} bg-indigo-600 transition-all duration-300 -z-10`}
        ></div>
       
        <div
          className={`flex flex-col items-center cursor-pointer ${activeSection === "details" ? "text-indigo-600" : "text-gray-500"}`}
          onClick={() => setActiveSection("details")}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeSection === "details" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
            1
          </div>
          <span className="text-sm font-medium">Basic Details</span>
        </div>
       
        <div
          className={`flex flex-col items-center cursor-pointer ${activeSection === "questions" ? "text-indigo-600" : "text-gray-500"}`}
          onClick={() => quizDetails.title && setActiveSection("questions")}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeSection === "questions" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
            2
          </div>
          <span className="text-sm font-medium">Add Questions</span>
        </div>
      </div>


      {/* Section A: Basic Quiz Details */}
      {activeSection === "details" && (
        <div className="rounded-2xl shadow-xl p-6 sm:p-8 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
            <FontAwesomeIcon icon={faBook} className="mr-4 text-indigo-500" />
            Set Basic Quiz Details
          </h2>


          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Quiz Title*</label>
              <input
                type="text"
                name="title"
                value={quizDetails.title}
                onChange={handleQuizDetailChange}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                placeholder="Enter quiz title"
                required
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subject*</label>
                <input
                  type="text"
                  name="subject"
                  value={quizDetails.subject}
                  onChange={handleQuizDetailChange}
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                  placeholder="Enter subject"
                  required
                />
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Number of Questions*</label>
                <input
                  type="number"
                  name="questionCount"
                  value={quizDetails.questionCount}
                  onChange={handleQuizDetailChange}
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                  placeholder="Enter number of questions"
                  min="1"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Quiz Duration*</label>
                <select
                  name="duration"
                  value={quizDetails.duration}
                  onChange={handleQuizDetailChange}
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                  required
                >
                  {durationOptions.map(minutes => (
                    <option key={minutes} value={minutes}>{minutes} minutes</option>
                  ))}
                </select>
              </div>
            </div>


            <div className="pt-4">
              <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Quiz Rules</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="negativeMarks"
                  name="hasNegativeMarks"
                  checked={quizDetails.hasNegativeMarks}
                  onChange={handleQuizDetailChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="negativeMarks" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Enable Negative Marking
                </label>
              </div>
            </div>


            <div className="flex justify-end pt-6">
              <button
                onClick={() => setActiveSection("questions")}
                disabled={!quizDetails.title || !quizDetails.subject || !quizDetails.questionCount}
                className={`px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 ${
                  !quizDetails.title || !quizDetails.subject || !quizDetails.questionCount
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
      )}


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
         
          {/* Bulk operations panel */}
          {showBulkOperations && !previewMode && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600 flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setImportMode(!importMode)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm font-medium transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
                Import
              </button>
             
              <button
                onClick={exportQuestions}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm font-medium transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                Export
              </button>
             
              <button
                onClick={shuffleQuestions}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center text-sm font-medium transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faRandom} className="mr-2" />
                Shuffle
              </button>
             
              <div className="flex-1"></div>
             
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 dark:text-white"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          )}
         
          {/* Import questions panel */}
          {importMode && !previewMode && (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
              <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Import Questions</h3>
             
              <div className="mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm font-medium transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
                  Select JSON File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
             
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="w-full h-40 p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 dark:text-white"
                placeholder={`Paste JSON data here. Format example:
[
  {
    "text": "What is 2+2?",
    "options": [{"id": 1, "text": "3"}, {"id": 2, "text": "4"}],
    "correctAnswer": "B",
    "explanation": "Basic addition",
    "points": 1
  }
]`}
              />
             
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleImportQuestions}
                  disabled={!importData}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors duration-200 ${
                    !importData ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Import
                </button>
               
                <button
                  onClick={() => {
                    setImportMode(false);
                    setImportData("");
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


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
                      <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-xs" />
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
                      <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">{qIndex + 1}. {question.text}</p>
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border ${
                              question.correctAnswer === String.fromCharCode(65 + oIndex)
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                            {option.text}
                            {question.correctAnswer === String.fromCharCode(65 + oIndex) && (
                              <span className="ml-2 text-green-600 dark:text-green-400">(Correct)</span>
                            )}
                          </div>
                        ))}
                      </div>
                     
                      {question.explanation && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mt-3">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Explanation:</p>
                          <p className="text-sm text-blue-700 dark:text-blue-200">{question.explanation}</p>
                        </div>
                      )}
                     
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Points: {question.points}
                        </div>
                      </div>
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
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        isQuestionComplete(filteredQuestions[activeQuestionIndex])
                          ? "bg-green-600 text-white dark:bg-green-700"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                      }`}>
                        {activeQuestionIndex + 1}
                      </span>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {filteredQuestions[activeQuestionIndex].text
                          ? filteredQuestions[activeQuestionIndex].text.substring(0, 30) + (filteredQuestions[activeQuestionIndex].text.length > 30 ? '...' : '')
                          : `Question ${activeQuestionIndex + 1}`}
                      </h3>
                      {isQuestionComplete(filteredQuestions[activeQuestionIndex]) && (
                        <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateQuestion(filteredQuestions[activeQuestionIndex].id);
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
                            removeQuestion(filteredQuestions[activeQuestionIndex].id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 mr-2"
                          title="Delete Question"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                      <FontAwesomeIcon
                        icon={filteredQuestions[activeQuestionIndex].isOpen ? faChevronUp : faChevronDown}
                        className="text-gray-500"
                      />
                    </div>
                  </div>


                  {filteredQuestions[activeQuestionIndex].isOpen && (
                    <div className="p-4 border-t dark:border-gray-700">
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Question Text*</label>
                        <input
                          type="text"
                          value={filteredQuestions[activeQuestionIndex].text}
                          onChange={(e) => handleQuestionChange(filteredQuestions[activeQuestionIndex].id, "text", e.target.value)}
                          className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                          placeholder="Enter question text"
                          required
                        />
                      </div>


                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Options*</label>
                        <div className="space-y-3">
                          {filteredQuestions[activeQuestionIndex].options.map((option, oIndex) => (
                            <div key={option.id} className="flex items-center">
                              <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs ${
                                filteredQuestions[activeQuestionIndex].correctAnswer === String.fromCharCode(65 + oIndex)
                                ? "bg-green-600 text-white dark:bg-green-700"
                                : "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                              }`}>
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(filteredQuestions[activeQuestionIndex].id, option.id, e.target.value)}
                                className="flex-1 p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                                placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                required
                              />
                              {filteredQuestions[activeQuestionIndex].options.length > 1 && (
                                <button
                                  onClick={() => removeOption(filteredQuestions[activeQuestionIndex].id, option.id)}
                                  className="ml-2 text-red-500 hover:text-red-700 p-1"
                                >
                                  <FontAwesomeIcon icon={faTrash} size="xs" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => addOption(filteredQuestions[activeQuestionIndex].id)}
                            className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm flex items-center mt-2"
                          >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Option
                          </button>
                        </div>
                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Correct Answer*</label>
                          <select
                            value={filteredQuestions[activeQuestionIndex].correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(filteredQuestions[activeQuestionIndex].id, e.target.value)}
                            className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                            required
                            disabled={filteredQuestions[activeQuestionIndex].options.length === 0}
                          >
                            <option value="">Select correct answer</option>
                            {filteredQuestions[activeQuestionIndex].options.map((option, oIndex) => (
                              <option key={option.id} value={String.fromCharCode(65 + oIndex)}>
                                {String.fromCharCode(65 + oIndex)}: {option.text || `Option ${String.fromCharCode(65 + oIndex)}`}
                              </option>
                            ))}
                          </select>
                        </div>
                       
                       {/*
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Points</label>
                          <input
                            type="number"
                            value={filteredQuestions[activeQuestionIndex].points}
                            onChange={(e) => handleQuestionChange(filteredQuestions[activeQuestionIndex].id, "points", parseInt(e.target.value) || 1)}
                            className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                            placeholder="Points for this question"
                            min="1"
                          />
                        </div>
                        */}
                      </div>

                      {/*
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Explanation (Optional)</label>
                        <textarea
                          value={filteredQuestions[activeQuestionIndex].explanation}
                          onChange={(e) => handleQuestionChange(filteredQuestions[activeQuestionIndex].id, "explanation", e.target.value)}
                          className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                          placeholder="Provide an explanation for the correct answer"
                          rows="3"
                        />
                      </div>
                      */}
                    </div>
                  )}
                </div>
              )
            )}
           
            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-gray-500 border dark:border-gray-700 rounded-lg shadow-sm">
                {searchQuery ? (
                  <>
                    <p className="mb-3 text-gray-700 dark:text-gray-300">No questions match your search.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm font-medium"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">No questions added yet. Click "Add Question" to get started.</p>
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
                onClick={saveAndAddNextQuestion}
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Quiz Saved Successfully!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
                  Thank you for using our platform to create your quiz!
                </p>
                <div className="mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-200"><strong>Title:</strong> {quizDetails.title}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200"><strong>Total Questions:</strong> {questions.length}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200"><strong>Duration:</strong> {quizDetails.duration} minutes</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 text-center">
                    Share this link with your students to take the quiz:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={generateShareLink()}
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
                    to="../quizzes"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors duration-200"
                    onClick={() => setShowSharePopup(false)}
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
          )}


          {/* Quiz Summary */}
          <div className="mt-8 p-6 dark:bg-gray-700 bg-gray-50 rounded-lg border dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Quiz Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p><strong>Title:</strong> {quizDetails.title}</p>
                <p><strong>Subject:</strong> {quizDetails.subject}</p>
              </div>
              <div>
                <p><strong>Questions:</strong> {questions.length} / {quizDetails.questionCount}</p>
                <p><strong>Duration:</strong> {quizDetails.duration} minutes</p>
              </div>
              <div className="sm:col-span-2">
                <p><strong>Completion:</strong> {questions.filter(isQuestionComplete).length} of {questions.length} questions complete</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(questions.filter(isQuestionComplete).length / questions.length) * 100}%` }}
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

