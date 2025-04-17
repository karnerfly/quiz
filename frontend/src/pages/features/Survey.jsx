import { useState, useEffect } from "react";
import Loader from "@src/components/ui/LandingLoader ";
import GoToTopButton from "@src/components/ui/GoToTopButton";

import HeroSection from "@src/components/HeroSection";
import AboutSection from "@src/components/AboutSection";
import FeatureSection from "@src/components/FeatureSection";
import HowItWorkSection from "@src/components/HowItWorkSection";
import FaqSection from "@src/components/FaqSection";

const Survey = () => {
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
            title="Interactive survey maker: Create surveys for free"
            description="Quickly and easily gather feedback from everyone in your audience with Mentimeter’s interactive survey maker. Use a variety of slide types to collect and visualize your data."
            buttonText="Create A Survey"
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

export default Survey;
