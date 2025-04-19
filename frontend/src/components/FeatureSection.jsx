import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Easy Quiz Creation",
      description: "Create stunning quizzes in minutes with our intuitive drag-and-drop interface.",
      image: "/Features quiz.webp",
      alt: "Easy quiz creation interface"
    },
    {
      title: "Create Poll",
      description: "Choose from multiple choice, true/false, open-ended, and more to keep your quizzes engaging.",
      image: "/Features Poll.svg",
      alt: "Multiple question types"
    },
    {
      title: "Create Survey",
      description: "Get instant insights into participant responses with our comprehensive survey creation service.",
      image: "/Features Survey.webp",
      alt: "Analytics dashboard"
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className=" mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to create engaging, interactive quizzes that your audience will love.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-700 mb-5">
                  {feature.description}
                </p>
                <button className="flex items-center text-black font-semibold group-hover:text-black transition-colors">
                  Explore now
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:scale-105 transition">
            Start Creating Your Quiz Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;