import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function StudentAdmin() {
  const [students, setStudents] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    _id: "",
    username: "",
    name: "",
    email: "",
    role: "student",
  });

  // Function to retrieve token from localStorage
  const getToken = () => {
    const storedUser = localStorage.getItem("USER");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        return parsed?.token || "";
      } catch (error) {
        console.error("Error parsing USER from localStorage", error);
      }
    }
    return "";
  };

  // Fetch all students from API
  const fetchStudents = async () => {
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:3000/api/v1/auth/getAllStudents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students", error);
      toast.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on selected role
  const filteredStudents = filterRole === "All"
    ? students
    : students.filter((student) => student.role.toLowerCase() === filterRole.toLowerCase());

  // Handle input changes for both forms
  const handleChange = (e) => {
    setCurrentStudent({ ...currentStudent, [e.target.name]: e.target.value });
  };

  // Add a new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const res = await axios.post("http://localhost:3000/api/v1/auth/register", currentStudent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Student registered successfully!");
      setShowAddModal(false);
      setCurrentStudent({ _id: "", username: "", name: "", email: "", role: "student" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student", error);
      toast.error(error.response?.data?.message || "Failed to add student");
    }
  };

  // Update an existing student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const { _id, ...data } = currentStudent;
      const res = await axios.put(`http://localhost:3000/api/v1/auth/updateStudent/${_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Student updated successfully!");
      setShowEditModal(false);
      setCurrentStudent({ _id: "", username: "", name: "", email: "", role: "student" });
      fetchStudents();
    } catch (error) {
      console.error("Error updating student", error);
      toast.error(error.response?.data?.message || "Failed to update student");
    }
  };

  // Open add modal and reset state
  const openAddModal = () => {
    setCurrentStudent({ _id: "", username: "", name: "", email: "", role: "student" });
    setShowAddModal(true);
  };

  // Open edit modal with selected student data
  const openEditModal = (student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Student Management</h3>
      <p className="mb-4">
        Manage your student data below. You can add a new student or edit an existing one.
      </p>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Role:</label>
        <select
          className="select select-bordered w-40"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <button className="btn btn-primary mb-4" onClick={openAddModal}>
        Add Student
      </button>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="hover">
                <td>{student.username}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.role}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => openEditModal(student)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-4 mt-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full"
                value={currentStudent.username}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
                value={currentStudent.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={currentStudent.email}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                className="select select-bordered w-full"
                value={currentStudent.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Student
                </button>
                <button type="button" className="btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Student</h3>
            <form onSubmit={handleUpdateStudent} className="space-y-4 mt-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full"
                value={currentStudent.username}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
                value={currentStudent.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={currentStudent.email}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                className="select select-bordered w-full"
                value={currentStudent.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Student
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
