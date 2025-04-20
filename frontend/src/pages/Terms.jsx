import React from "react";

const TermsOfService = () => {
  return (
    <section className="w-full py-20 px-6 md:px-24 bg-[#f7f8fa]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Terms of Service
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "1. Acceptance of Terms",
              description:
                "By accessing or using our Quiznity platform, you agree to be bound by these Terms. If you disagree with any part, you may not access our services.",
              icon: "📜",
            },
            {
              title: "2. User Responsibilities",
              description:
                "You agree to use the platform ethically and avoid posting harmful, plagiarized, or inappropriate content in any quizzes or interactions.",
              icon: "🧑‍💻",
            },
            {
              title: "3. Intellectual Property",
              description:
                "All content on this site (excluding user-created quizzes) is the intellectual property of Quiznity. Unauthorized use is prohibited.",
              icon: "💡",
            },
            {
              title: "4. Account Security",
              description:
                "You are responsible for maintaining the confidentiality of your account. Notify us immediately if you suspect unauthorized access.",
              icon: "🔐",
            },
            {
              title: "5. Termination",
              description:
                "We reserve the right to suspend or terminate access to our services for any user who violates these Terms or engages in malicious activity.",
              icon: "⚠️",
            },
            {
              title: "6. Changes to Terms",
              description:
                "Terms may be updated occasionally. Continued use of the platform means you accept the revised Terms.",
              icon: "🔄",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-indigo-600"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 text-lg">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700">
            If you have any questions or concerns about our Terms of Service, feel free to contact us at{" "}
            <a href="mailto:support@example.com" className="text-indigo-600 font-semibold hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
