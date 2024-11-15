import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        // Limit the results to the first 4 jobs
        setJobs(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-blue-500 font-semibold text-sm uppercase mb-2">
        Recently Added Jobs
      </h2>
      <h3 className="text-3xl font-bold mb-8">
        Featured Jobs Posts For This Week
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex flex-col space-y-2 w-full sm:w-3/4">
              <span
                className={`text-sm font-bold ${
                  job.job_type === "Full-time"
                    ? "text-green-500"
                    : job.job_type === "Part-time"
                    ? "text-blue-500"
                    : "text-purple-500"
                }`}
              >
                {job.job_type.toUpperCase()}
              </span>
              <h4 className="text-xl font-semibold text-gray-900">
                {job.job_title}
              </h4>
              <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4">
                <span className="flex items-center">
                  <FaBuilding className="mr-1" /> {job.company_name}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {job.place}
                </span>
                <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-xs mt-2 sm:mt-0">
                  {job.skills[0]} {/* Display first skill as category */}
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
              <span className="text-gray-500 text-xs">
                {Math.floor(Math.random() * 30) + 1} DAYS LEFT
              </span>
              <span className="bg-green-100 text-green-500 font-semibold px-2 py-1 rounded-md text-lg">
                ${job.salary}
              </span>
              <button
                onClick={() => router.push(`/jobs?id=${job._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
              >
                Apply Job
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/jobs")}
          className="text-blue-500 font-semibold border border-blue-500 px-6 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
        >
          View More
        </button>
      </div>
    </section>
  );
};

export default JobPosts;
