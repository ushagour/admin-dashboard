import React, { useEffect,useState } from 'react';
import { useApi } from '../hooks/useApi';
import { fetchStats} from '../api/api';
import CardStats from '../components/CardStats';
import RecentOrders from '../components/layouts/RecentOrders';
import TopListings from '../components/layouts/top-listings';

export default function Dashboard() {
  // Fetch data using custom hooks


  const [stats, setStats] = useState([])

  useEffect(() => {
    fetchStats().then(data => setStats(data)).catch(console.error)
  }, [])



  

  

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
