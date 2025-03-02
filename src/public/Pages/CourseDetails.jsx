import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetails() {
  const { id } = useParams();
  const location = useLocation();

  // Using URLSearchParams to get the 'isProfile' query parameter
  const searchParams = new URLSearchParams(location.search);
  const isProfile = searchParams.get("isProfile");
  console.log("isProfile", isProfile);
const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course details by id
    axios
      .get(`http://localhost:3000/api/v1/course/${id}`)
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((err) => {
        toast.error("Failed to load course details");
        console.error(err);
      });
  }, [id]);

  const handleLearn = () => {
    navigate(`/learn/${id}`);
  };

  const handleEnroll = async () => {
    try {
      // Retrieve token from localStorage.
      const storedUser = localStorage.getItem("USER");
      const user =
        storedUser && storedUser !== "undefined"
          ? JSON.parse(storedUser)
          : null;
      if (!user || !user.token) {
        toast.error("You must be logged in to enroll");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/enroll",
        { courseId: course._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Enrolled successfully!");
      // Optionally navigate to profile
      navigate("/profile");
    } catch (error) {
      console.error("Error enrolling in course", error);
      toast.error("Failed to enroll in course");
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{course.courseName}</h1>
          <p className="mb-4">{course.description}</p>
          <p className="mb-4">
            <strong>Author:</strong> {course.author}
          </p>
          <p className="mb-4">
            <strong>Category:</strong> {course.category}
          </p>
          <p className="mb-4">
            <strong>Price:</strong> ${course.price}
          </p>
          { isProfile !== 'true' ? (
            <button className="btn btn-primary" onClick={handleEnroll}>
              Enroll in this Course
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleLearn}>
              Learn
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
