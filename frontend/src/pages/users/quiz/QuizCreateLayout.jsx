import React from "react";
import { useSearchParams } from "react-router";
import BasicDataInputPage from "./BasicDataInputPage";
import QuestionInputPage from "./QuestionInputPage";
import QuestionPreviewPage from "./QuestionPreviewPage";

const QuizCreateLayout = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section") || "dts"; // Default to 'dts'

  // Validate section
  const validSections = ["dts", "qsi", "prvw"];
  const currentSection = validSections.includes(section) ? section : "dts";

  // Render the appropriate component
  switch (currentSection) {
    case "dts":
      return <BasicDataInputPage />;
    case "qsi":
      return <QuestionInputPage />;
    case "prvw":
      return <QuestionPreviewPage />;
    default:
      return <BasicDataInputPage />;
  }
};

export default QuizCreateLayout;
