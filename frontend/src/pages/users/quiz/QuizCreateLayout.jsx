import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import BasicDataInputPage from "./BasicDataInputPage";
import QuestionInputPage from "./QuestionInputPage";
import { QuestionPreviewPage } from "./QuestionPreviewPage";

const QuizCreateLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [section, setSection] = useState("");

  useEffect(() => {
    let section = searchParams.get("section");
    if (section !== "dts" && section !== "qsi" && section !== "prvw")
      return navigate("?section=dts", { relative: true });
    setSection(section);
  }, [section]);

  if (section === "dts") {
    return <BasicDataInputPage />;
  } else if (section === "qsi") {
    return <QuestionInputPage />;
  } else {
    return <QuestionPreviewPage />;
  }
};

export default QuizCreateLayout;
