import { useState, useEffect } from "react";
import QuizIntro from "./QuizIntro";
import QuizPage from "./QuizPage";
import QuizSubmit from "./QuizSubmit";
import { useNavigate, useSearchParams } from "react-router";
import { getQuizByCode, getStudentDetails, submitAnswer } from "@src/api";
import toast from "react-hot-toast";

const QuizAttendLayout = () => {
  const [quiz, setQuiz] = useState({
    id: 0,
    title: "",
    subject: "",
    share_code: "",
    no_of_questions: 0,
    questions: [
      {
        id: 0,
        options: [""],
        problem: "",
        created_at: null,
        updated_at: null,
      },
    ],
    status: "",
    duration: 0,
    is_negative_marking: false,
    total_submissions: 0,
    created_at: null,
    updated_at: null,
  });
  // Initialize state from local storage
  const initializeStateFromStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // State management
  const [currentSection, setCurrentSection] = useState(
    initializeStateFromStorage("currentSection", "hero")
  );

  const [studentDetails, setStudentDetails] = useState({
    name: "",
    phone: "",
    district: "",
    quiz_code: "",
    attempted: false,
    time_stamp: 0,
  });

  const [answers, setAnswers] = useState(
    initializeStateFromStorage("answers", {})
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initializeStateFromStorage("currentQuestionIndex", 0)
  );

  const [timeLeft, setTimeLeft] = useState(0);

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

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const resp = await getStudentDetails({
          quiz_code: searchParams.get("code"),
        });
        if (resp.data.attempted)
          return navigate("analysis", { relative: true, replace: true });
        setStudentDetails(resp.data);
      } catch (error) {
        if (error.status === 404) {
          setCurrentSection("hero");
          setIsQuizActive(false);
          setStudentDetails({
            name: "",
            phone: "",
            district: "",
            quiz_code: searchParams.get("code"),
            time_stamp: 0,
          });
        }
      }
    }
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    async function fetchQuizData(code) {
      if (!code) return navigate("/", { replace: true });

      try {
        const resp = await getQuizByCode({ share_code: code });
        setQuiz(resp.data);
      } catch (error) {
        navigate("/", { replace: true });
      }
    }
    fetchQuizData(searchParams.get("code"));
  }, []);

  useEffect(() => {
    setTimeLeft(getTimeLeft(studentDetails.time_stamp, quiz.duration));
  }, [studentDetails.time_stamp, quiz.duration]);

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("currentSection", JSON.stringify(currentSection));
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
    answers,
    currentQuestionIndex,
    timeLeft,
    isQuizActive,
    visitedQuestions,
  ]);

  function clearLocalStorage() {
    localStorage.removeItem("currentSection");
    localStorage.removeItem("answers");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("isQuizActive");
    localStorage.removeItem("visitedQuestions");
  }

  function getTimeLeft(startTimestampSec, durationNano) {
    const startTimeMs = startTimestampSec * 1000;
    const durationMs = durationNano / 1e6; // convert nanoseconds to milliseconds
    const endTimeMs = startTimeMs + durationMs;

    const nowMs = Date.now();
    const timeLeftMs = endTimeMs - nowMs;

    return Math.max(0, Math.floor(timeLeftMs / 1000)); // return time left in seconds
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      // Mark the question as visited
      const nextQuestionId = quiz.questions[nextIndex].id;
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
    const questionId = quiz.questions[index].id;
    if (!visitedQuestions.includes(questionId)) {
      setVisitedQuestions([...visitedQuestions, questionId]);
    }
  };

  // Show confirmation popup for quiz submission
  const handleQuizSubmit = () => {
    setShowSubmitPopup(true);
  };

  // Handle confirmed quiz submission
  const confirmQuizSubmit = async () => {
    try {
      const result = Object.entries(answers).map(
        ([questionId, selectedIndex]) => ({
          question_id: parseInt(questionId, 10),
          selected_index: selectedIndex,
        })
      );

      await submitAnswer({
        answers: result,
        quiz_code: searchParams.get("code"),
      });

      clearLocalStorage();
      navigate("analysis", { replace: true, relative: true });
    } catch (error) {
      toast.error("error while submitting your answer");
    }
  };

  // Timer logic for quiz
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            confirmQuizSubmit();
            clearInterval(timer);
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
    const totalQuestions = quiz.questions.length;
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
          quizData={quiz}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          setIsQuizActive={setIsQuizActive}
        />
      ) : currentSection === "quiz" ? (
        <QuizPage
          quizData={quiz}
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
        quizData={quiz}
        resultCountdown={resultCountdown}
        isResultAvailable={isResultAvailable}
        formatTime={formatTime}
        answers={answers}
      />
    </div>
  );
};

export default QuizAttendLayout;
