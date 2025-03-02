import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function QuizAdmin() {
  const [questions, setQuestions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({
    _id: "",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    category: "",
  });

  // Fetch quiz questions from API
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/quiz/questions");
      // Note: The GET endpoint for quiz questions returns sanitized questions (without correctAnswer).
      // For admin purposes, you might have a separate endpoint that returns full details.
      setQuestions(res.data.data);
    } catch (error) {
      console.error("Error fetching quiz questions", error);
      toast.error("Failed to fetch quiz questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setCurrentQuiz({ ...currentQuiz, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuiz.options];
    updatedOptions[index] = value;
    setCurrentQuiz({ ...currentQuiz, options: updatedOptions });
  };

  // Validate and add a new quiz question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    // Remove _id from the payload
    const { _id, ...quizData } = currentQuiz;

    // Validate that correctAnswer is one of the options
    if (!quizData.options.includes(quizData.correctAnswer)) {
      toast.error("Correct answer must be one of the options");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/quiz/question", quizData);
      toast.success("Question added successfully!");
      setShowAddModal(false);
      resetForm();
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question", error);
      toast.error(error.response?.data?.message || "Failed to add question");
    }
  };

  // Update an existing quiz question
  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...data } = currentQuiz;
      // Validate that correctAnswer is one of the options
      if (!currentQuiz.options.includes(currentQuiz.correctAnswer)) {
        toast.error("Correct answer must be one of the options");
        return;
      }
      const res = await axios.put(`http://localhost:3000/api/v1/quiz/question/${_id}`, data);
      toast.success("Question updated successfully!");
      setShowEditModal(false);
      resetForm();
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question", error);
      toast.error(error.response?.data?.message || "Failed to update question");
    }
  };

  const resetForm = () => {
    setCurrentQuiz({
      _id: "",
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      category: "",
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (quiz) => {
    setCurrentQuiz(quiz);
    setShowEditModal(true);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Quiz Management</h3>
      <p className="mb-4">
        Manage your quiz questions below. You can add a new question or edit an existing one.
      </p>
      <button className="btn btn-primary mb-4" onClick={openAddModal}>
        Add Quiz Question
      </button>

      {/* Questions Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Category</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id} className="hover">
                <td>{q.questionText}</td>
                <td>{q.options.join(", ")}</td>
                <td>{q.correctAnswer}</td>
                <td>{q.category}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => openEditModal(q)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Quiz Question</h3>
            <form onSubmit={handleAddQuestion} className="space-y-4 mt-4">
              <input
                type="text"
                name="questionText"
                placeholder="Question"
                className="input input-bordered w-full"
                value={currentQuiz.questionText}
                onChange={handleChange}
                required
              />
              {currentQuiz.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="input input-bordered w-full"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              ))}
              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                className="input input-bordered w-full"
                value={currentQuiz.correctAnswer}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (optional)"
                className="input input-bordered w-full"
                value={currentQuiz.category}
                onChange={handleChange}
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Question
                </button>
                <button type="button" className="btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Quiz Question</h3>
            <form onSubmit={handleUpdateQuestion} className="space-y-4 mt-4">
              <input
                type="text"
                name="questionText"
                placeholder="Question"
                className="input input-bordered w-full"
                value={currentQuiz.questionText}
                onChange={handleChange}
                required
              />
              {currentQuiz.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="input input-bordered w-full"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              ))}
              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                className="input input-bordered w-full"
                value={currentQuiz.correctAnswer}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (optional)"
                className="input input-bordered w-full"
                value={currentQuiz.category}
                onChange={handleChange}
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Question
                </button>
                <button type="button" className="btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
