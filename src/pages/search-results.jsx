import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from "@/Components/Common/Footer";

const SearchResults = () => {
  const router = useRouter();
  const { title, location } = router.query; // Get search parameters from URL
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fetch all jobs from the API when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Apply the filters based on title and location
    if (jobs.length > 0) {
      const filtered = jobs.filter((job) => {
        const matchesTitle = title
          ? job.job_title.toLowerCase().includes(title.toLowerCase())
          : true;
        const matchesLocation = location
          ? job.place.toLowerCase().includes(location.toLowerCase())
          : true;
        return matchesTitle || matchesLocation;
      });
      setFilteredJobs(filtered);
    }
  }, [title, location, jobs]);

  return (
    <>
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Showing {filteredJobs.length} Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-gradient-to-r from-blue-100 via-white to-blue-50 bg-white border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {job.job_type.toUpperCase()}
              </h3>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {job.job_title}
              </h2>
              <p className="text-gray-600 mt-2">
                {job.job_description.slice(0, 100)}...
              </p>
              <div className="flex items-center mt-4 text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> {job.place}
              </div>
              <p className="text-green-500 font-semibold mt-2">
                ${job.salary.toLocaleString()}
              </p>
              <button
                onClick={() => router.push(`/jobs?id=${job._id}`)}
                className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4"
              >
                Apply Job
              </button>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No jobs found.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default SearchResults;
