import React from 'react';

function JobCard({ job, saveJob }) {
  const handleBookmarkClick = () => {
    saveJob(job); // Save the job when the bookmark button is clicked
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <img
          src={job.companyLogo}
          alt={job.company}
          className="company-logo"
        />
        <div className="company-info">
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
        </div>
        <button
          onClick={handleBookmarkClick}
          className="bookmark-btn"
        >
          <i className="fas fa-bookmark"></i> {/* Bookmark Icon */}
        </button>
      </div>
      <p>Salary: ${job.salary}</p>
    </div>
  );
}

export default JobCard;
