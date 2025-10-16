import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import your API function
import { getUserById } from '../../api/users';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API call
    getUserById(id).then(data => {
      setCustomer(data);
      setLoading(false);
    });
 
  }, [id]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!customer) return <div className="container mt-4">Customer not found.</div>;

  return (
    <div className="container mt-4">
      <h2>Customer Details</h2>
      <div className="card mt-3" style={{ maxWidth: 400 }}>
        <div className="card-body text-center">
          <img
            src={customer.avatar || "/customer.png"}        
            alt={customer.name}
            className="rounded-circle mb-3"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
          />
          <h4>{customer.name}</h4>
          <p className="mb-1"><strong>Email:</strong> {customer.email}</p>
          <p className="mb-1"><strong>Phone:</strong> {customer.phone}</p>
          <p className="mb-1"><strong>Address:</strong> {customer.address}</p>
          {/* <p className="mb-1"><strong>Status:</strong> {customer.status}</p> */}
          <p className="mb-0"><strong>Role:</strong> {customer.role}</p>
        </div>
      </div>
    </div>
  );
}