import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faCheckCircle,
  faTimesCircle,
  faTrophy,
  faChevronLeft,
  faQuestionCircle,
  faArrowLeft,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

const StudentAnalysisPage = () => {
  const { studentId } = useParams();
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  
  // Sample data - in a real app this would come from API
  const [student, setStudent] = useState({
    id: parseInt(studentId),
    name: "John Doe",
    mobile: "9876543210",
    totalQuestions: 50,
    totalCorrect: 32,
    totalWrong: 18,
    totalScore: 64, // Out of 100
    answers: Array.from({ length: 50 }, (_, i) => ({
      questionId: i + 1,
      questionText: `Question ${i + 1}: ${generateSampleQuestion(i)}`,
      studentAnswer: Math.random() > 0.36 ? "correct" : "incorrect",
      correctAnswer: getCorrectAnswer(i),
      studentChoice: getStudentChoice(i),
      explanation: `Explanation for question ${i + 1}: ${generateExplanation(i)}`
    }))
  });

  // Helper functions to generate sample data
  function generateSampleQuestion(index) {
    const questions = [
      "What is the correct way to declare a variable in JavaScript?",
      "Which method is used to add an element at the end of an array?",
      "What does DOM stand for in web development?",
      "Which operator is used for strict equality comparison?",
      "What is the purpose of the 'this' keyword in JavaScript?",
      "How do you create a function in JavaScript?",
      "Which statement is used to stop a loop execution?",
      "What is the result of '5' + 2 in JavaScript?",
      "How can you include external JavaScript file in HTML?",
      "What is the difference between let and var declarations?"
    ];
    return questions[index % questions.length];
  }

  function getCorrectAnswer(index) {
    const answers = [
      "let x = 10;",
      "push()",
      "Document Object Model",
      "===",
      "It refers to the object it belongs to",
      "function myFunction() {}",
      "break",
      "'52'",
      "<script src='script.js'></script>",
      "let has block scope while var has function scope"
    ];
    return answers[index % answers.length];
  }

  function getStudentChoice(index) {
    const answers = [
      ["let x = 10;", "var x = 10", "const x = 10", "x = 10"],
      ["push()", "add()", "append()", "insert()"],
      ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Management"],
      ["===", "==", "=", "!=="],
      ["It refers to the object it belongs to", "It refers to the window object", "It refers to the parent object", "None of these"]
    ];
    return answers[index % answers.length];
  }

  function generateExplanation(index) {
    const explanations = [
      "In modern JavaScript, let is the preferred way to declare variables with block scope.",
      "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      "DOM stands for Document Object Model which represents the HTML document as a tree structure.",
      "=== checks both value and type equality without type conversion.",
      "The 'this' keyword refers to the object that the function is a property of."
    ];
    return explanations[index % explanations.length];
  }

  // Handle click on question button
  const handleQuestionClick = (questionId) => {
    if (activeQuestionId === questionId) {
      setActiveQuestionId(null); // Close if already open
    } else {
      setActiveQuestionId(questionId);
    }
  };

  // Get question by ID
  const getQuestionById = (questionId) => {
    return student.answers.find(answer => answer.questionId === questionId);
  };

  // Get current active question
  const activeQuestion = activeQuestionId ? getQuestionById(activeQuestionId) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-22 px-4 py-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Link>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUser} className="text-2xl text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {student.mobile}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Total Score</span>
                <span className="text-2xl font-bold text-indigo-600 flex items-center">
                  <FontAwesomeIcon icon={faTrophy} className="mr-2 text-sm" />
                  {student.totalScore}
                </span>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Correct</span>
                <span className="text-2xl font-bold text-green-600 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-sm" />
                  {student.totalCorrect}
                </span>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Wrong</span>
                <span className="text-2xl font-bold text-red-600 flex items-center">
                  <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-sm" />
                  {student.totalWrong}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Question Analysis</h2>
          
          {/* Question Buttons */}
          <div className="mb-6">
            <h3 className="text-gray-500 mb-3">Select a question to view details:</h3>
            <div className="flex flex-wrap gap-2">
              {student.answers.map((answer) => (
                <button
                  key={answer.questionId}
                  onClick={() => handleQuestionClick(answer.questionId)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-colors ${
                    answer.studentAnswer === "correct"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  } ${activeQuestionId === answer.questionId ? "ring-2 ring-indigo-500" : ""}`}
                >
                  {answer.questionId}
                </button>
              ))}
            </div>
          </div>
          
          {/* Question Detail */}
          {activeQuestion && (
            <div className="border-t pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start mb-4">
                  <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">{activeQuestion.questionText}</h4>
                    <div className="mt-3 space-y-2">
                      {activeQuestion.studentChoice.map((choice, index) => (
                        <div 
                          key={index}
                          className={`p-2 rounded-md ${
                            choice === activeQuestion.correctAnswer 
                              ? "bg-green-100 border border-green-200"
                              : activeQuestion.studentAnswer === "incorrect" && index === activeQuestion.studentChoice.indexOf(activeQuestion.studentChoice[0])
                                ? "bg-red-100 border border-red-200" 
                                : "bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {choice}
                          {choice === activeQuestion.correctAnswer && (
                            <span className="ml-2 text-green-600">✓ Correct Answer</span>
                          )}
                          {activeQuestion.studentAnswer === "incorrect" && index === activeQuestion.studentChoice.indexOf(activeQuestion.studentChoice[0]) && (
                            <span className="ml-2 text-red-600">✗ Student's Answer</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-indigo-50 p-3 rounded-md">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Explanation:</span> {activeQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!activeQuestion && (
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 flex flex-col items-center">
              <FontAwesomeIcon icon={faEye} className="text-3xl text-gray-400 mb-2" />
              <p>Select a question number above to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalysisPage;