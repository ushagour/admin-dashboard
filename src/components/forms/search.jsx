import React from 'react';

const Search = ({ value, onChange, placeholder = "Search Listings, orders, customers..." }) => {
  return (
    <form className="d-flex align-items-center mb-3" role="search" style={{ maxWidth: 400, width: "100%" }}>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "20px 0 0 20px" }}>
          <span role="img" aria-label="search">🔍</span>
        </span>
        <input
          type="search"
          className="form-control border-start-0"
          style={{ borderRadius: "0 20px 20px 0" }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default Search;