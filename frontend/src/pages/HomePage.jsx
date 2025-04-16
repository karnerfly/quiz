import { useState, useEffect } from "react";
import Loader from "@src/components/ui/Loader";
import GoToTopButton from "@src/components/ui/GoToTopButton";

import HeroSection from "@src/components/HeroSection";
import AboutSection from "@src/components/AboutSection";
import FeatureSection from "@src/components/FeatureSection";
import HowItWorkSection from "@src/components/HowItWorkSection";
import FaqSection from "@src/components/FaqSection";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
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
          <HeroSection />
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

export default Home;