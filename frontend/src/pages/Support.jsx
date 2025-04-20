import React from "react";

const Support = () => {
  return (
    <section className="w-full py-20 px-6 md:px-24 bg-[#f7f8fa]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Support Center
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We’re here to help! Find answers to common questions or reach out for personalized support.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Account Help",
              description: "Issues with login, password reset, or profile settings? We’ve got you covered.",
              icon: "👤",
            },
            {
              title: "Quiz Builder",
              description: "Need help creating, editing, or publishing quizzes? Here's your guide.",
              icon: "📝",
            },
            {
              title: "Billing & Plans",
              description: "Learn about plans, subscriptions, and payment-related support.",
              icon: "💳",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-indigo-600"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                question: "How can I reset my password?",
                answer:
                  "Go to the login page, click on 'Forgot Password', and follow the email instructions to reset it.",
              },
              {
                question: "Can I edit a quiz after publishing it?",
                answer:
                  "Yes! Go to your dashboard, click on the quiz, and choose 'Edit' to make any changes.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer refunds within 7 days of purchase if you’re not satisfied. Contact support for assistance.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Call-to-Action */}
        <div className="bg-black text-white p-10 rounded-2xl text-center">
          <h4 className="text-2xl md:text-3xl font-semibold mb-4">Still Need Help?</h4>
          <p className="text-lg mb-6">
            Reach out to our support team and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full font-semibold text-white"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default Support;
