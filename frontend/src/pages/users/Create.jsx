import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlus,
  faTrash,
  faSave,
  faArrowRight,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState } from "react";

const CreateQuizPage = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    subject: "",
    questionCount: "",
    duration: "30",
    hasNegativeMarks: false
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: [{ id: 1, text: "" }],
      correctAnswer: ""
    }
  ]);

  const durationOptions = ["30", "60", "90", "120"];

  const handleQuizDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: "",
        options: [{ id: 1, text: "" }],
        correctAnswer: ""
      }
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: q.options.length + 1, text: "" }]
            }
          : q
      )
    );
  };

  const removeOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId),
              correctAnswer:
                q.correctAnswer === String.fromCharCode(64 + optionId) ? "" : q.correctAnswer
            }
          : q
      )
    );
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text: value } : o
              )
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionId, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, correctAnswer: value } : q))
    );
  };

  return (
    <main className="px-4 py-6">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FontAwesomeIcon icon={faBook} className="text-indigo-600 mr-2" />
            Create Quiz
          </h1>
        </div>
        <Link
          to="/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          Go Back
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {activeSection === "details" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Quiz Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={quizDetails.title}
                onChange={handleQuizDetailChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={quizDetails.subject}
                onChange={handleQuizDetailChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="questionCount"
                placeholder="Number of Questions"
                value={quizDetails.questionCount}
                onChange={handleQuizDetailChange}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="duration"
                value={quizDetails.duration}
                onChange={handleQuizDetailChange}
                className="w-full border px-3 py-2 rounded"
              >
                {durationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} minutes
                  </option>
                ))}
              </select>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasNegativeMarks"
                  checked={quizDetails.hasNegativeMarks}
                  onChange={handleQuizDetailChange}
                  className="mr-2"
                />
                Enable Negative Marking
              </label>
              <button
                onClick={() => setActiveSection("questions")}
                disabled={
                  !quizDetails.title ||
                  !quizDetails.subject ||
                  !quizDetails.questionCount
                }
                className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                Save & Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeSection === "questions" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Questions</h2>
              <button
                onClick={addQuestion}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Question
              </button>
            </div>
            {questions.map((q, qIndex) => (
              <div key={q.id} className="border p-3 rounded mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(q.id)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Question text"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(q.id, "text", e.target.value)}
                  className="w-full border mt-2 px-3 py-1 rounded"
                />
                <div className="mt-3">
                  <label className="font-medium mb-1 block">Options</label>
                  {q.options.map((opt, optIndex) => (
                    <div key={opt.id} className="flex items-center mb-2">
                      <span className="w-6">{String.fromCharCode(65 + optIndex)}.</span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleOptionChange(q.id, opt.id, e.target.value)}
                        className="flex-1 border px-2 py-1 rounded mr-2"
                      />
                      {q.options.length > 1 && (
                        <button
                          onClick={() => removeOption(q.id, opt.id)}
                          className="text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(q.id)}
                    className="text-indigo-600 mt-1 text-sm"
                  >
                    + Add Option
                  </button>
                </div>
                <div className="mt-3">
                  <label className="font-medium block mb-1">Correct Answer</label>
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(q.id, e.target.value)}
                    className="w-full border px-3 py-1 rounded"
                  >
                    <option value="">Select Correct Option</option>
                    {q.options.map((_, idx) => (
                      <option key={idx} value={String.fromCharCode(65 + idx)}>
                        {String.fromCharCode(65 + idx)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CreateQuizPage;
