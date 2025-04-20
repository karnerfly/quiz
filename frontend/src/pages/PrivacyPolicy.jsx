import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full py-20 px-6 md:px-24 bg-[#f7f8fa]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your trust is important to us. Here's how we handle your data with care and transparency.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="space-y-10 text-gray-700 text-lg leading-relaxed">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
              <p>
                We collect basic information such as name, email address, and user interactions on our platform. This helps us provide better services and personalize your experience.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h3>
              <p>
                Your data is used to improve functionality, offer support, and provide relevant updates. We never sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies & Tracking</h3>
              <p>
                We use cookies to analyze usage and improve user experience. You can control cookies through your browser settings at any time.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h3>
              <p>
                We implement strict measures to protect your data using encryption, access controls, and regular security audits.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your data. Reach out to us anytime if you need assistance managing your information.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to This Policy</h3>
              <p>
                We may update this policy from time to time. We’ll notify you of any major changes and always keep the latest version available here.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700">
            Still have questions? Contact us at{" "}
            <a href="mailto:support@example.com" className="text-indigo-600 font-semibold hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
