// FilterBar.js
import React from 'react';
import '../styles/FilterBar.css';

function FilterBar({ titleFilter, setTitleFilter, filterTags, setFilterTags }) {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter by title"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filter by tags (comma-separated)"
        value={filterTags}
        onChange={(e) => setFilterTags(e.target.value)}
        className="filter-input"
      />
    </div>
  );
}

export default FilterBar;