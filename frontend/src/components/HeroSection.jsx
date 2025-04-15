import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 bg-[#f9f9f9] pt-20 md:pt-0">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left md:pl-12">
        <h1 className="text-6xl md:text-7xl font-semibold leading-tight text-gray-900 mb-6">
          Quiz Maker: Create a <br />
          quiz to challenge your <br />
          audience
        </h1>
        <p className="text-gray-700 text-xl md:text-2xl mb-10 max-w-xl mx-auto md:mx-0">
          Make fun interactive quizzes to test your colleagues’ knowledge, run a quiz night with friends, or help students study.
        </p>
        <button className="bg-black text-white px-7 py-3 rounded-full text-base font-semibold shadow hover:scale-105 transition">
          Create a quiz
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center">
        <img
          src="/hero-preview.png"
          alt="Quiz Maker Preview"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
