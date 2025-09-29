"use client"

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchListings, createListing, updateListing, deleteListing } from "../../api/listings";
import CrudModal from '../../components/ui/CrudModal';
import ListingForm from '../../components/forms/ListingForm';
import { Loader, ErrorMessage, Toast } from '../../components/ui';
import { toast } from 'react-toastify';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  // Modal handlers
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = (listing) => { setSelectedListing(listing); setShowEditModal(true); };
  const closeEditModal = () => { setSelectedListing(null); setShowEditModal(false); };
  const openDeleteModal = (listing) => { setSelectedListing(listing); setShowDeleteModal(true); };
  const closeDeleteModal = () => { setSelectedListing(null); setShowDeleteModal(false); };

  // Fetch listings
  const refreshListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchListings();
      setListings(data);
    } catch (err) {
      setError('Failed to fetch listings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshListings();
  }, []);

  // CRUD handlers
  const handleAdd = async (formData) => {
    try {
      // formData should include user_id and all fields
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      await createListing(data);
      closeAddModal();
      refreshListings();
      toast.success("Listing added successfully!");
    } catch (err) {
      toast.error("Failed to add listing.");
    }
  };

  const handleEdit = async (listingData) => {
    try {
      await updateListing(selectedListing.id, listingData);
      closeEditModal();
      refreshListings();
      toast.success("Listing updated successfully!");
    } catch (err) {
      toast.error("Failed to update listing.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListing(selectedListing.id);
      closeDeleteModal();
      refreshListings();
      toast.success("Listing deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete listing.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "badge bg-success";
      case "inactive":
        return "badge bg-secondary";
      case "In Stock":
        return "badge bg-success";
      case "Low Stock":
        return "badge bg-warning";
      case "Out of Stock":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  if (loading && listings.length === 0) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Listings</h2>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={refreshListings}
              title="Refresh"
            >
              <span className="me-1">🔄</span> Refresh
            </button>
            <button className="btn btn-primary" onClick={openAddModal}>
              <span className="me-1">➕</span> Add Listing
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Location</th>
                    <th scope="col">Messages</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-4">
                        No listings found.
                      </td>
                    </tr>
                  ) : (
                    listings.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                          <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.title}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                            onError={(e) => {
                              e.target.src = "/placeholder.png";
                            }}
                          />
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price} $</td>
                        <td>
                          <span className={getStatusBadge(product.status)}>{product.status}</span>
                        </td>
                        <td>
                          {product.latitude && product.longitude
                            ? `${product.latitude.toFixed(3)}, ${product.longitude.toFixed(3)}`
                            : "—"}
                        </td>
                        <td>
                          {product.Messages && Array.isArray(product.Messages)
                            ? product.Messages.length
                            : product.messagesCount || 0}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => openEditModal(product)}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => openDeleteModal(product)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {listings.length === 0 && !loading && (
              <div className="text-center py-4">
                <div className="text-muted">📦</div>
                <p className="text-muted mb-0">No listings found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <CrudModal
        show={showAddModal}
        title="Add Listing"
        onClose={closeAddModal}
        onSubmit={handleAdd}
        submitLabel="Add"
        initialData={null}
      >
        <ListingForm />
      </CrudModal>

      {/* Edit Modal */}
      <CrudModal
        show={showEditModal}
        title="Edit Listing"
        onClose={closeEditModal}
        onSubmit={handleEdit}
        submitLabel="Save"
        initialData={selectedListing}
      >
        <ListingForm listing={selectedListing} />
      </CrudModal>

      {/* Delete Modal */}
      <CrudModal
        show={showDeleteModal}
        title="Delete Listing"
        onClose={closeDeleteModal}
        onSubmit={handleDelete}
        submitLabel="Delete"
      >
        <>
          <p>Are you sure you want to delete "{selectedListing?.title}"?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </>
      </CrudModal>
    </div>
  );
}
