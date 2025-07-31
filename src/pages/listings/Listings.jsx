"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import { fetchListings } from "../../api/listings"
import CrudModal from '../../components/ui/CrudModal';

export default function Listings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([])

  // Handlers for opening/closing modals
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = (listing) => { setSelectedListing(listing); setShowEditModal(true); };
  const closeEditModal = () => { setSelectedListing(null); setShowEditModal(false); };
  const openDeleteModal = (listing) => { setSelectedListing(listing); setShowDeleteModal(true); };
  const closeDeleteModal = () => { setSelectedListing(null); setShowDeleteModal(false); };

  // Handlers for CRUD actions (to be implemented)
  const handleAdd = (e) => { e.preventDefault(); /* TODO: Add listing */ closeAddModal(); };
  const handleEdit = (e) => { e.preventDefault(); /* TODO: Edit listing */ closeEditModal(); };
  const handleDelete = (e) => { e.preventDefault(); /* TODO: Delete listing */ closeDeleteModal(); };

  useEffect(() => {
    fetchListings().then(data => setListings(data)).catch(console.error)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "badge bg-success"
      case "inactive":
        return "badge bg-secondary"
      case "In Stock":
        return "badge bg-success"
      case "Low Stock":
        return "badge bg-warning"
      case "Out of Stock":
        return "badge bg-danger"
      default:
        return "badge bg-secondary"
    }
  }

  return (
    <div className="d-flex">

      {/* Main Content */}
      <div className="flex-grow-1">
  

        {/* Listings Content */}
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Listings</h2>
            <div>
              <button className="btn btn-outline-secondary me-2">
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
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((product) => (
                      <tr key={product.id}>
                               <td>{product.id}</td>
                        <td>
                          <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.title}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav aria-label="Listings pagination">
                <ul className="pagination justify-content-center mt-4">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <CrudModal show={showAddModal} title="Add Listing" onClose={closeAddModal} onSubmit={handleAdd} submitLabel="Add">
        {/* Add listing form fields here */}
      </CrudModal>
      <CrudModal show={showEditModal} title="Edit Listing" onClose={closeEditModal} onSubmit={handleEdit} submitLabel="Save">
        {/* Edit listing form fields here, prefill with selectedListing */}
      </CrudModal>
      <CrudModal show={showDeleteModal} title="Delete Listing" onClose={closeDeleteModal} onSubmit={handleDelete} submitLabel="Delete">
        <p>Are you sure you want to delete this listing?</p>
      </CrudModal>
    </div>
  )
}
