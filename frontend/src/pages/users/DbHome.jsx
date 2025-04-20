import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartLine,
  faPoll,
  faClipboardList,
  faUsers,
  faTrophy,
  faCalendarAlt,
  faBell,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const DashboardHome = () => {
  // Sample data
  const stats = [
    { title: "Total Quizzes", value: 42, icon: faBook, change: "+12%", color: "indigo" },
    { title: "Active Users", value: "1.2K", icon: faUsers, change: "+25%", color: "purple" },
    { title: "Avg. Score", value: "78%", icon: faTrophy, change: "-2%", color: "green" },
    { title: "Pending Reviews", value: 8, icon: faBell, change: "+3", color: "red" }
  ];

  const features = [
    { title: "Quizzes", icon: faBook, path: "quizzes", color: "bg-indigo-100 text-indigo-600" },
    { title: "Polls", icon: faPoll, path: "polls", color: "bg-purple-100 text-purple-600" },
    { title: "Surveys", icon: faClipboardList, path: "surveys", color: "bg-blue-100 text-blue-600" },
    { title: "Analytics", icon: faChartLine, path: "analytics", color: "bg-green-100 text-green-600" }
  ];

  const recentActivity = [
    { 
      type: "New Quiz", 
      title: "JavaScript Fundamentals", 
      time: "10 min ago", 
      icon: faBook,
      iconColor: "text-indigo-500 bg-indigo-50"
    },
    { 
      type: "Submission", 
      title: "User completed 'React Basics'", 
      time: "25 min ago", 
      icon: faTrophy,
      iconColor: "text-green-500 bg-green-50"
    },
    { 
      type: "New Poll", 
      title: "Favorite Framework Survey", 
      time: "1 hour ago", 
      icon: faPoll,
      iconColor: "text-purple-500 bg-purple-50"
    }
  ];

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 overflow-x-hidden">
      {/* Welcome Section */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 opacity-10 rounded-full"></div>
        <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-purple-500 opacity-10 rounded-full"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center">
            Welcome back, <span className="text-indigo-600 ml-2">Admin!</span>
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl">
            Manage your quizzes, polls and surveys. You have <span className="font-medium text-indigo-600">3 new submissions</span> and <span className="font-medium text-purple-600">1 survey</span> that needs your attention.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-6">
            <Link 
              to="quizzes/create" 
              className="px-4 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Create New Quiz
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
            </Link>
            <Link 
              to="quizzes/result" 
              className="px-4 py-2 sm:px-5 sm:py-3 bg-white dark:bg-gray-700 border dark:border-gray-600 text-gray-700 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faPoll} className="mr-2 text-purple-500" />
              See Quiz Result
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-6">
        {features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.path}
            className="rounded-xl p-4 sm:p-5 border dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3 sm:mb-4 text-lg sm:text-xl`}>
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              Manage {feature.title.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="rounded-xl p-4 sm:p-5 border dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">{stat.title}</p>
                <h3 className={`text-2xl sm:text-3xl font-bold mt-1 bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <FontAwesomeIcon icon={stat.icon} className={`text-${stat.color}-600`} />
              </div>
            </div>
            <div className={`mt-3 sm:mt-4 flex items-center text-xs font-medium text-${stat.change.startsWith('+') ? 'green' : 'red'}-500`}>
              {stat.change}
              {stat.change.includes('%') ? ' from last week' : ' new'}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <h3 className="text-lg sm:text-xl font-bold">Recent Activity</h3>
            <Link to="activity" className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400">
              View All
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <Link 
                key={index} 
                to="#"
                className="flex items-start p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${activity.iconColor} flex items-center justify-center mt-1 mr-3`}>
                  <FontAwesomeIcon icon={activity.icon} className="text-xs sm:text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium dark:text-gray-200 text-sm sm:text-base truncate">{activity.type}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">{activity.title}</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                  {activity.time}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <Link 
              to="quizzes/create" 
              className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-indigo-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-indigo-100 dark:bg-gray-600 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faBook} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>New Quiz</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
            </Link>
            
            <Link 
              to="templates" 
              className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-purple-100 dark:bg-gray-600 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faClipboardList} className="text-purple-600 dark:text-purple-400" />
                </div>
                <span>Use Template</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
            </Link>
            
            <Link 
              to="analytics" 
              className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-gray-600 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span>View Analytics</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;