import { useState, useEffect } from "react";
import HeroSection from "@src/components/HeroSection";
import Loader from "@src/components/ui/Loader";
import GoToTopButton from "@src/components/ui/GoToTopButton";

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
          <GoToTopButton />
        </>
      )}
    </div>
  );
};

export default Home;