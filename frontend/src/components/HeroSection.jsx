import React from "react";
import PropTypes from "prop-types";

const HeroSection = ({
  title = "Quiz Maker: Create a quiz to challenge your audience",
  description = "Make fun interactive quizzes to test your colleagues' knowledge, run a quiz night with friends, or help students study.",
  buttonText = "Create a quiz",
  buttonLink = "#",
  imageUrl = "https://images.ctfassets.net/rvt0uslu5yqp/5Fkoz2vg8B856mMMmlKvDu/e92a19b31f3893aa4d55ebc3cb61fe51/Mentimeter_VisualAssets_Web_Survey_2023_03__1_.png?fm=webp&w=1920&q=75",
  imageAlt = "Quiz Maker Preview"
}) => {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 bg-[#f9f9f9] pt-20 md:pt-0">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left md:pl-12">
        <h1 className="text-5xl md:text-5xl font-semibold leading-tight text-gray-900 mb-6">
          {title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <p className="text-gray-700 text-xl md:text-2xl mb-10 max-w-xl mx-auto md:mx-0">
          {description}
        </p>
        <a
          href={buttonLink}
          className="inline-block bg-black text-white px-7 py-3 rounded-full text-base font-semibold shadow hover:scale-105 transition"
        >
          {buttonText}
        </a>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center">
        <img
          src={imageUrl}
          alt={imageAlt}
           className="max-w-full h-auto"
        />
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string
};

export default HeroSection;