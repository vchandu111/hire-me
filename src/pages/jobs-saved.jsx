import Loader from "@/Components/Common/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBookmark,
  FaArrowRight,
} from "react-icons/fa";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchSavedJobs = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch("http://localhost:3000/saved-jobs"); // Fetch all saved jobs
        if (!response.ok) throw new Error("Failed to fetch saved jobs");

        const jobs = await response.json();

        // Filter jobs for the current user
        const userSavedJobs = jobs.filter((job) => job.userId === userId);
        setSavedJobs(userSavedJobs);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) return <Loader />;

  console.log(savedJobs);
  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Your Saved Jobs
      </h1>
      {savedJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((savedJob) => (
            <div
              key={savedJob._id}
              className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative flex flex-col justify-between h-full"
            >
              {/* Bookmark Icon */}
              <div className="absolute top-4 right-4 text-blue-600">
                <FaBookmark size={20} />
              </div>

              {/* Job Details */}
              <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  ${savedJob.job.salary}/hr
                </p>
                <h2 className="text-4xl font-bold mb-2 text-gray-800">
                  {savedJob.job.job_title}
                </h2>
              </div>

              {/* Company and Location */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {savedJob.job.company_name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {savedJob.job.place}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/jobs?id=${savedJob.job._id}`)}
                  className="flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No saved jobs yet.</p>
      )}
    </div>
  );
};

export default SavedJobs;
