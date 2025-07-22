import React from "react";
import getChange from "../helper/GetChange";

export default function CardStats({ stats = [] }) {
  
  return (
    <div className="row">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-6 col-lg-3 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title text-muted mb-0">{stat.title}</h6>
                <span style={{ fontSize: "1.5rem" }}>{stat.icon}</span>
              </div>
              <h3 className="mb-1">{stat.value}</h3>
              <small className={`text-${stat.changeType}`}>
                📈 { getChange(stat.current,stat.previous)} from last month
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}