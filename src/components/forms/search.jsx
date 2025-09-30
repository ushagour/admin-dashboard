import React from 'react';

const Search = ({ value, onChange, placeholder = "Search Listings, orders, customers..." }) => {
  return (
    <div className="position-relative" style={{ width: "100%" }}>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <i className="fa fa-search"></i>
        </span>
        <input
          type="search"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ 
            borderRadius: "0 0.375rem 0.375rem 0",
            borderLeft: "none"
          }}
        />
      </div>
    </div>
  );
};

export default Search;