import React from "react";

const SiteMap = () => {
  return (
    <section className="w-full py-20 px-6 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Explore Our Website
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Navigate through all the sections of our interactive platform with ease.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Sitemap Container */}
        <div className="bg-[#f9f9f9] p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Main Pages Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-indigo-100 pb-2">
                Main Pages
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Home
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      About Us
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/features" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Features
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Login
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/auth/signup" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Signup
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Features Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-indigo-100 pb-2">
                Features
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/features/quiz" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Quiz
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/features/poll" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Poll
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/features/survey" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Survey
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Support & Legal Column (Unchanged) */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-indigo-100 pb-2">
                Support & Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/contact" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Contact Us
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/faq" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      FAQs
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/privacy_policy" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Privacy Policy
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/terms" className="flex items-center group">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    <span className="text-lg text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Terms of Service
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Visual Element */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-1">Can't find what you need?</h4>
              <p className="text-indigo-100">Try our search feature or contact our support team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteMap;