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
  faEye,
  faCamera,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { getQuizByCode, getStudentResult } from "@src/api";

const StudentAnalysisPage = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);
  const [quiz, setQuiz] = useState({
    id: 0,
    title: "",
    subject: "",
    share_code: "",
    no_of_questions: 0,
    questions: [],
    created_at: null,
    updated_at: null,
  });

  const [student, setStudent] = useState({
    id: 0,
    name: "",
    phone: "",
    district: "",
    quiz_code: "",
    submission_code: "",
    answers: [],
    score: 0,
    created_at: null,
    updated_at: null,
  });

  const [showScreenshotAlert, setShowScreenshotAlert] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const resp = await getStudentResult();
        setStudent(
          resp.data || {
            id: 0,
            name: "",
            phone: "",
            answers: [],
            score: 0,
          }
        );
      } catch (error) {
        navigate("/", { replace: true });
      }
    }
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    async function fetchQuizDetails() {
      if (!student.quiz_code) return;

      try {
        const resp = await getQuizByCode({
          share_code: student.quiz_code,
          analysis_mode: true,
        });
        setQuiz(
          resp.data || {
            id: 0,
            title: "",
            questions: [],
          }
        );
      } catch (error) {
        navigate("/", { replace: true });
      }
    }
    fetchQuizDetails();
  }, [student]);

  const handleQuestionClick = (questionIndex) => {
    setActiveQuestionIndex(
      activeQuestionIndex === questionIndex ? -1 : questionIndex
    );
  };

  const getQuestionByIndex = (index) => {
    return quiz.questions[index] || null;
  };

  const calculateTotalCorrect = () => {
    return student.answers?.filter((item) => item.is_correct).length || 0;
  };

  const calculateTotalWrong = () => {
    return student.answers?.filter((item) => !item.is_correct).length || 0;
  };

  const getQuestionText = (index) => {
    return quiz.questions[index]?.problem || "Question not available";
  };

  const getQuestionOptions = (index) => {
    return quiz.questions[index]?.options || [];
  };

  const getClasses = (optionIndex, questionIndex) => {
    const question = quiz.questions[questionIndex];
    const answer = student.answers.find((a) => a.question_id === question?.id);

    if (!question || !answer) return "bg-gray-100 border border-gray-200";

    const isCorrect = optionIndex === question.correct_answer;
    const isSelected = optionIndex === answer.selected_index;

    if (isCorrect && isSelected) return "bg-green-100 border border-green-200";
    if (isCorrect) return "bg-green-50 border border-green-100";
    if (isSelected) return "bg-red-100 border border-red-200";

    return "bg-gray-100 border border-gray-200";
  };

  const activeQuestion = getQuestionByIndex(activeQuestionIndex);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-22 px-4 py-6">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Link>

        {showScreenshotAlert && student.answers.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-blue-500 mr-3 text-xl"
                />
                <div>
                  <p className="font-medium text-blue-800">
                    Important: Take a screenshot of your results
                  </p>
                  <p className="text-blue-600">
                    This page won't be saved. Capture your score for future
                    reference.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScreenshotAlert(false)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-2xl text-indigo-600"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {student.name}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {student.phone}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Full Marks</span>
                <span className="text-2xl font-bold text-indigo-600 flex items-center">
                  <FontAwesomeIcon icon={faTrophy} className="mr-2 text-sm" />
                  {quiz.no_of_questions}
                </span>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Correct Answers</span>
                <span className="text-2xl font-bold text-green-600 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mr-2 text-sm"
                  />
                  {calculateTotalCorrect()}
                </span>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 flex flex-col items-center min-w-[100px]">
                <span className="text-gray-500 text-sm">Incorrect Answers</span>
                <span className="text-2xl font-bold text-red-600 flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="mr-2 text-sm"
                  />
                  {calculateTotalWrong()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Question Analysis
          </h2>

          {/* Question Buttons */}
          <div className="mb-6">
            <h3 className="text-gray-500 mb-3">
              Select a question to view details:
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.answers.length === 0 ? (
                <p className="text-red-500 font-bold">
                  Unattempted questions are not include in marks analysis
                </p>
              ) : (
                student.answers.map((answer, index) => {
                  return (
                    <button
                      key={answer.question_id}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center font-medium transition-colors ${
                        answer.is_correct
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      } ${
                        activeQuestionIndex === index
                          ? "ring-2 ring-indigo-500"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Question Detail */}
          {activeQuestion && (
            <div className="border-t pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start mb-4">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="text-indigo-600 mt-1 mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {getQuestionText(activeQuestionIndex)}
                    </h4>
                    <div className="mt-3 space-y-2">
                      {getQuestionOptions(activeQuestionIndex).map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded-md ${getClasses(
                              index,
                              activeQuestionIndex
                            )}`}
                          >
                            {option}
                            {index === activeQuestion?.correct_answer && (
                              <span className="ml-2 text-green-600">
                                ✓ Correct Answer
                              </span>
                            )}
                            {student.answers.find(
                              (a) => a.question_id === activeQuestion?.id
                            )?.selected_index === index &&
                              index !== activeQuestion?.correct_answer && (
                                <span className="ml-2 text-red-600">
                                  ✗ Your Answer
                                </span>
                              )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!activeQuestion && (
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 flex flex-col items-center">
              <FontAwesomeIcon
                icon={faEye}
                className="text-3xl text-gray-400 mb-2"
              />
              <p>Select a question number above to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalysisPage;
