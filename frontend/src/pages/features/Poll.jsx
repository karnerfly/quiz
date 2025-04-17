import { useState, useEffect } from "react";
import Loader from "@src/components/ui/LandingLoader ";
import GoToTopButton from "@src/components/ui/GoToTopButton";

import HeroSection from "@src/components/HeroSection";
import AboutSection from "@src/components/AboutSection";
import FeatureSection from "@src/components/FeatureSection";
import HowItWorkSection from "@src/components/HowItWorkSection";
import FaqSection from "@src/components/FaqSection";

const Poll = () => {
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
            title="Poll maker - Create interactive polls"
            description="Mentimeter gives you the power to design a wide variety of interactive polls. Polling your audience can be the most effective way to increase engagement and make a presentation dynamic and memorable."
            buttonText="Create A Poll"
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

export default Poll;
