import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const QuizPage = ({
  quizData,
  currentQuestionIndex,
  answers,
  visitedQuestions,
  timeLeft,
  handleAnswerSelect,
  handleNextQuestion,
  handlePreviousQuestion,
  jumpToQuestion,
  handleQuizSubmit,
  getQuizStats,
  getQuestionStatusColor,
  formatTime,
}) => {
  return (
    <section className="min-h-screen flex flex-col pt-22 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white shadow-md rounded-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex items-center justify-center">
            <div className="flex items-center bg-blue-800 px-4 py-2 rounded-full">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span className="font-medium text-lg">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
              <span>Progress: {getQuizStats().answeredPercentage}%</span>
              <span>
                {getQuizStats().answeredQuestions}/
                {getQuizStats().totalQuestions} Questions
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${getQuizStats().answeredPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-center mt-3 space-x-6 text-xs">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Answered ({getQuizStats().answeredQuestions})</span>
              </div>
              {/* <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-400 rounded-full mr-1"></span>
                <span>Visited ({getQuizStats().visitedNotAnswered})</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                <span>Not Visited ({getQuizStats().notVisited})</span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">
              {currentQuestionIndex + 1}
            </span>
            <span>{quizData.questions[currentQuestionIndex]?.problem}</span>
          </h2>

          <div className="space-y-3">
            {quizData.questions[currentQuestionIndex]?.options.map(
              (option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    answers[quizData.questions[currentQuestionIndex].id] ===
                    option
                      ? "bg-blue-50 border-blue-300"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${quizData.questions[currentQuestionIndex].id}`}
                    value={option}
                    checked={
                      answers[quizData.questions[currentQuestionIndex].id] ===
                      index
                    }
                    onChange={() =>
                      handleAnswerSelect(
                        quizData.questions[currentQuestionIndex].id,
                        index
                      )
                    }
                    className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-800">{option}</span>
                </label>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            {currentQuestionIndex < quizData.no_of_questions - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleQuizSubmit}
                className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Question Navigation
          </h3>

          <div className="flex flex-wrap gap-2 justify-center">
            {quizData.questions?.map((question, index) => (
              <button
                key={question.id}
                onClick={() => jumpToQuestion(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${getQuestionStatusColor(
                  question.id
                )} ${
                  currentQuestionIndex === index ? "ring-2 ring-blue-300" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-600">
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default QuizPage;
