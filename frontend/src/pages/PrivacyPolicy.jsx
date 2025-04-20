import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full py-16 px-6 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your data.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-[#f9f9f9] p-8 md:p-12 rounded-2xl shadow-lg">
          {/* Effective Date */}
          <div className="mb-10 text-center">
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
              <p className="font-medium">Last Updated: April 20, 2025</p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            {/* Introduction */}
            <div className="policy-section">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                Introduction
              </h3>
              <p className="text-gray-700 mb-4">
                Welcome to Quiznity. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="policy-section">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                Information We Collect
              </h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you register, use our services, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Contact information (name, email address, mobile number)</li>
                <li>Account credentials</li>
                <li>Content you create (quizzes, surveys, polls)</li>
                <li>Usage data and analytics</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="policy-section">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                How We Use Your Information
              </h3>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Service Delivery</h4>
                  <p className="text-gray-600">Provide and maintain our services</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Improvements</h4>
                  <p className="text-gray-600">Enhance user experience and features</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Communication</h4>
                  <p className="text-gray-600">Respond to inquiries and send updates</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Security</h4>
                  <p className="text-gray-600">Protect against fraudulent activity</p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="policy-section">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                Data Sharing & Disclosure
              </h3>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Service providers who assist our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in anonymized, aggregated form</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="policy-section">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                Your Privacy Rights
              </h3>
              <p className="text-gray-700 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Access & Correction</h4>
                    <p className="text-gray-700">View and update your account information</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Data Portability</h4>
                    <p className="text-gray-700">Request a copy of your data</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Deletion</h4>
                    <p className="text-gray-700">Request deletion of your account</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-2">Opt-Out</h4>
                    <p className="text-gray-700">Unsubscribe from marketing emails</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="policy-section text-center mt-12">
              <div className="inline-block bg-black text-white px-8 py-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Questions About Our Privacy Policy?</h3>
                <p className="mb-3">Contact our Team at:</p>
                <a href="mailto:privacy@quizmaker.com" className="text-indigo-300 hover:text-white transition-colors">
                  privacy@quiznity.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;