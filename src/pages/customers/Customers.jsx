import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useApi } from '../../hooks/useApi';
import { SearchBar, Loader, ErrorMessage, CrudModal } from '../../components/ui';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../api/users';
import UserForm from '../../components/forms/UserForm';
import ChangeDateFormat from "../../helper/ChangeDateFormat";
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv"; // npm install react-csv

export default function Customers() {
  const { data: customersData, loading, error, refetch } = useApi(fetchUsers, []);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal handlers
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = (user) => { setSelectedUser(user); setShowEditModal(true); };
  const closeEditModal = () => { setSelectedUser(null); setShowEditModal(false); };
  const openDeleteModal = (user) => { setSelectedUser(user); setShowDeleteModal(true); };
  const closeDeleteModal = () => { setSelectedUser(null); setShowDeleteModal(false); };

  // CRUD handlers
  const handleAdd = async (userData) => {
    try {
      await createUser(userData);
      closeAddModal();
      refetch(); // Refresh data
      toast.success("Customer added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add customer.",err);
    }
  };

  const handleEdit = async (userData) => {
    try {
      await updateUser(selectedUser.id, userData);
         closeEditModal();   
      // Optionally refresh data here
      refetch(); // Refresh data
      toast.success("Customer updated successfully!");  
    } catch (err) {
      console.error('Failed to update user:', err);
      toast.error("Failed to  update user.", err);  

    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      closeDeleteModal();   
      // Optionally refresh data here
      refetch(); // Refresh data
      toast.success("Customer deleted successfully!");  
    } catch (err) {
      console.error('Failed to delete user:', err);
      toast.error("Failed to delete customer.");  
    }
  };

  // Export data as CSV
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Orders", key: "ordersCount" },
    { label: "Spent", key: "totalSpent" },
    { label: "Last Order", key: "lastOrder" },
  ];
  const csvData = Array.isArray(customersData)
    ? customersData.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        status: c.status,
        ordersCount: c.ordersCount ?? 0,
        totalSpent: c.totalSpent ?? 0,
        lastOrder: c.lastOrder ? ChangeDateFormat(c.lastOrder) : "—",
      }))
    : [];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  const filteredCustomers = Array.isArray(customersData)
    ? customersData.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Customers</h2>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={refetch}
              title="Refresh"
            >
              <span className="me-1">🔄</span> Refresh
            </button>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="customers.csv"
              className="btn btn-outline-primary me-2"
              target="_blank"
            >
              <span className="me-1">📥</span> Export
            </CSVLink>
            <button className="btn btn-primary" onClick={openAddModal}>
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
                    <th>Customer</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Orders</th>
                    <th>Spent</th>
                    <th>Last Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        No customers found.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={customer.avatar || "/placeholder.svg"}
                              alt={customer.name}
                              className="rounded-circle me-2"
                              width="36"
                              height="36"
                              style={{ objectFit: "cover" }}
                            />
                            <span>{customer.name}</span>
                          </div>
                        </td>
                        <td>{customer.id}</td>
                        <td>
                          <span className={customer.status === "active" ? "badge bg-success" : "badge bg-secondary"}>
                            {customer.status}
                          </span>
                        </td>
                        <td>{customer.ordersCount ?? 0}</td>
                        <td>${customer.totalSpent ?? 0}</td>
                        <td>{customer.lastOrder ? ChangeDateFormat(customer.lastOrder) : "—"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openEditModal(customer)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => openDeleteModal(customer)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary ms-2"
                            onClick={() => window.location.href = `/customers/${customer.id}`}
                          >
                            View
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
      </div>

      {/* Add Modal */}
      <CrudModal
        show={showAddModal}
        title="Add Customer"
        onClose={closeAddModal}
        onSubmit={handleAdd}
        submitLabel="Save"
        initialData={null}
      >
        <UserForm />
      </CrudModal>

      {/* Edit Modal */}
      <CrudModal
        show={showEditModal}
        title="Edit Customer"
        onClose={closeEditModal}
        onSubmit={handleEdit}
        submitLabel="Save"
        initialData={selectedUser}
      >
        <UserForm user={selectedUser} />
      </CrudModal>

      {/* Delete Modal */}
      <CrudModal
        show={showDeleteModal}
        title="Delete Customer"
        onClose={closeDeleteModal}
        onSubmit={handleDelete}
        submitLabel="Delete"
      >
        <>
          <p>Are you sure you want to delete "{selectedUser?.name}"?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </>
      </CrudModal>
    </div>
  );
}

