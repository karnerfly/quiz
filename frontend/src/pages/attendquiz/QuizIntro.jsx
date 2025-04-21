import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const QuizIntro = ({ 
  quizData, 
  currentSection,
  setCurrentSection, 
  studentDetails, 
  setStudentDetails 
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (studentDetails.name && studentDetails.mobile) {
      setCurrentSection("welcome");
    } else {
      alert("Please fill in Name and Mobile Number.");
    }
  };

  const startQuiz = () => {
    setCurrentSection("quiz");
  };

  return (
    <>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">District*</label>
          <select
            name="district"
            value={studentDetails.district}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            required
          >
            <option value="">Select your district</option>
            <option value="Alipurduar">Alipurduar</option>
            <option value="Bankura">Bankura</option>
            <option value="Birbhum">Birbhum</option>
            <option value="Cooch Behar">Cooch Behar</option>
            <option value="Dakshin Dinajpur">Dakshin Dinajpur</option>
            <option value="Darjeeling">Darjeeling</option>
            <option value="Hooghly">Hooghly</option>
            <option value="Howrah">Howrah</option>
            <option value="Jalpaiguri">Jalpaiguri</option>
            <option value="Jhargram">Jhargram</option>
            <option value="Kalimpong">Kalimpong</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Malda">Malda</option>
            <option value="Murshidabad">Murshidabad</option>
            <option value="Nadia">Nadia</option>
            <option value="North 24 Parganas">North 24 Parganas</option>
            <option value="Paschim Bardhaman">Paschim Bardhaman</option>
            <option value="Paschim Medinipur">Paschim Medinipur</option>
            <option value="Purba Bardhaman">Purba Bardhaman</option>
            <option value="Purba Medinipur">Purba Medinipur</option>
            <option value="Purulia">Purulia</option>
            <option value="South 24 Parganas">South 24 Parganas</option>
            <option value="Uttar Dinajpur">Uttar Dinajpur</option>
          </select>
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
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome, {studentDetails.name}!
              </h2>
              <p className="text-sm opacity-90">
                Get ready to test your knowledge
              </p>
            </div>
            
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
    </>
  );
};

export default QuizIntro;