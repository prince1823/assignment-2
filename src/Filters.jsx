import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleFilter = () => {
    onFilter({ keyword, location });
  };

  return (
    <div className="filter-container p-4 bg-gray-100 shadow-md rounded-md mb-6">
      <div className="flex gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by Job Title,Position,Keyword.."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="City,state or country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={handleFilter}
          className="bg-orange-500 text-white px-4 py-2 rounded w-full sm:w-1/4"
        >
          Find Job
        </button>
      </div>
    </div>
  );
};

export default Filters;
