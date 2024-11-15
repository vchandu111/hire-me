import Loader from "@/Components/Common/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBookmark,
  FaArrowRight,
} from "react-icons/fa";

const JobsPosted = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
        console.log(jobs);
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

  console.log(userJobs);
  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Your Posted Jobs
      </h1>
      {userJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userJobs.map((job) => (
            <div
              key={job._id}
              className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative flex flex-col justify-between h-full"
            >
              {/* Job Details */}
              <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  ${job.salary}/hr
                </p>
                <h2 className="text-4xl font-bold mb-2 text-gray-800">
                  {job.job_title}
                </h2>
              </div>

              {/* Company and Location */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
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
                <button
                  onClick={() => router.push(`/applicants?id=${job._id}`)}
                  className="flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Applicants <FaArrowRight className="ml-2" />
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
