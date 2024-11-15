import Loader from "@/Components/Common/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Applicants = () => {
  const router = useRouter();
  const { id } = router.query; // Extract jobId from URL
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait for the `id` param to be available

    const fetchApplicants = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:3000/job-applications",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const result = await response.json();
        setApplicants(result);

        // Filter applicants matching the jobId from URL params
        const filtered = result.filter(
          (applicant) => applicant.jobId._id === id
        );
        setFilteredApplicants(filtered);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]); // Refetch if the URL param changes

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        Job Applicants
      </h1>
      {filteredApplicants.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:border-blue-500 relative flex flex-col justify-between h-full"
            >
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {new Date(applicant.appliedAt).toLocaleDateString()}
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {applicant.jobId.job_title}
                </h2>
                <p className="text-sm text-gray-600">
                  {applicant.jobId.company_name}
                </p>
                <p className="text-sm text-gray-500">{applicant.jobId.place}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-600">
                  Applicant Info
                </h3>
                <p className="text-sm text-gray-800">
                  <strong>Email:</strong> {applicant.email}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Phone:</strong> {applicant.phone}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-600">
                  CTC Details
                </h3>
                <p className="text-sm text-gray-800">
                  <strong>Current CTC:</strong> {applicant.currentCTC} LPA
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Expected CTC:</strong> {applicant.expectedCTC} LPA
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Notice Period:</strong> {applicant.noticePeriod} days
                </p>
              </div>

              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                View Full Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No applicants found for this job.
        </div>
      )}
    </div>
  );
};

export default Applicants;
