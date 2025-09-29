import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../../api/listings';
import Toast from '../../components/ui/Toast';

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (id) {
      loadListing();
    }
    // eslint-disable-next-line
  }, [id]);

  const loadListing = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getListingById(id);
      setListing(data);
    } catch (err) {
      setError("Failed to load listing details");
      setToast({
        show: true,
        message: "Listing not found",
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

  if (error || !listing) {
    return (
      <div className="container-fluid p-4">
        <div className="card">
          <div className="card-body text-center">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "3rem" }}></i>
            <h3 className="mt-3">Listing Not Found</h3>
            <p className="text-muted">The listing you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/listings')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Listings
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
            onClick={() => navigate('/listings')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Listings
          </button>
          <h2 className="mb-0">Listing Details</h2>
        </div>
        <div>
          <button 
            className="btn btn-outline-primary me-2"
            onClick={() => navigate(`/listings/edit/${listing.id}`)}
          >
            <i className="bi bi-pencil me-2"></i>
            Edit Listing
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Listing Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Listing ID</label>
                    <p className="form-control-plaintext">{listing.id}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Created Date</label>
                    <p className="form-control-plaintext">
                      {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <p className="form-control-plaintext fs-5">{listing.title}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <p className="form-control-plaintext">{listing.description || "—"}</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <p className="form-control-plaintext">{listing.price} $</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Status</label>
                    <p className="form-control-plaintext">{listing.status}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Category</label>
                <p className="form-control-plaintext">{listing.category?.name || listing.category_id || "—"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Stock</label>
                <p className="form-control-plaintext">{listing.stock ?? "—"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Location</label>
                <p className="form-control-plaintext">
                  {listing.latitude && listing.longitude
                    ? `${listing.latitude}, ${listing.longitude}`
                    : "—"}
                </p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Image</label>
                <div>
                  {listing.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </div>
              </div>
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
                  onClick={() => navigate(`/listings/edit/${listing.id}`)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Listing
                </button>
                <button 
                  className="btn btn-outline-info"
                  onClick={() => navigate('/listings')}
                >
                  <i className="bi bi-list me-2"></i>
                  View All Listings
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/categories')}
                >
                  <i className="bi bi-box me-2"></i>
                  View Categories
                </button>
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