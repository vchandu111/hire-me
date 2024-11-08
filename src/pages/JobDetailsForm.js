// src/Pages/JobDetailsForm.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import SidebarAds from "../Components/SideBar.jsx";

export default function JobDetailsForm() {
  const router = useRouter();
  const { title } = router.query;

  const [jobTitle, setJobTitle] = useState(title || "");
  const [company, setCompany] = useState("");
  const [workplaceType, setWorkplaceType] = useState("On-site");
  const [jobType, setJobType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (title) {
      setJobTitle(title);
    }
  }, [title]);

  // Predefined skill options
  const skillOptions = [
    { value: "Written Communication", label: "Written Communication" },
    { value: "Communication", label: "Communication" },
    { value: "Test Engineering", label: "Test Engineering" },
    { value: "Test Cases", label: "Test Cases" },
    { value: "System Testing", label: "System Testing" },
    { value: "Test Planning", label: "Test Planning" },
    { value: "Functional Testing", label: "Functional Testing" },
    { value: "Testing", label: "Testing" },
    { value: "Manual Testing", label: "Manual Testing" },
    { value: "Test Automation", label: "Test Automation" },
  ];

  // Validation for form fields
  const validateFields = () => {
    const newErrors = {};
    if (!jobTitle) newErrors.jobTitle = "Please enter the job title.";
    if (!company) newErrors.company = "Please enter the company name.";
    if (!location) newErrors.location = "Please enter the job location.";
    if (!description) newErrors.description = "Please enter the job description.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      // Additional form submission logic here
    }
  };

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions || []);
  };

  // Custom styles for react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : state.isFocused ? "#cce5ff" : "#ffffff",
      color: state.isSelected || state.isFocused ? "#ffffff" : "#000000",
      padding: 10,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#007bff",
      color: "#ffffff",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      padding: "5px",
      marginRight: "5px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      ':hover': {
        backgroundColor: '#0056b3',
        color: '#ffffff',
      },
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #ddd",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
  };

  return (
    <div className="min-h-screen flex bg-gray-50 p-4">
      <div className="flex-grow max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-xl font-semibold mb-4">1 of 2: Review job description</h1>
        <p className="text-gray-600 text-sm mb-4">* Indicates required</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Title*
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Software Engineer"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.jobTitle && (
                <span className="text-red-500 text-sm">{errors.jobTitle}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company*
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.company && (
                <span className="text-red-500 text-sm">{errors.company}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Workplace Type
              </label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Location*
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">{errors.location}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Description*
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              placeholder="Provide a summary of the role, responsibilities, and qualifications"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Skills (Max 10)
            </label>
            <Select
              isMulti
              options={skillOptions}
              value={selectedSkills}
              onChange={handleSkillChange}
              placeholder="Select or type skills..."
              styles={customStyles}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Sidebar Ads */}
      <div className="w-1/4 ml-8 hidden lg:block">
        <SidebarAds />
      </div>
    </div>
  );
}
