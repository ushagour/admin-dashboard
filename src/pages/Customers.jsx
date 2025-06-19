import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Sample customers data
  const customers = [
    {
      id: "CUST-001",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      phone: "+1 (555) 123-4567",
      orders: 12,
      spent: "$1,248.42",
      lastOrder: "2023-06-12",
      status: "active",
      address: "123 Main St, Anytown, CA 12345",
      joinDate: "2022-03-15",
    },
    {
      id: "CUST-002",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      phone: "+1 (555) 234-5678",
      orders: 8,
      spent: "$879.99",
      lastOrder: "2023-06-11",
      status: "active",
      address: "456 Oak Ave, Somewhere, NY 67890",
      joinDate: "2022-05-22",
    },
    {
      id: "CUST-003",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      phone: "+1 (555) 345-6789",
      orders: 15,
      spent: "$2,156.75",
      lastOrder: "2023-06-10",
      status: "active",
      address: "789 Pine Rd, Elsewhere, TX 54321",
      joinDate: "2021-11-08",
    },
    {
      id: "CUST-004",
      name: "William Kim",
      email: "will@email.com",
      phone: "+1 (555) 456-7890",
      orders: 5,
      spent: "$432.85",
      lastOrder: "2023-06-09",
      status: "active",
      address: "321 Elm St, Nowhere, FL 13579",
      joinDate: "2023-01-30",
    },
    {
      id: "CUST-005",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      phone: "+1 (555) 567-8901",
      orders: 3,
      spent: "$129.97",
      lastOrder: "2023-06-08",
      status: "inactive",
      address: "654 Maple Dr, Anywhere, WA 24680",
      joinDate: "2023-04-12",
    },
    {
      id: "CUST-006",
      name: "Ethan Johnson",
      email: "ethan.j@email.com",
      phone: "+1 (555) 678-9012",
      orders: 7,
      spent: "$756.23",
      lastOrder: "2023-06-07",
      status: "active",
      address: "987 Cedar Ln, Someplace, IL 97531",
      joinDate: "2022-09-18",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "badge bg-success"
      case "inactive":
        return "badge bg-secondary"
      default:
        return "badge bg-secondary"
    }
  }

  return (
    <div className="flex-grow-1">
      {/* Customers Content */}
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Customers</h2>
          <div>
            <button className="btn btn-outline-secondary me-2">
              <span className="me-1">🔄</span> Refresh
            </button>
            <button className="btn btn-outline-primary me-2">
              <span className="me-1">📥</span> Export
            </button>
            <button className="btn btn-primary">
              <span className="me-1">➕</span> Add Customer
            </button>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Spent</th>
                    <th scope="col">Last Order</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div>
                          <div className="fw-bold">{customer.name}</div>
                          <div className="small text-muted">{customer.email}</div>
                        </div>
                      </td>
                      <td>{customer.id}</td>
                      <td>
                        <span className={getStatusBadge(customer.status)}>{customer.status}</span>
                      </td>
                      <td>{customer.orders}</td>
                      <td>{customer.spent}</td>
                      <td>{customer.lastOrder}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          View
                        </button>
                        <div className="dropdown d-inline-block">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            Actions
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                View Orders
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Send Email
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item text-danger" href="#">
                                Deactivate
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <nav aria-label="Customers pagination">
          <ul className="pagination justify-content-center">
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
                3
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

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details - {selectedCustomer.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedCustomer(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Contact Information</h6>
                    <p className="mb-1">
                      <strong>Name:</strong> {selectedCustomer.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {selectedCustomer.email}
                    </p>
                    <p className="mb-1">
                      <strong>Phone:</strong> {selectedCustomer.phone}
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {selectedCustomer.address}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p className="mb-1">
                      <strong>Customer ID:</strong> {selectedCustomer.id}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong>{" "}
                      <span className={getStatusBadge(selectedCustomer.status)}>{selectedCustomer.status}</span>
                    </p>
                    <p className="mb-1">
                      <strong>Join Date:</strong> {selectedCustomer.joinDate}
                    </p>
                    <p className="mb-1">
                      <strong>Total Orders:</strong> {selectedCustomer.orders}
                    </p>
                    <p className="mb-1">
                      <strong>Total Spent:</strong> {selectedCustomer.spent}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h6>Recent Activity</h6>
                    <div className="list-group">
                      <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Placed order #3210</h6>
                          <small>2 days ago</small>
                        </div>
                        <p className="mb-1">Order total: $42.25</p>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Updated shipping address</h6>
                          <small>5 days ago</small>
                        </div>
                        <p className="mb-1">Changed shipping address details</p>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">Placed order #3195</h6>
                          <small>2 weeks ago</small>
                        </div>
                        <p className="mb-1">Order total: $79.99</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
