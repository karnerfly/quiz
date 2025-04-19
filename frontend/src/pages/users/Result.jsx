import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faUser,
  faPhone,
  faChartBar,
  faSearch,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState } from "react";

const QuizResultsPage = () => {

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", mobile: "9876543210", score: 85 },
    { id: 2, name: "Jane Smith", mobile: "8765432109", score: 92 },
    { id: 3, name: "Robert Johnson", mobile: "7654321098", score: 78 },
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 4,
      name: `Student ${i + 4}`,
      mobile: `${6000000000 + i}`,
      score: Math.floor(Math.random() * 50) + 50
    }))
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 30;

  // Filter students 
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.mobile.includes(searchTerm)
  );

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 px-2 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="mr-3 text-indigo-500" />
            Quiz Results
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Showing results for <span className="font-medium text-indigo-600">JavaScript Fundamentals Quiz</span>
          </p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Results Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faUser} className="text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold">{students.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faTrophy} className="text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Average Score</p>
              <h3 className="text-2xl font-bold">
                {Math.round(students.reduce((acc, curr) => acc + curr.score, 0) / students.length)}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faChartBar} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Highest Score</p>
              <h3 className="text-2xl font-bold">
                {Math.max(...students.map(s => s.score))}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="rounded-xl shadow-lg overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="overflow-x-auto w-full">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Student Name
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="mr-2" />
                      Mobile Number
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                      Score
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.mobile}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`analysis/${student.id}`} 
                          className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium"
                        >
                          {student.score}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No students found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredStudents.length > studentsPerPage && (
          <div className="flex items-center justify-between p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} entries
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 rounded border dark:border-gray-600 ${
                      currentPage === pageNumber 
                        ? "bg-indigo-600 text-white border-indigo-600" 
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Additional Analytics Section */}
      {/* 
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl shadow-lg p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="font-bold mb-3 flex items-center">
            <FontAwesomeIcon icon={faChartBar} className="mr-2 text-indigo-500" />
            Score Distribution
          </h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end p-2">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => {
              const count = students.filter(s => 
                s.score >= percent && s.score < percent + 10
              ).length;
              const height = (count / students.length) * 100 || 1;
              
              return (
                <div key={percent} className="flex-1 flex flex-col items-center mx-1">
                  <div 
                    className="w-full bg-indigo-500 rounded-t-sm transition-all duration-300"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {percent}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="rounded-xl shadow-lg p-4 border dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="font-bold mb-3 flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="mr-2 text-indigo-500" />
            Top Performers
          </h3>
          <div className="space-y-3">
            {[...students]
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((student, index) => (
                <div key={student.id} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? "bg-yellow-100 text-yellow-600" :
                    index === 1 ? "bg-gray-200 text-gray-600" :
                    index === 2 ? "bg-orange-100 text-orange-600" :
                    "bg-indigo-100 text-indigo-600"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.mobile}</p>
                  </div>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">
                    {student.score}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      */}
    </main>
  );
};

export default QuizResultsPage;