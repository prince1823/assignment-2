import React from 'react';

function Header({ handleViewSaved }) {
  return (
    <header className="relative flex items-center justify-between p-6 bg-gray-100 shadow-md">
      {/* Logo positioned behind the text */}
      

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-700 z-10">
        Explorin Solutions
      </h1>

      {/* Right side buttons (Saved Jobs, Notifications, Profile) */}
      <div className="flex items-center gap-6 ml-auto z-10">
        {/* Notification Bell */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405a2 2 0 0 0-.295-.295L18 14V10a6 6 0 0 0-12 0v4l-1.595 1.595a2 2 0 0 0-.295.295L4 17h5m3 0v1a2 2 0 1 0 4 0v-1m-4 0H8"
            />
          </svg>
          {/* Badge for new notifications */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
            3
          </span>
        </button>

        {/* Profile Icon */}
        <button className="relative">
          <img
            src="https://static.thenounproject.com/png/634769-200.png" // Replace with the king's image URL
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all duration-300"
          />
        </button>

        {/* Saved Jobs Button */}
        <button
          onClick={handleViewSaved}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 ease-in-out"
        >
          My Saved Jobs
        </button>
      </div>
    </header>
  );
}

export default Header;
