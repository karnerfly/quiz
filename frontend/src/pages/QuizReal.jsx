import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faClock, 
  faCheckCircle, 
  faCircleExclamation,
  faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";

const StudentQuizPage = () => {
  const quizData = {
    title: "Python Fundamentals",
    subject: "Programming",
    preparedBy: "Dr. John Smith",
    totalQuestions: 5,
    duration: 30, // Duration in minutes
    questions: [
      {
        id: 1,
        text: "What is the output of print(2 + 2)?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
      },
      {
        id: 2,
        text: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        correctAnswer: "def",
      },
      {
        id: 3,
        text: "What is the correct file extension for Python files?",
        options: [".py", ".python", ".pt", ".p"],
        correctAnswer: ".py",
      },
      {
        id: 4,
        text: "Which of the following is a Python tuple?",
        options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "{1: 2, 3: 4}"],
        correctAnswer: "(1, 2, 3)",
      },
      {
        id: 5,
        text: "What does the len() function do?",
        options: [
          "Returns the length of an object",
          "Converts to lowercase",
          "Loops through a list",
          "Adds elements to a list",
        ],
        correctAnswer: "Returns the length of an object",
      },
    ],
  };

  // Initialize state from local storage
  const initializeStateFromStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // State management
  const [currentSection, setCurrentSection] = useState(
    initializeStateFromStorage("currentSection", "hero")
  );
  
  const [studentDetails, setStudentDetails] = useState(
    initializeStateFromStorage("studentDetails", {
      name: "",
      mobile: "",
      email: "",
    })
  );
  
  const [answers, setAnswers] = useState(
    initializeStateFromStorage("answers", {})
  );
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initializeStateFromStorage("currentQuestionIndex", 0)
  );
  
  const [timeLeft, setTimeLeft] = useState(
    initializeStateFromStorage("timeLeft", quizData.duration * 60)
  );
  
  const [isQuizActive, setIsQuizActive] = useState(
    initializeStateFromStorage("isQuizActive", false)
  );
  
  const [visitedQuestions, setVisitedQuestions] = useState(
    initializeStateFromStorage("visitedQuestions", [])
  );

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("currentSection", JSON.stringify(currentSection));
    localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("currentQuestionIndex", JSON.stringify(currentQuestionIndex));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    localStorage.setItem("isQuizActive", JSON.stringify(isQuizActive));
    localStorage.setItem("visitedQuestions", JSON.stringify(visitedQuestions));
  }, [currentSection, studentDetails, answers, currentQuestionIndex, timeLeft, isQuizActive, visitedQuestions]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (studentDetails.name && studentDetails.mobile) {
      setCurrentSection("welcome");
    } else {
      alert("Please fill in Name and Mobile Number.");
    }
  };

  // Start quiz
  const startQuiz = () => {
    setCurrentSection("quiz");
    setIsQuizActive(true);
    
    // Mark first question as visited
    if (!visitedQuestions.includes(1)) {
      setVisitedQuestions([...visitedQuestions, 1]);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Mark the question as visited
      const nextQuestionId = quizData.questions[nextIndex].id;
      if (!visitedQuestions.includes(nextQuestionId)) {
        setVisitedQuestions([...visitedQuestions, nextQuestionId]);
      }
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Navigate to specific question
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    
    // Mark the question as visited
    const questionId = quizData.questions[index].id;
    if (!visitedQuestions.includes(questionId)) {
      setVisitedQuestions([...visitedQuestions, questionId]);
    }
  };

  // Submit quiz with optional warning
const handleQuizSubmit = () => {
  const unansweredCount = quizData.questions.length - Object.keys(answers).length;

  if (unansweredCount > 0) {
    const confirmSubmit = window.confirm(
      `You have ${unansweredCount} unanswered question(s). Do you still want to submit?`
    );
    if (!confirmSubmit) return;
  }

  setIsQuizActive(false);
  setCurrentSection("submitted");
  localStorage.clear();
 };






  // Timer logic
  useEffect(() => {
    if (isQuizActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsQuizActive(false);
            setCurrentSection("submitted");
            localStorage.clear();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isQuizActive, timeLeft]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate quiz progress statistics
  const getQuizStats = () => {
    const totalQuestions = quizData.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const visitedNotAnswered = visitedQuestions.filter(qId => !answers[qId]).length;
    const notVisited = totalQuestions - visitedQuestions.length;
    
    return {
      totalQuestions,
      answeredQuestions,
      visitedNotAnswered,
      notVisited,
      answeredPercentage: Math.round((answeredQuestions / totalQuestions) * 100)
    };
  };


  const getQuestionStatusColor = (questionId) => {
    if (answers[questionId]) return "bg-green-500"; // Visited and answered
    if (visitedQuestions.includes(questionId)) return "bg-orange-400"; // Visited but not answered
    return "bg-yellow-300"; // Not visited
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white font-sans">
      {/* Hero Section */}
      {currentSection === "hero" && (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{quizData.title}</h1>
            <p className="text-sm text-gray-600 mb-2 text-center">
              <strong>Subject:</strong> {quizData.subject}
            </p>
            <p className="text-sm text-gray-600 mb-6 text-center">
              <strong>Questions Prepared by:</strong> {quizData.preparedBy}
            </p>
            <button
              onClick={() => setCurrentSection("form")}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
            >
              See Now
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        </section>
      )}

      {/* Form Section */}
      {currentSection === "form" && (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enter Your Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={studentDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                <input
                  type="tel"
                  name="mobile"
                  value={studentDetails.mobile}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={studentDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Welcome Section - Enhanced Design */}
      {currentSection === "welcome" && (
        <section className="min-h-screen flex items-center justify-center pt-22 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Welcome Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome, {studentDetails.name}!
              </h2>
              <p className="text-sm opacity-90">
                Get ready to test your knowledge
              </p>
            </div>
            
            {/* Quiz Details Card */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-blue-600 font-medium uppercase">Title</p>
                    <p className="text-sm font-semibold text-gray-800">{quizData.title}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-purple-600 font-medium uppercase">Subject</p>
                    <p className="text-sm font-semibold text-gray-800">{quizData.subject}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-green-600 font-medium uppercase">Questions</p>
                    <p className="text-sm font-semibold text-gray-800">{quizData.totalQuestions}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-red-600 font-medium uppercase">Duration</p>
                    <p className="text-sm font-semibold text-gray-800">{quizData.duration} minutes</p>
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="text-sm font-semibold text-yellow-700 mb-2">Instructions</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Answer all questions within the time limit</li>
                  <li>• You can navigate between questions using the buttons</li>
                  <li>• Your progress will be saved if you refresh the page</li>
                  <li>• Submit when you have answered all questions</li>
                </ul>
              </div>
              
              <button
                onClick={startQuiz}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
              >
                <span>Start Quiz</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Quiz Section - With Non-Sticky Header and Footer */}
      {currentSection === "quiz" && (
        <section className="min-h-screen flex flex-col pt-22 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl w-full mx-auto">
            {/* Timer and Progress Bar */}
            <div className="bg-white shadow-md rounded-xl mb-6 overflow-hidden">
              {/* Timer */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex items-center justify-center">
                <div className="flex items-center bg-blue-800 px-4 py-2 rounded-full">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <span className="font-medium text-lg">{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              {/* Progress Statistics */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                  <span>Progress: {getQuizStats().answeredPercentage}%</span>
                  <span>{getQuizStats().answeredQuestions}/{getQuizStats().totalQuestions} Questions</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full" 
                    style={{ width: `${getQuizStats().answeredPercentage}%` }}
                  ></div>
                </div>
                
                {/* Question Status Indicators */}
                <div className="flex items-center justify-center mt-3 space-x-6 text-xs">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                    <span>Answered ({getQuizStats().answeredQuestions})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-1"></span>
                    <span>Visited ({getQuizStats().visitedNotAnswered})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                    <span>Not Visited ({getQuizStats().notVisited})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">
                  {currentQuestionIndex + 1}
                </span>
                <span>{quizData.questions[currentQuestionIndex].text}</span>
              </h2>
              
              <div className="space-y-3">
                {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      answers[quizData.questions[currentQuestionIndex].id] === option
                        ? "bg-blue-50 border-blue-300"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${quizData.questions[currentQuestionIndex].id}`}
                      value={option}
                      checked={answers[quizData.questions[currentQuestionIndex].id] === option}
                      onChange={() =>
                        handleAnswerSelect(quizData.questions[currentQuestionIndex].id, option)
                      }
                      className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-800">{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentQuestionIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                {currentQuestionIndex < quizData.questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleQuizSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-colors duration-200"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
            
            {/* Question Navigation Panel*/}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Question Navigation</h3>
              
              {/* Question Button Grid */}
              <div className="flex flex-wrap gap-2 justify-center">
                {quizData.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => jumpToQuestion(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                      getQuestionStatusColor(question.id)
                    } ${
                      currentQuestionIndex === index ? "ring-2 ring-blue-300" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {/* Legend for the colors */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-600">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-1"></span>
                  <span>Visited but not answered</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                  <span>Not visited</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Submitted Section */}
      {currentSection === "submitted" && (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Submitted Successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Thank you, {studentDetails.name}, for taking the quiz. Your responses have been recorded.
            </p>
            <button
              onClick={() => {
                setCurrentSection("hero");
                // Reset all states to empty
                setStudentDetails({
                  name: "",
                  mobile: "",
                  email: "",
                });
                setAnswers({});
                setCurrentQuestionIndex(0);
                setTimeLeft(quizData.duration * 60);
                setIsQuizActive(false);
                setVisitedQuestions([]);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default StudentQuizPage;