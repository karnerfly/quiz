import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "@src/components/dashboard/DbHeader";
import Sidebar from "@src/components/dashboard/DbSidebar";
import apiClient from "@src/api/client";
import { getCurrentTeacherDetails } from "@src/api";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    getCurrentTeacherDetails()
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div
      className={
        "min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      }
    >
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 flex">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
