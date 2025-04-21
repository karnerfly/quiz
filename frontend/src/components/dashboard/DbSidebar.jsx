import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faTimes,
  faBook,
  faBookmark,
  faChartBar,
  faPlus,
  faList,
  faCheckCircle,
  faPoll,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@src/context/User";
import { logout } from "@src/api";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const sidebarRef = useRef(null);
  const { user } = useUser();
  const navigate = useNavigate();

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("error while logout");
      });
  };

  const featureMenus = {
    quiz: [
      { name: "All Quizzes", icon: faList, path: "quizzes" },
      { name: "Create Quiz", icon: faPlus, path: "quizzes/create?section=dts" },
      { name: "Quiz Results", icon: faCheckCircle, path: "quizzes/result" },
    ],
    poll: [
      { name: "All Polls", icon: faPoll, path: "polls" },
      { name: "Create Poll", icon: faPlus, path: "polls/create" },
      { name: "Poll Analytics", icon: faChartBar, path: "polls/analytics" },
    ],
    survey: [
      { name: "All Surveys", icon: faClipboardList, path: "surveys" },
      { name: "Create Survey", icon: faPlus, path: "surveys/create" },
      { name: "Survey Responses", icon: faChartBar, path: "surveys/responses" },
    ],
  };

  return (
    <aside
      ref={sidebarRef}
      className={`w-64 rounded-xl shadow-lg p-6 transform transition-all duration-300 fixed md:relative z-40 h-screen md:h-auto overflow-y-auto 
        ${
          isSidebarOpen ? "left-0" : "-left-64"
        } md:left-0 md:block dark:bg-gray-800 border dark:border-gray-700 bg-white`}
    >
      {/* Close Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 p-2 rounded-full focus:outline-none text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faTimes} className="text-xl" />
      </button>

      {/* User Info */}
      <div className="flex flex-col items-center mb-8 mt-2">
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1745129082~exp=1745132682~hmac=b46e69eed84b545abad517e6e3fd7d9413808f22f1a45f2d3a84b32074008adc&w=740"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-indigo-500 mb-4 object-cover"
        />
        <h3 className="font-bold text-xl dark:text-white text-gray-800">
          {user?.name}
        </h3>
        <p className="text-gray-500 text-sm">{user?.phone}</p>
      </div>

      {/* Sidebar Links */}
      <nav className="space-y-1">
        <Link
          to=""
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3 text-indigo-500" />
          Home
        </Link>

        {/* Quiz Section */}
        <div>
          <button
            onClick={() =>
              setActiveFeature(activeFeature === "quiz" ? null : "quiz")
            }
            className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faBook} className="mr-3 text-indigo-500" />
            Quizzes
            <span
              className={`ml-auto transition-transform duration-200 ${
                activeFeature === "quiz" ? "rotate-90" : ""
              }`}
            >
              ›
            </span>
          </button>

          {activeFeature === "quiz" && (
            <div className="ml-8 mt-1 space-y-1">
              {featureMenus.quiz.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center py-2 px-3 rounded-lg text-sm dark:text-gray-300 hover:dark:bg-gray-700 text-gray-600 hover:bg-indigo-50 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-3 text-indigo-400"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Poll Section */}
        <div>
          <button
            onClick={() =>
              setActiveFeature(activeFeature === "poll" ? null : "poll")
            }
            className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          >
            <FontAwesomeIcon icon={faPoll} className="mr-3 text-indigo-500" />
            Polls
            <span
              className={`ml-auto transition-transform duration-200 ${
                activeFeature === "poll" ? "rotate-90" : ""
              }`}
            >
              ›
            </span>
          </button>

          {activeFeature === "poll" && (
            <div className="ml-8 mt-1 space-y-1">
              {featureMenus.poll.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center py-2 px-3 rounded-lg text-sm dark:text-gray-300 hover:dark:bg-gray-700 text-gray-600 hover:bg-indigo-50 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-3 text-indigo-400"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Survey Section */}
        <div>
          <button
            onClick={() =>
              setActiveFeature(activeFeature === "survey" ? null : "survey")
            }
            className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          >
            <FontAwesomeIcon
              icon={faClipboardList}
              className="mr-3 text-indigo-500"
            />
            Surveys
            <span
              className={`ml-auto transition-transform duration-200 ${
                activeFeature === "survey" ? "rotate-90" : ""
              }`}
            >
              ›
            </span>
          </button>

          {activeFeature === "survey" && (
            <div className="ml-8 mt-1 space-y-1">
              {featureMenus.survey.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center py-2 px-3 rounded-lg text-sm dark:text-gray-300 hover:dark:bg-gray-700 text-gray-600 hover:bg-indigo-50 transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-3 text-indigo-400"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <Link
          to="profile"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faUser} className="mr-3 text-indigo-500" />
          Profile
        </Link>

        {/* My Bookmarks 
        <Link
          to="bookmarks"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faBookmark} className="mr-3 text-indigo-500" />
          My Bookmarks
        </Link>
        */}

        {/* Settings */}
        <Link
          to="settings"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faCog} className="mr-3 text-indigo-500" />
          Settings
        </Link>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-3 text-indigo-500"
            />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
