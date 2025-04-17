import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

const DbSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", icon: HomeIcon, href: "#", current: true },
    { name: "Users", icon: UsersIcon, href: "#", current: false },
    { name: "Quizzes", icon: DocumentTextIcon, href: "#", current: false },
    { name: "Analytics", icon: ChartBarIcon, href: "#", current: false },
    { name: "Settings", icon: CogIcon, href: "#", current: false },
    { name: "Help", icon: QuestionMarkCircleIcon, href: "#", current: false },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              QuizMaker Pro
            </h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                <item.icon className="flex-shrink-0 h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href="#"
              className="flex items-center space-x-3 group"
            >
              <div className="relative h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
                  John Doe
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                  View profile
                </p>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DbSidebar;