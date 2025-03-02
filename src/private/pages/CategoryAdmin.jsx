import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    _id: "",
    name: "",
    description: "",
  });

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/category");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change for forms
  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value });
  };

  // Add a new category, stripping _id out of the payload
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      // Remove _id from payload before sending to backend
      const { _id, ...payload } = currentCategory;
      const res = await axios.post("http://localhost:3000/api/v1/category", payload);
      toast.success("Category added successfully!");
      setShowAddModal(false);
      setCurrentCategory({ _id: "", name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error adding category", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  // Update an existing category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...payload } = currentCategory;
      const res = await axios.put(`http://localhost:3000/api/v1/category/${_id}`, payload);
      toast.success("Category updated successfully!");
      setShowEditModal(false);
      setCurrentCategory({ _id: "", name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Error updating category", error);
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/category/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  // Open add modal and reset state
  const openAddModal = () => {
    setCurrentCategory({ _id: "", name: "", description: "" });
    setShowAddModal(true);
  };

  // Open edit modal with selected category data
  const openEditModal = (category) => {
    setCurrentCategory(category);
    setShowEditModal(true);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Category Management</h3>
      <p className="mb-4">
        Manage categories below. You can add a new category, edit an existing one, or delete a category.
      </p>
      <button className="btn btn-primary mb-4" onClick={openAddModal}>
        Add Category
      </button>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="hover">
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => openEditModal(cat)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-error" onClick={() => handleDeleteCategory(cat._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="input input-bordered w-full"
                value={currentCategory.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Category Description"
                className="textarea textarea-bordered w-full"
                value={currentCategory.description}
                onChange={handleChange}
              ></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
                <button type="button" className="btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Category</h3>
            <form onSubmit={handleUpdateCategory} className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="input input-bordered w-full"
                value={currentCategory.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Category Description"
                className="textarea textarea-bordered w-full"
                value={currentCategory.description}
                onChange={handleChange}
              ></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Category
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
