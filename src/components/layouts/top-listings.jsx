import { useEffect, useState } from "react"
import { fetchTopListings }  from '../../api/api';

export  default function TopListings() {
  const [topListings, setTopListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopListings()
      .then((data) => setTopListings(data))
      .catch(() => setTopListings([]))
      .finally(() => setLoading(false))
  }, [])

  return (
  <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Top Listings</h5>
              <small className="text-muted">Best performing Listings this month</small>
            </div>
            <div className="card-body">
              {topListings.map((product, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div className="bg-light rounded p-2 me-3">
                    
                          <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.title}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                          />
             
                    
                    
                    </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{product.title}</h6>
                    <div className="progress" style={{ height: "6px" }}>
                      <div className="progress-bar" style={{ width: `${product.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="text-end ms-2">
                    <div className="fw-bold">{product.revenue}</div>
                    <small className="text-muted">{product.status}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}
