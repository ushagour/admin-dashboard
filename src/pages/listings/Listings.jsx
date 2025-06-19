"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Listings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Sample product data
  const Listings = [
    {
      id: "PROD-001",
      name: "Product A",
      price: "$25.00",
      stock: 100,
      status: "active",
    },
    {
      id: "PROD-002",
      name: "Product B",
      price: "$40.00",
      stock: 0,
      status: "inactive",
    },
    {
      id: "PRD-003",
      name: "Laptop Stand",
      category: "Accessories",
      price: "$49.99",
      stock: 78,
      status: "In Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "PRD-004",
      name: "Phone Case",
      category: "Accessories",
      price: "$19.99",
      stock: 124,
      status: "In Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "PRD-005",
      name: "USB Cable",
      category: "Accessories",
      price: "$9.99",
      stock: 56,
      status: "In Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "PRD-006",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "$79.99",
      stock: 18,
      status: "Low Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "PRD-007",
      name: "Wireless Mouse",
      category: "Electronics",
      price: "$29.99",
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "PRD-008",
      name: "Keyboard",
      category: "Electronics",
      price: "$59.99",
      stock: 23,
      status: "In Stock",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

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
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
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
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Listings.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <span className={getStatusBadge(product.status)}>{product.status}</span>
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
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      Product Name
                    </label>
                    <input type="text" className="form-control" id="productName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select className="form-select" id="category">
                      <option>Electronics</option>
                      <option>Accessories</option>
                      <option>Clothing</option>
                      <option>Home & Kitchen</option>
                    </select>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input type="text" className="form-control" id="price" placeholder="$0.00" />
                    </div>
                    <div className="col">
                      <label htmlFor="stock" className="form-label">
                        Stock
                      </label>
                      <input type="number" className="form-control" id="stock" placeholder="0" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea className="form-control" id="description" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">
                      Product Image
                    </label>
                    <input type="file" className="form-control" id="productImage" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
