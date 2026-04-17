import React from 'react';

function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All', count: null },
    { id: 'todo', label: 'To Do', count: null },
    { id: 'in-progress', label: 'In Progress', count: null },
    { id: 'done', label: 'Done', count: null }
  ];

  return (
    <div className="filter-section">
      <h3>Filter Tasks</h3>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
          >
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;