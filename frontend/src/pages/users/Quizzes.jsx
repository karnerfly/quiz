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
  faShare
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
    },
    {
      id: 4,
      title: "Node.js Basics",
      participants: 19,
      lastModified: "1 week ago",
      status: "active",
      category: "Backend"
    }
  ];

  const quizFeatures = [
    {
      title: "Create Quiz",
      icon: faPlus,
      path: "create",
      description: "Design a new quiz from scratch",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Quiz History",
      icon: faHistory,
      path: "history",
      description: "View all your previous quizzes",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Quiz Analytics",
      icon: faChartBar,
      path: "analytics",
      description: "See detailed performance metrics",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Participants",
      icon: faUsers,
      path: "participants",
      description: "Manage quiz takers and results",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
          <FontAwesomeIcon icon={faBook} className="mr-3 text-indigo-500" />
          Quiz Management
        </h1>
        <Link 
          to="create"
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          New Quiz
        </Link>
      </div>

      {/* Quiz Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {quizFeatures.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="rounded-xl p-5 border dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 text-xl`}>
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {feature.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Quizzes Section */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-indigo-500" />
            Recent Quizzes
          </h2>
          <Link to="history" className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm">
            View All History →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b dark:border-gray-700">
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
                <tr key={quiz.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 font-medium">{quiz.title}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {quiz.category}
                    </span>
                  </td>
                  <td className="py-4">{quiz.participants}</td>
                  <td className="py-4 text-gray-500 dark:text-gray-400">{quiz.lastModified}</td>
                  <td className="py-4">
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
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400">
                        <FontAwesomeIcon icon={faPlay} />
                      </button>
                      <button className="p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="p-2 text-purple-600 hover:text-purple-800 dark:hover:text-purple-400">
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="rounded-xl p-5 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faBook} className="text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Quizzes</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl p-5 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faUsers} className="text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Participants</p>
              <h3 className="text-2xl font-bold">1,248</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl p-5 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faChartBar} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Score</p>
              <h3 className="text-2xl font-bold">78%</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizzesPage;