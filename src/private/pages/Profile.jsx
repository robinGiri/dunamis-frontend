import React, { useState, useEffect } from "react";
import { useAuth } from "../../public/auth_context/AuthProvider";
import Navbar from "../../public/components/Navbar";
import Footer from "../../public/components/Footer";
import BookCard from "../../public/components/featured-books-section/BookCard";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";


export default function Profile() {
  const { authUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [allCourses, setAllCourses] = useState([]);


  const fetchUserDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("USER")).token;
      const res = await axios.get("http://localhost:3000/api/v1/auth/getMe", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details", error);
      toast.error("Failed to fetch user details");
    }
  };

  // Fetch all courses from the API
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/course/getAllCourse");
      setAllCourses(res.data.data);
    } catch (error) {
      console.error("Error fetching courses", error);
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCourses();
  }, []);

  if (!userDetails) return <div>Loading...</div>;

  // Filter the courses that are enrolled by the user.
  // userDetails.courses is an array of IDs; compare as strings.
  const enrolledCourses = allCourses.filter(course =>
    userDetails.courses.some(cId => cId.toString() === course._id.toString())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.role}
          </p>
          {enrolledCourses && enrolledCourses.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => (
                  <BookCard
                    key={course._id}
                    _id={course._id}
                    name={course.courseName}
                    description={course.description}
                    author={course.author}
                    category={course.category}
                    img={course.img}
                    isProfile={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

