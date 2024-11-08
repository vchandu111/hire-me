import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaTimes,
  FaMoneyBillWave,
  FaClock,
  FaArrowLeft,
  FaUserFriends,
  FaClipboardList,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Fetch jobs from the API
  useEffect(() => {
    axios
      .get("https://672d0153fd89797156411066.mockapi.io/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

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
        <h2 className="text-blue-500 font-semibold text-lg p-4 border-b border-gray-200">
          Recently Added Jobs
        </h2>
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => handleJobClick(job)}
            className={`p-4 cursor-pointer hover:bg-blue-50 flex items-start ${
              selectedJob?.id === job.id ? "bg-blue-100" : ""
            }`}
          >
            {/* Company Logo or Initials */}
            <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
              {getInitials(job.company_name)}
            </div>

            {/* Job Information */}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-blue-500">
                {job.job_title}
              </h3>
              <p className="text-gray-700">{job.company_name}</p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <FaMapMarkerAlt className="mr-1" />
                {job.place} {job.remote ? "(Remote)" : "(On-site)"}
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {job.job_type ? "Full-time" : "Part-time"}
              </p>
            </div>
            {/* Close button */}
            <FaTimes
              onClick={() => setSelectedJob(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Right Column: Job Details */}
      <div
        className={`flex-1 overflow-y-auto ${
          showOverlay ? "fixed inset-0 bg-white z-50 p-6 md:static md:bg-transparent md:shadow-none" : ""
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
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto h-full">
            <div className="flex items-center space-x-4">
              {/* Company Logo or Initials */}
              <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-lg">
                {getInitials(selectedJob.company_name)}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedJob.job_title}
                </h3>
                <p className="text-gray-700">{selectedJob.company_name}</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <FaMapMarkerAlt className="mr-1" />
                  {selectedJob.place}{" "}
                  {selectedJob.remote ? "(Remote)" : "(On-site)"}
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedJob.job_type ? "Full-time" : "Part-time"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <FaBriefcase className="mr-2" />
              Hybrid · Full-time · Mid-Senior level
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <FaUserFriends className="mr-2" />
              27 school alumni work here
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <FaClipboardList className="mr-2" />
              Skills: Java, Data Structures, +9 more
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <FaClock className="mr-2" />
              Applicant review time is typically 1-2 weeks{" "}
              <a href="#" className="text-blue-500 ml-1">Learn more</a>
            </div>

            <div className="mt-4 flex items-center text-gray-600 text-sm">
              <FaInfoCircle className="mr-2" />
              See how you compare to over 100 other applicants.{" "}
              <a href="#" className="text-blue-500 ml-1">Reactivate Premium</a>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold flex items-center">
                <FaCheckCircle className="mr-2" /> Easy Apply
              </button>
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md font-semibold">
                Save
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900">
                About the job
              </h4>
              <p className="text-gray-700 mt-2">
                {selectedJob.job_description}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Company Description
              </h4>
              <p className="text-gray-700 mt-2">
                {selectedJob.company_description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Select a job to view details
          </p>
        )}
      </div>
    </div>
  );
};

export default JobPage;
