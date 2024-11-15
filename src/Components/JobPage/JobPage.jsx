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
  FaBookmark,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchRole, setSearchRole] = useState("");
  const [filterLocation, setFilterLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedJobsFromStorage =
        JSON.parse(localStorage.getItem("savedJobs")) || [];
      setSavedJobs(savedJobsFromStorage);
    }
  }, []);

  // Fetch jobs and locations from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs")
      .then((response) => {
        const jobsData = response.data;
        setJobs(jobsData);
        setFilteredJobs(jobsData);

        const uniqueLocations = [
          ...new Set(jobsData.map((job) => job.place)),
        ].map((location) => ({ value: location, label: location }));
        setLocations(uniqueLocations);

        if (jobsData.length > 0) {
          setSelectedJob(jobsData[0]);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Fetch companies from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => console.error("Error fetching companies:", error));
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

    const matchingCompany = companies.find(
      (company) => company.company_name === job.company_name
    );
    setSelectedCompany(matchingCompany || null);
  };

  const handleSaveJob = async (job) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please log in to save jobs.");
        return;
      }

      const response = await fetch("http://localhost:3000/save-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, job }),
      });

      if (response.ok) {
        setSavedJobs((prev) => [...prev, job._id]);
        localStorage.setItem(
          "savedJobs",
          JSON.stringify([...savedJobs, job._id])
        );
        toast.success("Job saved successfully!");
      } else {
        toast.error("Failed to save job. Try again later.");
      }
    } catch (error) {
      toast.error("Error saving job. Please try again later.");
    }
  };

  // Helper function to get initials from company name
  const getInitials = (companyName) => {
    const words = companyName.split(" ");
    const initials = words[0][0] + (words[1] ? words[1][0] : "");
    return initials.toUpperCase();
  };

  return (
    <div className="container m-auto flex flex-col md:flex-row min-h-screen bg-[#f3f2ee]">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left Column: Job List */}
      <div className="w-full md:w-1/3 h-full md:h-screen sticky top-0 overflow-y-auto bg-white border-r border-gray-200">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
          <h2 className="text-blue-600 font-bold text-xl mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-blue-500" /> Job Filters
          </h2>

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

              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-blue-500">
                  {job.job_title}
                </h3>
                <p className="text-gray-700 font-semibold">
                  {job.company_name}
                </p>
                <div className="flex items-center text-gray-500 text-sm mt-2 font-semibold">
                  <FaMapMarkerAlt className="mr-1" />
                  {job.place} {job.remote}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveJob(job);
                }}
                className={`${
                  savedJobs.includes(job._id)
                    ? "text-blue-600"
                    : "text-gray-400"
                } hover:text-blue-600 transition`}
              >
                <FaBookmark />
              </button>
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
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto h-full space-y-6">
            <div className="flex items-center space-x-3">
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

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedJob.company_name}
                </h3>
                <h4 className="text-2xl font-bold text-gray-900">
                  {selectedJob.job_title}
                </h4>
              </div>
            </div>

            <div className="flex items-center text-gray-700 space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span className="text-blue-600 font-semibold">
                {selectedJob.place}, {selectedJob.remote}
              </span>
            </div>

            <div className="flex space-x-4 items-center text-sm text-gray-600 font-semibold">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                ₹{selectedJob.salary}/year
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {selectedJob.work_mode}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                {selectedJob.job_type}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
                {selectedJob.experience_level}
              </span>
            </div>

            <div className="space-y-4 bg-white">
              <div className="flex items-center text-gray-600 text-sm">
                <FaUserFriends className="text-blue-600" />
                <span className="font-semibold text-blue-600 mx-2">
                  {Math.floor(Math.random() * 50) + 1} alumni work here
                </span>
              </div>

              <div className="flex items-center text-gray-600 text-sm space-x-2">
                <FaClipboardList className="text-green-600" />
                <span className="font-semibold text-green-600">
                  Skills: {selectedJob.skills.slice(0, 2).join(", ")}, +
                  {selectedJob.skills.length - 2} more
                </span>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
                Easy Apply
              </button>
              <button
                className={`px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition ${
                  savedJobs.includes(selectedJob._id)
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveJob(selectedJob);
                }}
              >
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

            {selectedCompany && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  About the company
                </h4>
                <div className="flex items-center mt-2">
                  <img
                    src={selectedCompany.company_avatar}
                    alt={selectedCompany.company_name}
                    className="w-10 h-10 mr-3 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-bold">
                      {selectedCompany.company_name}
                    </p>
                    <p className="text-gray-600">
                      {selectedCompany.company_location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedCompany.industry_type} -{" "}
                      {selectedCompany.business_nature}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">
                  {selectedCompany.company_description}
                </p>
              </div>
            )}
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
