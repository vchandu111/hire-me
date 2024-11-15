import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaIndustry,
  FaMapMarkerAlt,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import Loader from "@/Components/Common/Loader";

const CompanyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  const companyDetails = [
    { icon: <FaIndustry className="text-lg" />, label: company?.industry_type },
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      label: company?.company_location,
    },
    {
      icon: <FaUsers className="text-lg" />,
      label: `${company?.employee_count} employees`,
    },
    { icon: <FaBriefcase className="text-lg" />, label: company?.remote },
  ];

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/company/${id}`)
        .then((response) => response.json())
        .then((data) => setCompany(data))
        .catch((error) => console.error("Error fetching company data:", error));
    }
  }, [id]);

  useEffect(() => {
    // Fetch jobs and filter based on the company name
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        if (company) {
          // Filter jobs by the specific company name
          const filteredJobs = data.filter(
            (job) => job.company_name === company.company_name
          );
          setJobs(filteredJobs);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [company]);

  if (!company) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-800 text-white w-full md:w-72 h-screen fixed top-0 left-0 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Company Logo */}
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
          <img
            src={company.company_avatar || "https://via.placeholder.com/100"}
            alt={company.company_name}
            className="w-24 h-24 rounded-full"
          />
        </div>

        {/* Company Name */}
        <h1 className="text-2xl font-bold text-center">
          {company.company_name}
        </h1>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4">
          <FaGlobe className="text-2xl cursor-pointer hover:text-purple-300" />
          <FaInstagram className="text-2xl cursor-pointer hover:text-purple-300" />
          <FaLinkedin className="text-2xl cursor-pointer hover:text-purple-300" />
        </div>

        {/* Company Details */}
        <div className="text-sm mt-8">
          <div className="m-auto flex flex-col justify-center">
            {companyDetails.map((detail, index) => (
              <div
                key={index}
                className="flex gap-2 mt-2 items-center shadow-lg p-2"
              >
                <p>{detail.icon}</p>
                <p>{detail.label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 md:ml-72 overflow-y-auto">
        {/* About Section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-gray-700 mt-2">{company.company_description}</p>

          {/* Benefits Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Benefits</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Free Food / Snacks",
                "Paid Sick Days",
                "Team Building Activity",
                "Competitive Salary",
                "Medical Insurance",
              ].map((benefit, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-black-600 rounded-full text-sm"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Jobs Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Jobs</h3>
            <div className="flex flex-col space-y-4 mt-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">{job.job_title}</h4>
                      <p className="text-sm text-gray-600">
                        {job.place} • {job.job_type} • {job.work_mode}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/jobs?id=${job._id}`)}
                      className="text-white font-semibold text-sm bg-blue-600 px-4 py-1 rounded-lg"
                    >
                      View Job
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Opening currently.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyDetail;
