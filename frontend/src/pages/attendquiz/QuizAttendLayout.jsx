import { useState, useEffect } from "react";
import QuizIntro from "./QuizIntro";
import QuizPage from "./QuizPage";
import QuizSubmit from "./QuizSubmit";

const QuizAttendLayout = () => {
  const quizData = {
    title: "Python Fundamentals",
    subject: "Programming",
    preparedBy: "Dr. John Smith",
    totalQuestions: 5,
    duration: 1, // Duration in minutes
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

  // New states for submission popup and result countdown
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [resultCountdown, setResultCountdown] = useState(30); // 30 sec.
  const [isResultAvailable, setIsResultAvailable] = useState(false);

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("currentSection", JSON.stringify(currentSection));
    localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    localStorage.setItem("isQuizActive", JSON.stringify(isQuizActive));
    localStorage.setItem("visitedQuestions", JSON.stringify(visitedQuestions));
  }, [
    currentSection,
    studentDetails,
    answers,
    currentQuestionIndex,
    timeLeft,
    isQuizActive,
    visitedQuestions,
  ]);

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

  // Show confirmation popup for quiz submission
  const handleQuizSubmit = () => {
    setShowSubmitPopup(true);
  };

  // Handle confirmed quiz submission
  const confirmQuizSubmit = () => {
    setIsQuizActive(false);
    setCurrentSection("submitted");
    setShowSubmitPopup(false);
    localStorage.clear();
  };

  // Timer logic for quiz
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

  // Countdown timer for result availability
  useEffect(() => {
    if (currentSection === "submitted" && resultCountdown > 0) {
      const countdownTimer = setInterval(() => {
        setResultCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setIsResultAvailable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [currentSection, resultCountdown]);

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
    const visitedNotAnswered = visitedQuestions.filter(
      (qId) => !answers[qId]
    ).length;
    const notVisited = totalQuestions - visitedQuestions.length;

    return {
      totalQuestions,
      answeredQuestions,
      visitedNotAnswered,
      notVisited,
      answeredPercentage: Math.round(
        (answeredQuestions / totalQuestions) * 100
      ),
    };
  };

  const getQuestionStatusColor = (questionId) => {
    if (answers[questionId]) return "bg-green-500"; // Visited and answered
    if (visitedQuestions.includes(questionId)) return "bg-orange-400"; // Visited but not answered
    return "bg-yellow-300"; // Not visited
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white font-sans">
      {currentSection === "hero" ||
      currentSection === "form" ||
      currentSection === "welcome" ? (
        <QuizIntro
          quizData={quizData}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          setIsQuizActive={setIsQuizActive}
        />
      ) : currentSection === "quiz" ? (
        <QuizPage
          quizData={quizData}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          visitedQuestions={visitedQuestions}
          timeLeft={timeLeft}
          handleAnswerSelect={handleAnswerSelect}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          jumpToQuestion={jumpToQuestion}
          handleQuizSubmit={handleQuizSubmit}
          getQuizStats={getQuizStats}
          getQuestionStatusColor={getQuestionStatusColor}
          formatTime={formatTime}
        />
      ) : null}

      <QuizSubmit
        showSubmitPopup={showSubmitPopup}
        setShowSubmitPopup={setShowSubmitPopup}
        confirmQuizSubmit={confirmQuizSubmit}
        currentSection={currentSection}
        studentDetails={studentDetails}
        setCurrentSection={setCurrentSection}
        setStudentDetails={setStudentDetails}
        setAnswers={setAnswers}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setTimeLeft={setTimeLeft}
        setIsQuizActive={setIsQuizActive}
        setVisitedQuestions={setVisitedQuestions}
        setResultCountdown={setResultCountdown}
        setIsResultAvailable={setIsResultAvailable}
        quizData={quizData}
        resultCountdown={resultCountdown}
        isResultAvailable={isResultAvailable}
        formatTime={formatTime}
        answers={answers}
      />
    </div>
  );
};

export default QuizAttendLayout;
