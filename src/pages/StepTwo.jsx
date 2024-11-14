import {
  FaHome,
  FaCity,
  FaCloud,
  FaLightbulb,
  FaUserCheck,
  FaChartLine,
  FaClock,
  FaPlusCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const cardData = [
  {
    icon: <FaLightbulb />,
    title: "Target your job to the right people",
    description:
      "Include a job description and add required skills to target job seekers who match your criteria.",
  },
  {
    icon: <FaUserCheck />,
    title: "Get quality applications",
    description:
      "Define specific requirements to help attract high-quality candidates who meet your job criteria.",
  },
  {
    icon: <FaChartLine />,
    title: "Track job performance",
    description:
      "Monitor the number of views and applications your job posting is receiving in real-time.",
  },
  {
    icon: <FaClock />,
    title: "Save time on recruitment",
    description:
      "Automate parts of your hiring process to reduce time-to-hire and get the right candidate faster.",
  },
];

function InfoCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 border rounded-md p-4 shadow-sm mb-4 w-72 mt-4">
      <div className="flex items-start">
        <div className="text-blue-600 mr-2 mt-1">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function StepTwo() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState(""); // Set initial state for work mode
  const [experienceLevel, setExperienceLevel] = useState("");
  const [errors, setErrors] = useState({});
  const [companyOptions, setCompanyOptions] = useState([]);
  const router = useRouter();
  const handleWorkModeChange = (mode) => setWorkMode(mode);

  const onRegisterCompany = () => {
    // Redirect to StepOne for company registration
    router.push("MultipStepForm"); // Update the path to StepOne as needed
  };

  // Fetch company names from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:3000/companies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const companies = await response.json();
        // Extract company names
        const options = companies.map((company) => ({
          value: company.company_name,
          label: company.company_name,
        }));
        setCompanyOptions(options);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    const formData = {
      userId,
      company_name: companyName,
      job_description: jobDescription,
      salary: parseInt(salary, 10),
      place: location,
      skills: skills.split(",").map((skill) => skill.trim()),
      job_type: jobType,
      work_mode: workMode,
      experience_level: experienceLevel,
      job_title: jobTitle,
    };

    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response status:", response.status);
        console.error("Response text:", errorText);
        throw new Error("Failed to submit job post");
      }

      const result = await response.json();
      console.log("Job posted successfully:", result);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="md:w-2/3 w-full h-full flex justify-center items-center overflow-y-auto p-8">
        <form
          className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-blue-500 md:col-span-2">
            Step 2: Post Your Job
          </h2>
          {Object.values(errors).length > 0 && (
            <p className="text-red-600 text-center md:col-span-2">
              Please fill in the required fields.
            </p>
          )}

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title*
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Backend Engineer"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name*
            </label>
            <select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a company</option>
              {companyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div
              className="mt-6 flex items-center justify-center space-x-3 p-3 bg-blue-100 border border-blue-300 rounded-lg cursor-pointer transition hover:bg-blue-200 hover:border-blue-400"
              onClick={onRegisterCompany}
            >
              <FaPlusCircle className="text-blue-500 text-lg" />
              <span className="text-blue-600 font-semibold">
                Register New Company
              </span>
            </div>
          </div>

          {/* Workplace Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Workplace Type
            </label>
            <div className="flex space-x-2 mt-2">
              {[
                { label: "On-site", value: "On-site", icon: <FaCity /> },
                { label: "Remote", value: "Remote", icon: <FaHome /> },
                { label: "Hybrid", value: "Hybrid", icon: <FaCloud /> },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleWorkModeChange(option.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition border ${
                    workMode === option.value
                      ? "bg-blue-200 text-blue-600 border-blue-500"
                      : "text-blue-500 border-blue-500"
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary*
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., 150000"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <input
              type="text"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              placeholder="e.g., Junior Level"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Description*
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="2"
              placeholder="Describe the role, responsibilities, and qualifications"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Java, Python, Machine Learning"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Sidebar for advertisements or additional content */}
      <div className="w-1/4 ml-8 hidden lg:block">
        {cardData.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
