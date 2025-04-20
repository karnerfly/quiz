import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { checkHealth } from "@src/api";

const Error500Page = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchHealthOfApi = useCallback(async () => {
    try {
      const ok = await checkHealth();
      if (ok) {
        let from = searchParams.get("from");
        if (
          !from ||
          from.startsWith("http://") ||
          from.startsWith("https://")
        ) {
          from = "/";
        }
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHealthOfApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          500 - Server Error
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Oops! Something went wrong on our end. We're working to fix it.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Try refreshing the page or come back later. If the problem
                persists, please contact our support team.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Refresh Page
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        <p>
          Error reference: #500-
          {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default Error500Page;
