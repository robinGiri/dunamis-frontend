import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseAdmin() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    _id: "",
    courseName: "",
    description: "",
    price: "",
    type: "free",
    author: "",
    category: "",
    img: "",
    videoId: "",
    courseContain: "",
  });

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/course/getAllCourse"
      );
      setCourses(res.data.data);
    } catch (error) {
      console.error("Error fetching courses", error);
      toast.error("Failed to fetch courses");
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/category");
      // Assuming API returns { success: true, data: [ { _id, name, description }, ... ] }
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  // Handle input changes for add/edit forms (for other fields)
  const handleChange = (e) => {
    setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
  };

  // Add a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      // Destructure _id out so that it is not sent to the API
      const { _id, ...payload } = currentCourse;
      const res = await axios.post(
        "http://localhost:3000/api/v1/course/createCourse",
        payload
      );
      toast.success("Course added successfully!");
      setShowAddModal(false);
      setCurrentCourse({
        _id: "",
        courseName: "",
        description: "",
        price: "",
        type: "free",
        author: "",
        category: "",
        img: "",
        videoId: "",
        courseContain: "",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error adding course", error);
      toast.error(error.response?.data?.message || "Failed to add course");
    }
  };

  // Update an existing course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...courseData } = currentCourse;
      const res = await axios.put(
        `http://localhost:3000/api/v1/course/${_id}`,
        courseData
      );
      toast.success("Course updated successfully!");
      setShowEditModal(false);
      setCurrentCourse({
        _id: "",
        courseName: "",
        description: "",
        price: "",
        type: "free",
        author: "",
        category: "",
        img: "",
        videoId: "",
        courseContain: "",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error updating course", error);
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  };

  // Open the add modal and reset the currentCourse state
  const openAddModal = () => {
    setCurrentCourse({
      _id: "",
      courseName: "",
      description: "",
      price: "",
      type: "free",
      author: "",
      category: "",
      img: "",
      videoId: "",
      courseContain: "",
    });
    setShowAddModal(true);
  };

  // Open the edit modal with the selected course data
  const openEditModal = (course) => {
    setCurrentCourse(course);
    setShowEditModal(true);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Course Management</h3>
      <p className="mb-4">
        Manage your courses below. You can add a new course or edit an existing
        one.
      </p>
      <button className="btn btn-primary mb-4" onClick={openAddModal}>
        Add Course
      </button>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Type</th>
              <th>Author</th>
              <th>Category</th>
              <th>Image URL</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="hover">
                <td>{course.courseName}</td>
                <td>{course.description}</td>
                <td>{course.price}</td>
                <td>{course.type}</td>
                <td>{course.author}</td>
                <td>{course.category}</td>
                <td>{course.img}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => openEditModal(course)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Course</h3>
            <form onSubmit={handleAddCourse} className="space-y-4 mt-4">
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                className="input input-bordered w-full"
                value={currentCourse.courseName}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                className="textarea textarea-bordered w-full"
                value={currentCourse.description}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="url"
                name="videoId"
                placeholder="Video URL"
                className="input input-bordered w-full"
                value={currentCourse.videoId}
                onChange={handleChange}
                required
              />
              <textarea
                name="courseContain"
                placeholder="Course Contain"
                className="textarea textarea-bordered w-full"
                value={currentCourse.courseContain}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                value={currentCourse.price}
                onChange={handleChange}
                required
              />
              <select
                name="type"
                className="select select-bordered w-full"
                value={currentCourse.type}
                onChange={handleChange}
                required
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
              <input
                type="text"
                name="author"
                placeholder="Author"
                className="input input-bordered w-full"
                value={currentCourse.author}
                onChange={handleChange}
              />
              {/* Replace category text input with a select */}
              <select
                name="category"
                className="select select-bordered w-full"
                value={currentCourse.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="url"
                name="img"
                placeholder="Image URL"
                className="input input-bordered w-full"
                value={currentCourse.img}
                onChange={handleChange}
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Course
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Course</h3>
            <form onSubmit={handleUpdateCourse} className="space-y-4 mt-4">
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                className="input input-bordered w-full"
                value={currentCourse.courseName}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                className="textarea textarea-bordered w-full"
                value={currentCourse.description}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="url"
                name="videoId"
                placeholder="Video URL"
                className="input input-bordered w-full"
                value={currentCourse.videoId}
                onChange={handleChange}
                required
              />
              <textarea
                name="courseContain"
                placeholder="Course Contain"
                className="textarea textarea-bordered w-full"
                value={currentCourse.courseContain}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                value={currentCourse.price}
                onChange={handleChange}
                required
              />
              <select
                name="type"
                className="select select-bordered w-full"
                value={currentCourse.type}
                onChange={handleChange}
                required
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
              <input
                type="text"
                name="author"
                placeholder="Author"
                className="input input-bordered w-full"
                value={currentCourse.author}
                onChange={handleChange}
              />
              {/* Category dropdown */}
              <select
                name="category"
                className="select select-bordered w-full"
                value={currentCourse.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="url"
                name="img"
                placeholder="Image URL"
                className="input input-bordered w-full"
                value={currentCourse.img}
                onChange={handleChange}
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Course
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowEditModal(false)}
                >
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
