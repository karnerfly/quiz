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
  faEdit,
  faFileCsv,
  faFileExport,
  faEye,
  faTags,
  faClone,
  faListUl,
  faSearch,
  faRandom
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
    hasNegativeMarks: false,
    category: "",
    difficultyLevel: "medium"
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: [{ id: 1, text: "" }],
      correctAnswer: "",
      isOpen: true,
      explanation: "",
      tags: [],
      points: 1
    }
  ]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [importMode, setImportMode] = useState(false);
  const [importData, setImportData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["Math", "Science", "History", "English", "Computer Science"]);
  const [availableTags, setAvailableTags] = useState(["Easy", "Medium", "Hard", "Important", "Review"]);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  
  const questionContentRef = useRef(null);
  const fileInputRef = useRef(null);

  const durationOptions = ["15", "30", "45", "60", "90", "120"];
  const difficultyLevels = ["easy", "medium", "hard"];

  useEffect(() => {
    // Logic to check if this is an edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const editQuizId = urlParams.get('edit');
    
    if (editQuizId) {
      // This would fetch the quiz data from API in a real application
      // For now we'll simulate loading a quiz
      loadQuizForEditing(editQuizId);
    }
  }, []);

  const loadQuizForEditing = (quizId) => {
    // Simulated data fetch - in a real app this would be an API call
    console.log(`Loading quiz with ID: ${quizId}`);
    
    // Mock data for demonstration
    setQuizDetails({
      title: "Sample Math Quiz",
      subject: "Mathematics",
      questionCount: "5",
      duration: "45",
      hasNegativeMarks: true,
      category: "Math",
      difficultyLevel: "medium"
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
        tags: ["Easy"],
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
        tags: ["Easy", "Important"],
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
      tags: [],
      points: 1
    };
    
    // Close all existing questions
    const updatedQuestions = questions.map(q => ({...q, isOpen: false}));
    
    setQuestions([...updatedQuestions, newQuestion]);
    setActiveQuestionIndex(questions.length);
    
    // Scroll to the new question after it's added
    setTimeout(() => {
      questionContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return;
    
    const newQuestion = {
      ...JSON.parse(JSON.stringify(questionToDuplicate)),
      id: Math.max(...questions.map(q => q.id)) + 1,
      isOpen: true
    };
    
    // Close all existing questions
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
      
      // Adjust the active question index if needed
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

  const addTagToQuestion = (questionId, tag) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            tags: q.tags.includes(tag) ? q.tags : [...q.tags, tag]
          } 
        : q
    ));
  };

  const removeTagFromQuestion = (questionId, tagToRemove) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            tags: q.tags.filter(tag => tag !== tagToRemove)
          } 
        : q
    ));
  };

  const addNewTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
      setNewTag("");
    }
  };

  const handleImportQuestions = () => {
    try {
      const importedQuestions = JSON.parse(importData);
      if (Array.isArray(importedQuestions)) {
        // Add proper IDs and make first question open
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
    // Prepare data for export (remove UI-specific properties)
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
      q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.options.some(opt => opt.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredQuestions = filterQuestions();

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 px-2 sm:px-0">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-6 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
        <div 
          className={`absolute top-1/2 left-0 h-1 ${activeSection === "questions" ? "w-full" : "w-1/2"} bg-indigo-600 transition-all duration-300 -z-10`}
        ></div>
        
        <div 
          className={`flex flex-col items-center ${activeSection === "details" ? "text-indigo-600" : "text-gray-500"}`}
          onClick={() => setActiveSection("details")}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${activeSection === "details" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
            1
          </div>
          <span className="text-xs sm:text-sm">Basic Details</span>
        </div>
        
        <div 
          className={`flex flex-col items-center ${activeSection === "questions" ? "text-indigo-600" : "text-gray-500"}`}
          onClick={() => quizDetails.title && setActiveSection("questions")}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${activeSection === "questions" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
            2
          </div>
          <span className="text-xs sm:text-sm">Add Questions</span>
        </div>
      </div>

      {/* Section A: Basic Quiz Details */}
      {activeSection === "details" && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
            <FontAwesomeIcon icon={faBook} className="mr-3 text-indigo-500" />
            Set Basic Quiz Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quiz Title*</label>
              <input
                type="text"
                name="title"
                value={quizDetails.title}
                onChange={handleQuizDetailChange}
                className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject*</label>
                <input
                  type="text"
                  name="subject"
                  value={quizDetails.subject}
                  onChange={handleQuizDetailChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter subject"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={quizDetails.category}
                  onChange={handleQuizDetailChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Number of Questions*</label>
                <input
                  type="number"
                  name="questionCount"
                  value={quizDetails.questionCount}
                  onChange={handleQuizDetailChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter number of questions"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quiz Duration*</label>
                <select
                  name="duration"
                  value={quizDetails.duration}
                  onChange={handleQuizDetailChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {durationOptions.map(minutes => (
                    <option key={minutes} value={minutes}>{minutes} minutes</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty Level</label>
                <select
                  name="difficultyLevel"
                  value={quizDetails.difficultyLevel}
                  onChange={handleQuizDetailChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium mb-2">Quiz Rules</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="negativeMarks"
                    name="hasNegativeMarks"
                    checked={quizDetails.hasNegativeMarks}
                    onChange={handleQuizDetailChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="negativeMarks" className="ml-2 text-sm">
                    Enable Negative Marking
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveSection("questions")}
                disabled={!quizDetails.title || !quizDetails.subject || !quizDetails.questionCount}
                className={`px-4 py-2 rounded-lg flex items-center ${!quizDetails.title || !quizDetails.subject || !quizDetails.questionCount ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
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
        <div className="rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          {/* Question management header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-3 text-indigo-500" />
              {previewMode ? "Preview Quiz" : "Add Questions"}
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {!previewMode && (
                <>
                  <button
                    onClick={addQuestion}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center text-sm"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    Add Question
                  </button>
                  
                  <button
                    onClick={() => setShowBulkOperations(!showBulkOperations)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center text-sm"
                  >
                    <FontAwesomeIcon icon={faListUl} className="mr-1" />
                    Bulk Actions
                  </button>
                </>
              )}
              
              <button
                onClick={togglePreviewMode}
                className={`px-3 py-1 rounded-lg flex items-center text-sm ${
                  previewMode 
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600" 
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                {previewMode ? "Exit Preview" : "Preview Quiz"}
              </button>
            </div>
          </div>
          
          {/* Bulk operations panel */}
          {showBulkOperations && !previewMode && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600 flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setImportMode(!importMode)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
              >
                <FontAwesomeIcon icon={faFileCsv} className="mr-1" />
                Import
              </button>
              
              <button
                onClick={exportQuestions}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm"
              >
                <FontAwesomeIcon icon={faFileExport} className="mr-1" />
                Export
              </button>
              
              <button
                onClick={shuffleQuestions}
                className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center text-sm"
              >
                <FontAwesomeIcon icon={faRandom} className="mr-1" />
                Shuffle
              </button>
              
              <div className="flex-1"></div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="pl-8 pr-2 py-1 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" 
                />
              </div>
            </div>
          )}
          
          {/* Import questions panel */}
          {importMode && !previewMode && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
              <h3 className="text-lg font-medium mb-2">Import Questions</h3>
              
              <div className="mb-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                >
                  <FontAwesomeIcon icon={faFileCsv} className="mr-1" />
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
                className="w-full h-32 p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder={`Paste JSON data here. Format example:
[
  {
    "text": "What is 2+2?",
    "options": [{"id": 1, "text": "3"}, {"id": 2, "text": "4"}],
    "correctAnswer": "B",
    "explanation": "Basic addition",
    "tags": ["Easy"],
    "points": 1
  }
]`}
              />
              
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleImportQuestions}
                  disabled={!importData}
                  className={`px-3 py-1 rounded-lg flex items-center text-sm ${!importData ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  Import
                </button>
                
                <button
                  onClick={() => {
                    setImportMode(false);
                    setImportData("");
                  }}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Question Navigation */}
          {!previewMode && (
            <div className="flex items-center justify-start mb-4 overflow-x-auto py-2 hide-scrollbar">
              <div className="flex space-x-2">
                {filteredQuestions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => toggleQuestion(index)}
                    className={`px-3 py-1 rounded-lg min-w-max text-sm flex items-center ${
                      question.isOpen
                        ? "bg-indigo-600 text-white"
                        : isQuestionComplete(question)
                        ? "bg-green-600 text-white dark:bg-green-700"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {index + 1}
                    {isQuestionComplete(question) && (
                      <FontAwesomeIcon icon={faCheckCircle} className="ml-1 text-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Content */}
          <div className="space-y-6 mb-6" ref={questionContentRef}>
            {filteredQuestions.map((question, qIndex) => (
              <div 
                key={question.id} 
                className={`border dark:border-gray-700 rounded-lg ${question.isOpen ? "dark:bg-gray-700 bg-gray-50" : "dark:bg-gray-800 bg-white"}`}
              >
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(qIndex)}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      isQuestionComplete(question) 
                        ? "bg-green-600 text-white dark:bg-green-700" 
                        : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                    }`}>
                      {qIndex + 1}
                    </span>
                    <h3 className="font-medium">
                      {question.text ? question.text.substring(0, 30) + (question.text.length > 30 ? '...' : '') : `Question ${qIndex + 1}`}
                    </h3>
                    {isQuestionComplete(question) && (
                      <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-500" />
                    )}
                    
                    {question.tags && question.tags.length > 0 && (
                      <div className="ml-2 flex flex-wrap gap-1">
                        {question.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {question.tags.length > 2 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">
                            +{question.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {!previewMode && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateQuestion(question.id);
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
                              removeQuestion(question.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1 mr-2"
                            title="Delete Question"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </>
                    )}
                    <FontAwesomeIcon
                      icon={question.isOpen ? faChevronUp : faChevronDown}
                      className="text-gray-500"
                    />
                  </div>
                </div>

                {/* Question Preview Mode */}
                {previewMode && (
                  <div className="p-4 border-t dark:border-gray-700">
                    <p className="mb-4 text-lg">{qIndex + 1}. {question.text}</p>
                    
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
                      <div className="flex gap-1">
                        {question.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Points: {question.points}
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Edit Mode */}
                {question.isOpen && !previewMode && (
                  <div className="p-4 border-t dark:border-gray-700">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Question Text*</label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                        className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter question text"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Options*</label>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div key={option.id} className="flex items-center">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs ${
                              question.correctAnswer === String.fromCharCode(65 + oIndex)
                              ? "bg-green-600 text-white dark:bg-green-700"
                              : "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                            }`}>
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                              className="flex-1 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                              required
                            />
                            {question.options.length > 1 && (
                              <button
                                onClick={() => removeOption(question.id, option.id)}
                                className="ml-2 text-red-500 hover:text-red-700 p-1"
                              >
                                <FontAwesomeIcon icon={faTrash} size="xs" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(question.id)}
                          className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm flex items-center mt-2"
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-1" />
                          Add Option
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Correct Answer*</label>
                        <select
                          value={question.correctAnswer}
                          onChange={(e) => handleCorrectAnswerChange(question.id, e.target.value)}
                          className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                          disabled={question.options.length === 0}
                        >
                          <option value="">Select correct answer</option>
                          {question.options.map((option, oIndex) => (
                            <option key={option.id} value={String.fromCharCode(65 + oIndex)}>
                              {String.fromCharCode(65 + oIndex)}: {option.text || `Option ${String.fromCharCode(65 + oIndex)}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Points</label>
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) => handleQuestionChange(question.id, "points", parseInt(e.target.value) || 1)}
                          className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Points for this question"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Explanation (Optional)</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => handleQuestionChange(question.id, "explanation", e.target.value)}
                        className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Provide an explanation for the correct answer"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FontAwesomeIcon icon={faTags} className="mr-1" />
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {question.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="flex items-center text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                          >
                            {tag}
                            <button 
                              className="ml-1 hover:text-red-500" 
                              onClick={() => removeTagFromQuestion(question.id, tag)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        {availableTags.filter(tag => !question.tags.includes(tag)).map(tag => (
                          <button
                            key={tag}
                            onClick={() => addTagToQuestion(question.id, tag)}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200"
                          >
                            + {tag}
                          </button>
                        ))}
                        
                        {/* Add custom tag */}
                        <div className="flex">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="text-xs px-2 py-1 border dark:border-gray-700 rounded-l-full bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-24"
                            placeholder="New tag"
                          />
                          <button
                            onClick={addNewTag}
                            disabled={!newTag}
                            className={`text-xs px-2 py-1 rounded-r-full border-y border-r ${
                              !newTag 
                                ? "bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500"
                                : "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                            }`}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-gray-500 border dark:border-gray-700 rounded-lg">
                {searchQuery ? (
                  <>
                    <p className="mb-2">No questions match your search.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <p>No questions added yet. Click "Add Question" to get started.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveSection("details")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
            >
              Back
            </button>
            <Link
              to="../quizzes" // Using relative path to go back to quizzes list
              className={`px-4 py-2 rounded-lg flex items-center ${
                !allQuestionsComplete() 
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save Quiz
            </Link>
          </div>

          {/* Quiz Summary */}
          <div className="mt-6 p-4 dark:bg-gray-700 bg-gray-50 rounded-lg border dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Quiz Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Title:</strong> {quizDetails.title}</p>
                <p><strong>Subject:</strong> {quizDetails.subject}</p>
                <p><strong>Category:</strong> {quizDetails.category || "Not specified"}</p>
              </div>
              <div>
                <p><strong>Questions:</strong> {questions.length} / {quizDetails.questionCount}</p>
                <p><strong>Duration:</strong> {quizDetails.duration} minutes</p>
                <p><strong>Difficulty:</strong> {quizDetails.difficultyLevel.charAt(0).toUpperCase() + quizDetails.difficultyLevel.slice(1)}</p>
              </div>
              <div className="sm:col-span-2">
                <p><strong>Completion:</strong> {questions.filter(isQuestionComplete).length} of {questions.length} questions complete</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-1">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full"
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