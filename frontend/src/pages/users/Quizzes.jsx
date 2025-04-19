import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlus,
  faHistory,
  faChartBar,
  faUsers,
  faClock,
  faEdit,
  faTrash,
  faPlay,
  faShare,
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const QuizzesPage = () => {
  // Sample quiz data
  const recentQuizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      participants: 42,
      lastModified: "2 hours ago",
      status: "active",
      category: "Programming"
    },
    {
      id: 2,
      title: "React Advanced Concepts",
      participants: 28,
      lastModified: "1 day ago",
      status: "draft",
      category: "Web Development"
    },
    {
      id: 3,
      title: "CSS Mastery Quiz",
      participants: 35,
      lastModified: "3 days ago",
      status: "completed",
      category: "Design"
    }
  ];

  const quizFeatures = [
    {
      title: "Create Quiz",
      icon: faPlus,
      path: "create",
      description: "Design a new quiz",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Quiz Result",
      icon: faHistory,
      path: "result",
      description: "View past quizzes",
      color: "bg-purple-100 text-purple-600"
    },
    /*
    {
      title: "Analytics",
      icon: faChartBar,
      path: "analytics",
      description: "Performance metrics",
      color: "bg-blue-100 text-blue-600"
    }, 
    {
      title: "Participants",
      icon: faUsers,
      path: "participants",
      description: "Manage quiz takers",
      color: "bg-green-100 text-green-600"
    }
      */
  ];

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 px-2 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
          <FontAwesomeIcon icon={faBook} className="mr-2 sm:mr-3 text-indigo-500" />
          Quiz Management
        </h1>
        <Link 
          to="create"
          className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1 sm:mr-2" />
          New Quiz
        </Link>
      </div>

      {/* Quiz Features Cards - Stack on mobile */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {quizFeatures.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="rounded-lg sm:rounded-xl p-3 sm:p-4 border dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3 text-lg sm:text-xl`}>
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-1">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Quizzes Section - Cards on mobile */}
      <div className="rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-lg sm:text-xl font-bold flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-indigo-500" />
            Recent Quizzes
          </h2>
          <Link to="history" className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-xs sm:text-sm">
            View All History →
          </Link>
        </div>

        {/* Mobile View - Cards */}
        <div className="sm:hidden space-y-3">
          {recentQuizzes.map((quiz) => (
            <div key={quiz.id} className="border dark:border-gray-700 rounded-lg p-3 hover:shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{quiz.title}</h3>
                <div className="dropdown relative">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {quiz.category}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quiz.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : quiz.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                }`}>
                  {quiz.status}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{quiz.participants} participants</span>
                <span>{quiz.lastModified}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b dark:border-gray-700 text-sm md:text-base">
              <tr>
                <th className="pb-3 font-medium">Quiz Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Participants</th>
                <th className="pb-3 font-medium">Last Modified</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentQuizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm md:text-base">
                  <td className="py-3 font-medium">{quiz.title}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {quiz.category}
                    </span>
                  </td>
                  <td className="py-3">{quiz.participants}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">{quiz.lastModified}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      quiz.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : quiz.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button className="p-1 sm:p-2 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400">
                        <FontAwesomeIcon icon={faPlay} size="sm" />
                      </button>
                      <button className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                        <FontAwesomeIcon icon={faEdit} size="sm" />
                      </button>
                      <button className="p-1 sm:p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400">
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats - Stack on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faBook} className="text-indigo-600 dark:text-indigo-300" size="sm" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Total Quizzes</p>
              <h3 className="text-xl sm:text-2xl font-bold">24</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faUsers} className="text-green-600 dark:text-green-300" size="sm" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Participants</p>
              <h3 className="text-xl sm:text-2xl font-bold">1,248</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faChartBar} className="text-blue-600 dark:text-blue-300" size="sm" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Avg. Score</p>
              <h3 className="text-xl sm:text-2xl font-bold">78%</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizzesPage;