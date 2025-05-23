import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full py-20 px-6 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            About Us
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to create engaging, interactive quizzes that your audience will love.
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Image */}
          <div className="flex-1">
            <div className="bg-[#f9f9f9] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.ctfassets.net/rvt0uslu5yqp/4uJKnYZaVGYemyF3eVQheb/fef30c31f64ad458c5545593fb7d9262/Mentimeter_Web_Live-Polling_2022_03__2_.svg?&w=1080&q=75"
                alt="Team collaborating on quizzes"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
              Our Story
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Quiz Maker was born from a simple idea: learning and engagement should be fun, interactive, and accessible to everyone. 
              We believe that quizzes are more than just tests—they're powerful tools for connection and growth.
            </p>
            <p className="text-gray-700 text-lg mb-8">
              Since our founding in 2020, we've helped over 1 million educators, businesses, and quiz enthusiasts create memorable 
              experiences that inspire and challenge.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f9f9f9] p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-900">1M+</div>
                <div className="text-gray-600">Users</div>
              </div>
              <div className="bg-[#f9f9f9] p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-900">10M+</div>
                <div className="text-gray-600">Quizzes Created</div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-black text-white p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-3">Our Mission</h4>
              <p>
                To empower people to create engaging, interactive learning experiences that make knowledge sharing fun and effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;