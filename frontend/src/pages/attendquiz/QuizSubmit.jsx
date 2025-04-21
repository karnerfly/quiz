import { useRef } from "react";
import { usePDF } from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const QuizSubmit = ({
  showSubmitPopup,
  setShowSubmitPopup,
  confirmQuizSubmit,
  currentSection,
  studentDetails,
  setCurrentSection,
  setStudentDetails,
  setAnswers,
  setCurrentQuestionIndex,
  setTimeLeft,
  setIsQuizActive,
  setVisitedQuestions,
  setResultCountdown,
  setIsResultAvailable,
  quizData,
  resultCountdown,
  isResultAvailable,
  formatTime,
  answers,
}) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${studentDetails.name}_${quizData.title}_ScoreCard.pdf`,
    page: {
      margin: 20,
      format: "A4",
      orientation: "portrait",
    },
  });

  return (
    <>
      {/* Submit Confirmation Popup */}
      {showSubmitPopup && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Submission
            </h3>
            <p className="text-base text-gray-600 mb-2">
              Are you sure you want to submit your exam?
            </p>
            <p className="text-base text-red-600 mb-4 font-bold">
              You have {quizData.questions.length - Object.keys(answers).length}{" "}
              unanswered question(s). Do you still want to submit?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={confirmQuizSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowSubmitPopup(false)}
                className="px-4 py-2 bg-orange-500 text-gray-800 rounded-lg hover:bg-red-400 text-sm font-medium transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Section */}
      {currentSection === "submitted" && (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-4xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quiz Submitted Successfully!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Thank you, {studentDetails.name}, for taking the quiz. Your
              responses have been recorded.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentSection("hero");
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
                  setShowSubmitPopup(false);
                  setResultCountdown(30);
                  setIsResultAvailable(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
              >
                Back to Home
              </button>
              <button
                disabled={!isResultAvailable}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-100 ${
                  isResultAvailable
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isResultAvailable
                  ? "See Result"
                  : `Results in ${formatTime(resultCountdown)}`}
              </button>
              {isResultAvailable && (
                <button
                  onClick={() => toPDF()}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm font-medium transition-colors duration-200"
                >
                  Download Score Card
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hidden score card for PDF generation */}
      <div className="hidden">
        <div ref={targetRef}>
          <ScoreCard
            quizData={quizData}
            studentDetails={studentDetails}
            answers={answers}
          />
        </div>
      </div>
    </>
  );
};

export default QuizSubmit;
