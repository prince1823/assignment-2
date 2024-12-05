import React, { useState, useEffect, useRef } from 'react';
import { mockJobs } from './mockJobs'; // Mock job data
import Filters from './Filters'; // Filters component
import Footer from './Footer'; // Footer component
import Header from './Header'; // Import Header component

function App() {
  const [jobs, setJobs] = useState(mockJobs.slice(0, 10)); // Initial job list (first 10)
  const [filteredJobs, setFilteredJobs] = useState(mockJobs); // Filtered jobs state
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []); // Saved jobs state
  const [viewSaved, setViewSaved] = useState(false); // Toggle view between saved and filtered jobs
  const [loading, setLoading] = useState(false); // Loading state
  const [allJobsLoaded, setAllJobsLoaded] = useState(false); // Check if all jobs are loaded
  const observer = useRef(); // Intersection observer to handle infinite scroll

  const handleViewSaved = () => {
    setViewSaved(!viewSaved); // Toggle saved jobs view
  };

  // Function to handle saving or removing a job
  const saveJob = (job) => {
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);

    if (isAlreadySaved) {
      // Remove from saved jobs if already saved
      const updatedSavedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
      setSavedJobs(updatedSavedJobs);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs)); // Save updated list to localStorage
    } else {
      // Add to saved jobs if not saved
      const updatedSavedJobs = [...savedJobs, job];
      setSavedJobs(updatedSavedJobs);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs)); // Save to localStorage
    }
  };

  // Function to load more jobs (simulating an API call)
  const loadMoreJobs = () => {
    if (loading || allJobsLoaded) return;

    setLoading(true); // Show loading spinner
    setTimeout(() => {
      const newJobs = mockJobs.slice(jobs.length, jobs.length + 10); // Simulate loading more jobs
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      if (newJobs.length === 0) setAllJobsLoaded(true); // No more jobs to load
      setLoading(false);
    }, 1000); // Simulate API delay of 1 second
  };

  // Infinite scroll logic using Intersection Observer
  const lastJobElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect(); // Stop observing previous element

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreJobs(); // Load more jobs when bottom is reached
      }
    });
    if (node) observer.current.observe(node); // Start observing the last job element
  };

  // Function to handle applying filters
  const handleFilter = ({ keyword, location, salaryRange }) => {
    let filteredData = [...mockJobs];

    if (keyword) {
      filteredData = filteredData.filter(job =>
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (location) {
      filteredData = filteredData.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Salary range filter (if provided, apply range logic)
    if (salaryRange) {
      const [minSalary, maxSalary] = salaryRange.split('-').map(Number);
      if (!isNaN(minSalary) && !isNaN(maxSalary)) {
        filteredData = filteredData.filter(job => {
          const jobSalary = parseInt(job.salary);
          return jobSalary >= minSalary && jobSalary <= maxSalary;
        });
      }
    }

    setFilteredJobs(filteredData); // Update the state with filtered jobs
    setJobs(filteredData); // Update jobs with the filtered data
  };

  const displayedJobs = viewSaved ? savedJobs : jobs; // Conditional rendering of saved vs filtered jobs

  return (
    <div className="App bg-gray-50 min-h-screen">
      {/* Render Header Component */}
      <Header handleViewSaved={handleViewSaved} />

      {/* Filters Section */}
      <Filters onFilter={handleFilter} />

      {/* Job list container */}
      <div className="job-list-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {displayedJobs.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-700">No jobs available.</p>
        ) : (
          displayedJobs.map((job, index) => {
            const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id); // Check if job is saved

            if (displayedJobs.length === index + 1) {
              return (
                <div
                  key={job.id}
                  ref={lastJobElementRef} // Attach last job to observer for infinite scroll
                  className="job-card bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 object-contain mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                      </div>
                    </div>
                    {/* Bookmark Button */}
                    <button
                      onClick={() => saveJob(job)}
                      className={`p-2 transition duration-300 ${isJobSaved ? 'text-orange-600' : 'text-gray-400'}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isJobSaved ? 'orange' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3l14 0c.552 0 1 .448 1 1l0 16c0 .553-.448 1-1 1l-7-8-7 8c-.552 0-1-.447-1-1l0-16c0-.552.448-1 1-1z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">Salary: ${job.salary}</p>
                </div>
              );
            } else {
              return (
                <div key={job.id} className="job-card bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 object-contain mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                      </div>
                    </div>
                    {/* Bookmark Button */}
                    <button
                      onClick={() => saveJob(job)}
                      className={`p-2 transition duration-300 ${isJobSaved ? 'text-orange-600' : 'text-gray-400'}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isJobSaved ? 'orange' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3l14 0c.552 0 1 .448 1 1l0 16c0 .553-.448 1-1 1l-7-8-7 8c-.552 0-1-.447-1-1l0-16c0-.552.448-1 1-1z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mt-4">Salary: ${job.salary}</p>
                </div>
              );
            }
          })
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="loader w-12 h-12 border-4 border-t-4 border-gray-400 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* If no more jobs */}
      {allJobsLoaded && (
        <p className="text-center text-gray-600 my-6">No more jobs to load</p>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
