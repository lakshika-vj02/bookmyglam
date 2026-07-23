import React from "react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="mb-4">
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;