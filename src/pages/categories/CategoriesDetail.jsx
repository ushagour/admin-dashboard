import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById } from '../../api/categories';
import Toast from '../../components/ui/Toast';

export default function CategoriesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategoryById(id);
      setCategory(data);
    } catch (err) {
      setError("Failed to load category details");
      setToast({
        show: true,
        message: "Category not found",
        type: "error"
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container-fluid p-4">
        <div className="card">
          <div className="card-body text-center">
            <i className="fa fa-exclamation-triangle text-warning" style={{ fontSize: "3rem" }}></i>
            <h3 className="mt-3">Category Not Found</h3>
            <p className="text-muted">The category you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/categories')}
            >
              <i className="fa fa-arrow-left me-2"></i>
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button 
            className="btn btn-outline-secondary me-3"
            onClick={() => navigate('/categories')}
          >
            <i className="fa fa-arrow-left me-2"></i>
            Back to Categories
          </button>
          <h2 className="mb-0">Category Details</h2>
        </div>
        <div>
          <button 
            className="btn btn-outline-primary me-2"
            onClick={() => navigate(`/categories/edit/${category.id}`)}
          >
            <i className="fa fa-pencil me-2"></i>
            Edit Category
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Category Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category ID</label>
                    <p className="form-control-plaintext">{category.id}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Created Date</label>
                    <p className="form-control-plaintext">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Category Name</label>
                <p className="form-control-plaintext fs-5">{category.name}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Icon</label>
                <div className="d-flex align-items-center">
                  <i className={`bi ${category.icon}`} style={{ fontSize: "2rem", marginRight: "1rem" }}></i>
                  <span className="text-muted">{category.icon}</span>
                </div>
              </div>

              {category.description && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <p className="form-control-plaintext">{category.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/categories/edit/${category.id}`)}
                >
                  <i className="fa fa-pencil me-2"></i>
                  Edit Category
                </button>
                <button 
                  className="btn btn-outline-info"
                  onClick={() => navigate('/categories')}
                >
                  <i className="fa fa-list me-2"></i>
                  View All Categories
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/listings')}
                >
                  <i className="fa fa-box me-2"></i>
                  View Listings
                </button>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Category Stats</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary mb-1">
                      {category.Listings.length || 0}
                    </h4>
                    <small className="text-muted">Listings</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-success mb-1">
                    {category.activeListingsCount || 0}
                  </h4>
                  <small className="text-muted">Active</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
} 