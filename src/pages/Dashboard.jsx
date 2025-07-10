import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { fetchListings, fetchUsers,fetchCategories,fetchReviews } from '../api/api';
import CardStats from '../components/CardStats';
import RecentOrders from '../components/layouts/RecentOrders';
import TopListings from '../components/layouts/top-listings';

export default function Dashboard() {
  // Fetch data using custom hooks
  const{ data: listings, request: getListings } = useApi(fetchListings);
  const { data: users, request: getUsers } = useApi(fetchUsers);
  const { data: categories, request: getCategories } = useApi(fetchCategories);
  const { data: reviews, request: getReviews } = useApi(fetchReviews);



  // Build stats array after data is fetched
  const stats = [
    {
      title: "Listings",
      value: listings ?  listings.length || 0 : 0,
      change: "+19%",
      changeType: "success",
      icon: "📦",
    },
    {
      title: "Customers",
      value: users ? users.length : 0,
      change: "+201",
      changeType: "success",
      icon: "👥",
    },
    {      title: "Categories",
      value: categories ? categories.length : 0,
      change: "+5",
      changeType: "success",
      icon: "📂"
      },
    {      title: "Reviews",
      value: reviews ? reviews.length : 0,
      change: "+12",
      changeType: "success",
      icon: "⭐"
    },

    // Add more stats as needed
  ];

  useEffect(() => {
    getListings();
    getUsers();
    getCategories();
    getReviews(); 
  }, [getListings, getUsers,getCategories, getReviews]);

  const recentOrders = [
    {
      id: "#3210",
      customer: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "completed",
      amount: "$42.25",
      date: "2 hours ago",
    },
    {
      id: "#3209",
      customer: "Jackson Lee",
      email: "jackson.lee@email.com",
      status: "processing",
      amount: "$74.99",
      date: "4 hours ago",
    },
    {
      id: "#3208",
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      status: "completed",
      amount: "$99.99",
      date: "6 hours ago",
    },
    {
      id: "#3207",
      customer: "William Kim",
      email: "will@email.com",
      status: "pending",
      amount: "$39.95",
      date: "8 hours ago",
    },
    {
      id: "#3206",
      customer: "Sofia Davis",
      email: "sofia.davis@email.com",
      status: "completed",
      amount: "$19.99",
      date: "1 day ago",
    },
  ];

  

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success";
      case "processing":
        return "badge bg-primary";
      case "pending":
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Stats Cards */}
      <div className="row mb-4">
        <CardStats stats={stats} />
      </div>

      <div className="row">
        {/* Recent Orders */}
        <RecentOrders />
    

        {/* Top Listings & Sales Chart */}
        <div className="col-lg-4">
          {/* Top Listings */}
        <TopListings />
        </div>
      </div>
    </div>
  );
}
