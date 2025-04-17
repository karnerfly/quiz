import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Easy Quiz Creation",
      description: "Create stunning quizzes in minutes with our intuitive drag-and-drop interface.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/5Fkoz2vg8B856mMMmlKvDu/e92a19b31f3893aa4d55ebc3cb61fe51/Mentimeter_VisualAssets_Web_Survey_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Easy quiz creation interface"
    },
    {
      title: "Multiple Question Types",
      description: "Choose from multiple choice, true/false, open-ended, and more to keep your quizzes engaging.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/6wQ3h5iQjY8QlS4j5Xq5jR/5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a/Mentimeter_VisualAssets_Web_Quiz_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Multiple question types"
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights into participant responses with our comprehensive analytics dashboard.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/7x8X9y0z1A2B3C4D5E6F7G/8h9i0j1k2l3m4n5o6p7q8r/Mentimeter_VisualAssets_Web_Analytics_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Analytics dashboard"
    },
    {
      title: "Custom Branding",
      description: "Add your logo, colors, and themes to make quizzes uniquely yours.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/9s8t7u6v5w4x3y2z1a0b1c2d/3e4f5g6h7i8j9k0l1m2n3o4p/Mentimeter_VisualAssets_Web_Branding_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Custom branding options"
    },
    {
      title: "Collaboration Tools",
      description: "Work with your team in real-time to create the perfect quiz together.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/1a2b3c4d5e6f7g8h9i0j1k2l/3m4n5o6p7q8r9s0t1u2v3w4x/Mentimeter_VisualAssets_Web_Collaboration_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Collaboration features"
    },
    {
      title: "Mobile Friendly",
      description: "Participants can join from any device, anywhere with our responsive design.",
      image: "https://images.ctfassets.net/rvt0uslu5yqp/5y6z7a8b9c0d1e2f3g4h5i6j/7k8l9m0n1o2p3q4r5s6t7u8v/Mentimeter_VisualAssets_Web_Mobile_2023_03__1_.png?fm=webp&w=800&q=75",
      alt: "Mobile responsive design"
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