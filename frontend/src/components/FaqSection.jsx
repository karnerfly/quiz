import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create a quiz?",
      answer: "Simply sign up, click 'Create Quiz', and use our intuitive editor to add questions, set time limits, and customize the design. No technical skills required!"
    },
    {
      question: "Can I brand my quizzes with my logo and colors?",
      answer: "Absolutely! Our premium plans allow full customization including your logo, brand colors, and custom backgrounds to match your organization's identity."
    },
    {
      question: "What types of questions can I include?",
      answer: "We support multiple choice, true/false, short answer, matching, and more. You can also add images and videos to make your quizzes more engaging."
    },
    {
      question: "How do participants access my quizzes?",
      answer: "You can share a direct link, embed the quiz on your website, or even share via social media. Participants can access from any device without needing to login."
    },
    {
      question: "Can I see how participants performed?",
      answer: "Yes! Our analytics dashboard shows individual and aggregate results, including time taken per question, most missed questions, and score distributions."
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions about our platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className={`w-full px-6 py-5 text-left flex justify-between items-center ${activeIndex === index ? 'bg-gray-50' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg md:text-xl font-medium text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 pb-5' : 'max-h-0'}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-black font-semibold hover:text-gray-700 transition-colors"
          >
            Contact our support team
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;