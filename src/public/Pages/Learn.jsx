import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetails() {
  const { id } = useParams();
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

  if (!course) return <div>Loading...</div>;

return (
    <>
        <Navbar />
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{course.courseName}</h1>
                <p className="mb-4">
                    <strong>Author:</strong> {course.author}
                </p>
                <p className="mb-4">
                    <strong>Category:</strong> {course.category}
                </p>
                <p className="mb-4">{course.description}</p>
                <div className="mb-4">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${course.videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <p className="mb-4">{course.courseContain}</p>
            </div>
        </div>
        <Footer />
    </>
);
}
