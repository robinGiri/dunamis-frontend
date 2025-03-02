import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../public/components/Navbar";
import Footer from "../../public/components/Footer";
import toast from "react-hot-toast";

export default function QuizTake() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  // Store student's answers: { [questionId]: selectedOption }
  const [answers, setAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/category");
      // Assuming API returns { success: true, data: [ { _id, name, description, ... }, ... ] }
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category change from dropdown
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Start quiz: fetch questions based on the selected category
  const startQuiz = async () => {
    try {
      const url = category
        ? `http://localhost:3000/api/v1/quiz/questions?category=${encodeURIComponent(category)}`
        : "http://localhost:3000/api/v1/quiz/questions";
      const res = await axios.get(url);
      setQuestions(res.data.data);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching quiz questions", error);
      toast.error("Failed to fetch quiz questions");
    }
  };

  // Handle option selection for each question
  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Submit quiz answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create submissions array from answers object
    const submissions = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    try {
      const res = await axios.post("http://localhost:3000/api/v1/quiz/submit", submissions);
      setResult(res.data);
    } catch (error) {
      console.error("Error submitting quiz", error);
      toast.error("Failed to submit quiz");
    }
  };

  return (
    <>
      {/* Navbar is always rendered at the top */}
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Take Quiz</h1>
          {!quizStarted ? (
            <div className="flex flex-col items-center">
              <label className="label mb-4">
                <span className="label-text">Select Quiz Category</span>
              </label>
              <select
                className="select select-bordered w-64 mb-6"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={startQuiz}>
                Start Quiz
              </button>
            </div>
          ) : result ? (
            <div className="card bg-base-100 shadow-xl p-6 text-center">
              <h2 className="text-2xl font-bold">Quiz Result</h2>
              <p className="mt-2">
                You scored {result.score} out of {result.totalQuestions}.
              </p>
              <p className="mt-1">{result.mark}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {questions.map((question, idx) => (
                <div
                  key={question._id}
                  className="card bg-base-100 shadow mb-4 p-4"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {idx + 1}. {question.questionText}
                  </h3>
                  <div className="form-control">
                    {question.options.map((option, index) => (
                      <label key={index} className="cursor-pointer label">
                        <span className="label-text">{option}</span>
                        <input
                          type="radio"
                          name={question._id}
                          className="radio radio-primary"
                          checked={answers[question._id] === option}
                          onChange={() =>
                            handleOptionChange(question._id, option)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-full mt-4">
                Submit Quiz
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
