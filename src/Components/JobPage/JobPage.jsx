import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaTimes,
  FaUserFriends,
  FaClipboardList,
  FaArrowLeft,
} from "react-icons/fa";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchRole, setSearchRole] = useState("");
  const [filterLocation, setFilterLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  // Fetch jobs and locations from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => {
        const jobsData = response.data;
        setJobs(jobsData);
        setFilteredJobs(jobsData);

        // Extract unique locations for dropdown
        const uniqueLocations = [
          ...new Set(jobsData.map((job) => job.place)),
        ].map((location) => ({ value: location, label: location }));
        setLocations(uniqueLocations);

        // Set the first job as the default selected job
        if (jobsData.length > 0) {
          setSelectedJob(jobsData[0]);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Filter jobs based on searchRole and filterLocation
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.job_title.toLowerCase().includes(searchRole.toLowerCase()) &&
        (filterLocation === null || job.place === filterLocation.value)
    );
    setFilteredJobs(filtered);
  }, [searchRole, filterLocation, jobs]);

  // Handle job selection
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowOverlay(true);
  };

  // Helper function to get initials from company name
  const getInitials = (companyName) => {
    const words = companyName.split(" ");
    const initials = words[0][0] + (words[1] ? words[1][0] : "");
    return initials.toUpperCase();
  };

  return (
    <div className="container m-auto flex flex-col md:flex-row min-h-screen bg-[#f3f2ee]">
      {/* Left Column: Job List */}
      <div className="w-full md:w-1/3 h-full md:h-screen sticky top-0 overflow-y-auto bg-white border-r border-gray-200">
        {/* Sticky Filter Section at the Top */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
          <h2 className="text-blue-600 font-bold text-xl mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-blue-500" /> Job Filters
          </h2>
          
          {/* Search by Job Role */}
          <div className="relative mb-4">
            <FaBriefcase className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              placeholder="Search by job role"
              className="w-full p-2 pl-10 border rounded-md focus:ring focus:ring-blue-200 bg-blue-50 placeholder-blue-500 text-blue-700"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>

          {/* Filter by Location */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-blue-500 z-10 pointer-events-none" />
            <Select
              options={locations}
              placeholder="Filter by location"
              value={filterLocation}
              onChange={setFilterLocation}
              isClearable
              className="w-full"
              styles={{
                control: (base) => ({
                  ...base,
                  padding: "2px",
                  paddingLeft: "2.5rem",
                  borderRadius: "8px",
                  borderColor: "#93c5fd",
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#3b82f6",
                }),
              }}
            />
          </div>
        </div>

        {/* Job List */}
        <div className="overflow-y-auto">
          <h2 className="text-blue-500 font-semibold text-lg p-4 underline">
            Recently Added Jobs
          </h2>
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleJobClick(job)}
              className={`p-4 cursor-pointer flex items-start ${
                selectedJob?._id === job._id ? "bg-blue-100" : ""
              } hover:bg-blue-50 transition duration-150 ease-in-out`}
            >
              {/* Company Logo or Initials */}
              <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
                {job.company_avatar ? (
                  <img
                    src={job.company_avatar}
                    alt={job.company_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(job.company_name)
                )}
              </div>

              {/* Job Information */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-blue-500">
                  {job.job_title}
                </h3>
                <p className="text-gray-700">{job.company_name}</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <FaMapMarkerAlt className="mr-1" />
                  {job.place} {job.remote}
                </div>
                <p className="text-gray-600 text-sm mt-1">{job.job_type}</p>
              </div>
              {/* Close button */}
              
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Job Details */}
      <div
        className={`flex-1 overflow-y-auto p-6 ${
          showOverlay
            ? "fixed inset-0 bg-white z-50 md:static md:bg-transparent md:shadow-none"
            : ""
        }`}
      >
        {showOverlay && (
          <button
            onClick={() => setShowOverlay(false)}
            className="mb-4 flex items-center text-blue-500 text-sm font-semibold md:hidden"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jobs
          </button>
        )}

        {selectedJob ? (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto h-full space-y-4">
            {/* Company Logo and Title */}
            <div className="flex items-center space-x-3">
              {/* Company Logo */}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-lg">
                {selectedJob.company_avatar ? (
                  <img
                    src={selectedJob.company_avatar}
                    alt={selectedJob.company_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(selectedJob.company_name)
                )}
              </div>
              
              {/* Company Name and Job Title */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedJob.company_name}</h3>
                <h4 className="text-2xl font-bold text-gray-900">{selectedJob.job_title}</h4>
              </div>
            </div>

            {/* Job Location, Posted Time, and Applicants */}
            <div className="flex items-center text-gray-500 text-sm space-x-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{selectedJob.place}, {selectedJob.remote}</span>
              <span className="mx-1">·</span>
              <span>2 weeks ago</span>
              <span className="mx-1">·</span>
              <span>Over {selectedJob.no_of_application} applicants</span>
            </div>

            {/* Job Type, Experience Level */}
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <FaBriefcase className="text-gray-400" />
              <span>{selectedJob.remote}</span>
              <span className="mx-1">·</span>
              <span>{selectedJob.job_type}</span>
              <span className="mx-1">·</span>
              <span>{selectedJob.experience_level}</span>
            </div>

            {/* Alumni and Skills */}
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <FaUserFriends className="text-gray-400" />
              <span>3 school alumni work here</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <FaClipboardList className="text-gray-400" />
              <span>Skills: {selectedJob.skills.slice(0, 2).join(", ")}, +{selectedJob.skills.length - 2} more</span>
            </div>

            {/* Job Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900">About the job</h4>
              <p className="text-gray-700 mt-2">{selectedJob.job_description}</p>
            </div>

            {/* Company Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900">About the company</h4>
              <p className="text-gray-700 mt-2">{selectedJob.company_description}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Select a job to view details</p>
        )}
      </div>
    </div>
  );
};

export default JobPage;
