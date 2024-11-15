import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const JobsApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/job-applications", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          const userSpecificJobs = data.filter((job) => job.userId === userId);
          setFilteredJobs(userSpecificJobs);
        } else {
          console.error("Failed to fetch job applications.");
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchAppliedJobs();
  }, [userId]);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Jobs You've Applied For
      </h1>
      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative flex flex-col justify-between h-full"
            >
              {/* Job Details */}
              <div className="flex-grow">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {job.jobId.job_title}
                </h2>
              </div>

              {/* Company and Location */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {job.jobId.company_name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.jobId.place}
                    </p>
                  </div>
                </div>
              </div>

              {/* Applied Date */}
              <p className="text-gray-500 mt-4 text-sm">
                <strong>Applied On:</strong>{" "}
                {new Date(job.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No jobs applied yet.
        </p>
      )}
    </div>
  );
};

export default JobsApplied;
