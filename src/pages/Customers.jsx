import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useApi } from '../hooks/useApi';
import { SearchBar, Loader, ErrorMessage } from '../components/ui';
import { fetchUsers, fetchCompletedOrders } from '../api/users';
import  ChangeDateFormat  from "../helper/ChangeDateFormat"
export default function Customers() {
  const { data: customers, loading, error } = useApi(fetchUsers, []);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [completedOrders, setCompletedOrders] = useState({})

  useEffect(() => {
    // Ensure customers is an array
    const filteredCustomers = Array.isArray(customers)
      ? customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      : [];

    // Fetch completed orders count for each customer
    const fetchOrdersCount = async () => {
      const ordersCount = {};
      for (const customer of filteredCustomers) {
        try {
          const count = await fetchCompletedOrders(customer.id);
          ordersCount[customer.id] = count.completedOrders;
        } catch (error) {
          console.error(`Failed to fetch completed orders for user ${customer.id}`, error);
          ordersCount[customer.id] = 0;
        }
      }
      setCompletedOrders(ordersCount);
    };
    if (filteredCustomers.length > 0) {
      fetchOrdersCount();
    }
  }, [Array.isArray(customers) ? customers.length : 0, search]) // Re-fetch when customers list changes or search changes




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

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  // Filter customers by search
  const filteredCustomers = Array.isArray(customers)
    ? customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex-grow-1">
      {/* Customers Content */}
      <div className="container-fluid p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
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
                    <th scope="col">avatar</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Last Order</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div>
                          <div className="fw-bold">{customer.name}</div>
                          <div className="small text-muted">{customer.email}</div>
                        </div>
                      </td>
                       <td>
                          <img
                            src={customer.avatar || "/placeholder.png"}
                            alt={customer.id}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                          />
                        </td>                  
                      
                      <td>{customer.Orders.length}</td>
                      {/* <td>{completedOrders.completedOrders}</td> */}
<td>
  {customer.Orders.length > 0
    ? ChangeDateFormat(
        customer.Orders.reduce((latest, order) =>
          new Date(order.createdAt) > new Date(latest.createdAt) ? order : latest
        ).createdAt
      )
    : "—"}
</td>                    
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
                      <strong>Join Date:</strong> { ChangeDateFormat(selectedCustomer.createdAt) }
                    </p>
                    <p className="mb-1">
                      <strong>Total Orders:</strong> {selectedCustomer.Orders.length}
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
                      {selectedCustomer.Orders && selectedCustomer.Orders.length > 0 ? (
        selectedCustomer.Orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5) // Show up to 5 recent orders
          .map(order => (
            <div className="list-group-item" key={order.id}>
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">Placed order #{order.id}</h6>
                <small>{ChangeDateFormat(order.createdAt)}</small>
              </div>
              <p className="mb-1">Order total: ${order.total_price}</p>
              <span className={getStatusBadge(order.status)}>{order.status}</span>
            </div>
          ))
      ) : (
        <div className="list-group-item text-muted">No recent orders found.</div>
      )}
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
