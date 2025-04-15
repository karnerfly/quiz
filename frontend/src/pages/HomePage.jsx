import React from "react";
import Button from "@src/components/ui/Button";

const HomePage = () => {
  return (
    <div className="container px-10 py-5 bg-amber-300 flex items-center justify-between">
      <h2 className="font-bold text-xl">Quiz</h2>
      <Button>Click Me</Button>
    </div>
  );
};

export default HomePage;
