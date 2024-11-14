import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaDollarSign, FaBookmark, FaArrowRight } from "react-icons/fa";

const JobsPosted = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in local storage.");
          return;
        }

        const response = await fetch("http://localhost:3000/jobs"); // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const jobs = await response.json();
        const userSpecificJobs = jobs.filter((job) => job.userId === userId);
        setUserJobs(userSpecificJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserJobs();
  }, []);

  if (loading) return <div className="text-center py-8">Loading jobs...</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Your Posted Jobs
      </h1>
      {userJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative"
            >
              {/* Job Details */}
              <div className="absolute top-4 right-4 text-gray-500">
                <FaBookmark size={20} />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                ${job.salary}/hr
              </p>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {job.job_title}
              </h2>
              <p className="text-gray-600 text-sm mb-6">{job.job_description}</p>

              {/* Company and Location */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/32" // Placeholder for company logo
                    alt="company logo"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {job.company_name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.place}
                    </p>
                  </div>
                </div>
                <button className="flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No jobs posted yet.</p>
      )}
    </div>
  );
};

export default JobsPosted;
