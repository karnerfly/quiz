import { useState, useEffect } from "react";
import Loader from "@src/components/ui/LandingLoader ";
import GoToTopButton from "@src/components/ui/GoToTopButton";

import HeroSection from "@src/components/HeroSection";
import AboutSection from "@src/components/AboutSection";
import FeatureSection from "@src/components/FeatureSection";
import HowItWorkSection from "@src/components/HowItWorkSection";
import FaqSection from "@src/components/FaqSection";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Show Loader while isLoading is true */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Hero Section */}

          <HeroSection
            title="Quiz Maker: Create a quiz to challenge your audience"
            description="Make fun interactive quizzes to test your colleagues’ knowledge, run a quiz night with friends, or help students study."
            buttonText="Create A Quiz"
            buttonLink="/signup"
            imageUrl="https://images.ctfassets.net/rvt0uslu5yqp/6047gQPpJsgcyzjf9wAXqM/db81b77651b3c026e0c998457757afe1/Mentimeter_VisualAssets_Web_Survey_2023_01__1_.png?fm=webp&w=1920&q=75"
            imageAlt="Custom quiz interface"
          />
          <AboutSection />
          <FeatureSection />
          <HowItWorkSection />
          <FaqSection />

          <GoToTopButton />
        </>
      )}
    </div>
  );
};

export default Quiz;
