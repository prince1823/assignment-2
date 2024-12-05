import React from "react";

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center mt-6">
    <div className="animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full w-8 h-8"></div>
  </div>
);

const JobList = ({ jobs, fetchMoreJobs, hasMore, onSave, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transition-all transform hover:bg-orange-100 hover:text-gray-900 hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
          <p className="text-gray-600">{job.company} - {job.location}</p>
          <p className="text-gray-600 mt-2">Salary: ${job.salary}</p>
          <button
            onClick={() => onSave(job)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Save Job
          </button>
        </div>
      ))}
      
      {/* Show loading spinner when fetching more jobs */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default JobList;
