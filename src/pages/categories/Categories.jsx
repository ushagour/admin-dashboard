import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../api/categories";
import CategoryForm from "../../components/forms/CategoryForm";
import CrudModal from "../../components/ui/CrudModal";
import { toast } from 'react-toastify';
import ConfirmationModal from "../../components/ui/ConfirmationModal";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // For modal form state
  const [modalForm, setModalForm] = useState({ name: "", icon: "" });
  const [modalErrors, setModalErrors] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Validation for modal form
  const validateModalForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Category name is required";
    if (!data.icon.trim()) errors.icon = "Icon is required";
    setModalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingCategory(null);
    setModalForm({ name: "", icon: "" });
    setModalErrors({});
    setShowModal(true);
  };

  // Handle edit
  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalForm({ name: category.name, icon: category.icon });
    setModalErrors({});
    setShowModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setModalForm({ name: "", icon: "" });
    setModalErrors({});
  };

  // Handle modal form submit
  const handleModalSubmit = async (formData) => {
    if (!validateModalForm(formData)) return;
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        toast.success("Category updated successfully!");
      } else {
        await createCategory(formData);
        toast.success("Category created successfully!");
      }
      handleModalClose();
      loadCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
      console.error(err);
    }
  };

  // Handle delete
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    try {
      setDeletingId(categoryToDelete.id);
      await deleteCategory(categoryToDelete.id);
      toast.success("Category deleted successfully!");
      loadCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
      console.error(err);
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  // Filter and sort categories
  const filteredAndSortedCategories = categories
    .filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.icon.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "id":
          aValue = a.id;
          bValue = b.id;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <div className="flex-grow-1">
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-0">Categories</h2>
            <p className="text-muted mb-0">
              {filteredAndSortedCategories.length} of {categories.length} categories
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleAddNew}
          >
            <i className="fa fa-plus-circle me-2"></i>
            Add New Category
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Search and Sort Bar */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="id">Sort by ID</option>
                  <option value="createdAt">Sort by Date</option>
                </select>
              </div>
              <div className="col-md-3">
                <div className="input-group">
                  <button
                    className={`btn btn-outline-secondary ${sortOrder === 'asc' ? 'active' : ''}`}
                    onClick={() => setSortOrder('asc')}
                    title="Ascending"
                  >
                    <i className="fa fa-sort-up"></i>
                  </button>
                  <button
                    className={`btn btn-outline-secondary ${sortOrder === 'desc' ? 'active' : ''}`}
                    onClick={() => setSortOrder('desc')}
                    title="Descending"
                  >
                    <i className="fa fa-sort-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCategories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <i className="fa fa-inbox text-muted" style={{ fontSize: "2rem" }}></i>
                        <p className="text-muted mt-2">
                          {searchTerm ? "No categories found matching your search." : "No categories available."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedCategories.map((category, index) => (
                      <tr 
                        key={category.id}
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          if (!e.target.closest('button')) {
                            navigate(`/Categories/${category.id}`);
                          }
                        }}
                        className="hover-highlight"
                      >
                        <td>{index + 1}</td>
                        <td>
                          <strong>{category.name}</strong>
                        </td>
                        <td>
                          <i className={`fa fa-${category.icon}`} style={{ fontSize: "1.5rem" }}></i>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-info me-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/Categories/${category.id}`);
                            }}
                            title="View details"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(category);
                            }}
                            title="Edit category"
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(category);
                            }}
                            title="Delete category"
                            disabled={deletingId === category.id}
                          >
                            {deletingId === category.id ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              <i className="fa fa-trash"></i>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CRUD Modal */}
        <CrudModal
          show={showModal}
          title={editingCategory ? "Edit Category" : "Add New Category"}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          submitLabel={editingCategory ? "Update" : "Create"}
          initialData={modalForm}
        >
          <CategoryForm
            value={modalForm}
            onChange={setModalForm}
            errors={modalErrors}
          />
        </CrudModal>

        {/* Confirmation Modal */}
        <ConfirmationModal
          show={showDeleteConfirm}
          title="Delete Category"
          message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmVariant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    </div>
  );
}