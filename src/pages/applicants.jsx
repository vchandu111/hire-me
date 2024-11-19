import Loader from "@/Components/Common/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaDownload,
  FaPhone,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaClock,
} from "react-icons/fa";
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
        <div className="container m-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20" >
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-white border rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl hover:border-blue-500 relative flex flex-col justify-between h-full"
            >
              {/* Application Date */}
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {new Date(applicant.appliedAt).toLocaleDateString()}
              </div>

              {/* Job Details */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-blue-600 truncate flex items-center space-x-2">
                  <FaBriefcase className="text-blue-500" />
                  <span>{applicant.jobId.job_title}</span>
                </h2>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Applicant Info */}
              <div className="mb-4 space-y-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">
                  Applicant Info
                </h3>
                <p className="text-sm text-gray-800 flex items-center space-x-2">
                  <FaEnvelope className="text-blue-500" />
                  <span>{applicant.email}</span>
                </p>
                <p className="text-sm text-gray-800 flex items-center space-x-2">
                  <FaPhone className="text-blue-500" />
                  <span>{applicant.phone}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* CTC Details */}
              <div className="mb-4 space-y-1">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">
                  CTC Details
                </h3>
                <p className="text-sm text-gray-800 flex items-center space-x-2">
                  <FaMoneyBillAlt className="text-green-500" />
                  <span>Current: {applicant.currentCTC} LPA</span>
                </p>
                <p className="text-sm text-gray-800 flex items-center space-x-2">
                  <FaMoneyBillAlt className="text-green-500" />
                  <span>Expected: {applicant.expectedCTC} LPA</span>
                </p>
                <p className="text-sm text-gray-800 flex items-center space-x-2">
                  <FaClock className="text-yellow-500" />
                  <span>Notice: {applicant.noticePeriod} days</span>
                </p>
              </div>

              {/* Download Resume Button */}
              <a
                href={`http://localhost:3000${applicant.resumePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-center inline-flex items-center justify-center space-x-2"
                download
              >
                <FaDownload className="text-white text-lg" />
                <span>Download Resume</span>
              </a>
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
