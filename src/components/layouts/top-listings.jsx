import { useEffect, useState } from "react"
import { fetchTopListings } from '../../api/listings';
import { Loader, ErrorMessage } from '../ui';
import { Link } from 'react-router-dom';

export default function TopListings() {
  const [topListings, setTopListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeFilter, setTimeFilter] = useState('month') // week, month, year

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTopListings()
      .then((data) => setTopListings(data))
      .catch((err) => {
        setError(err.message || 'Failed to load top listings');
        setTopListings([]);
      })
      .finally(() => setLoading(false))
  }, [timeFilter])

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0">Top Listings</h5>
          <small className="text-muted">Best performing listings this {timeFilter}</small>
        </div>
        <div className="btn-group btn-group-sm">
          <button 
            className={`btn ${timeFilter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeFilter('week')}
          >
            Week
          </button>
          <button 
            className={`btn ${timeFilter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeFilter('month')}
          >
            Month
          </button>
          <button 
            className={`btn ${timeFilter === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeFilter('year')}
          >
            Year
          </button>
        </div>
      </div>
      <div className="card-body">
        {topListings.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-muted">📊</div>
            <p className="text-muted mb-0">No top listings available</p>
          </div>
        ) : (
          topListings.map((product, index) => (
            <Link 
              key={product.id || index} 
              to={`/Listings/${product.id}`}
              className="d-flex align-items-center mb-3 text-decoration-none text-dark"
              style={{ transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="bg-light rounded p-2 me-3">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-1">{product.title}</h6>
                <div className="d-flex align-items-center mb-1">
                  <div className="progress flex-grow-1 me-2" style={{ height: "6px" }}>
                    <div 
                      className="progress-bar" 
                      style={{ width: `${product.progress || 0}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">{product.progress || 0}%</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">
                    {product.views ? `${product.views} views` : ''}
                  </small>
                  <small className="text-muted">
                    {product.conversionRate ? `${product.conversionRate}% conversion` : ''}
                  </small>
                </div>
              </div>
              <div className="text-end ms-2">
                <div className="fw-bold text-success">{product.revenue}</div>
                <small className={`badge ${getStatusBadge(product.status)}`}>
                  {product.status}
                </small>
              </div>
            </Link>
          ))
        )}
      </div>
      {topListings.length > 0 && (
        <div className="card-footer text-center">
          <Link to="/Listings" className="btn btn-outline-primary btn-sm">
            View All Listings
          </Link>
        </div>
      )}
    </div>
  )
}

function getStatusBadge(status) {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'in stock':
      return 'bg-success';
    case 'low stock':
      return 'bg-warning';
    case 'out of stock':
    case 'inactive':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}
