import { useState, useEffect } from "react";
import LandingLoader from "@src/components/ui/LandingLoader";
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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 relative">
      {/* Full-screen black overlay with loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <LandingLoader />
        </div>
      )}

      {/* Main content - hidden while loading */}
      {!isLoading && (
        <>
          <HeroSection
            title="What will you ask your audience?"
            description="Turn presentations into conversations with interactive polls, quiz, surveys and many more that engage meetings and classrooms."
            buttonText="Check Features"
            buttonLink="/features"
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

export default Home;
