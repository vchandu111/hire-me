import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaBuilding,
  FaImage,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIndustry,
  FaBusinessTime,
  FaHome,
  FaCity,
  FaCloud,FaCloudUploadAlt
} from "react-icons/fa";

const StepOne = ({ companyData, setCompanyData, onSuccess }) => {
  const [formData, setFormData] = useState(companyData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // State to store selected file

  const router = useRouter();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmployeeCountChange = (value) => {
    setEmployeeCount(value);
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Prepare form data with file upload
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("company_name", formData.company_name);
    formDataToSubmit.append(
      "company_description",
      formData.company_description
    );
    formDataToSubmit.append("company_location", formData.company_location);
    formDataToSubmit.append("company_type", formData.company_type);
    formDataToSubmit.append("industry_type", formData.industry_type);
    formDataToSubmit.append("business_nature", formData.business_nature);
    formDataToSubmit.append("employee_count", employeeCount);
    formDataToSubmit.append("remote", formData.remote);
    if (avatarFile) {
      formDataToSubmit.append("company_avatar", avatarFile); // Add image file to form data
    }

    try {
      const response = await fetch("http://localhost:3000/company", {
        method: "POST",
        body: formDataToSubmit, // Use FormData as the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      setCompanyData(result); // Update company data in parent
      onSuccess(); // Move to the next step
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left section with text information */}
      <div className="hidden md:flex md:w-1/3 bg-blue-800 text-white p-10 flex-col justify-center ">
        <h2 className="text-2xl font-bold mb-4">Why Choose Hire Me? 👋</h2>
        <div className="mb-6">
          <p className="text-lg mb-2">Your One-Stop Hiring Solution</p>
          <p className="text-sm text-gray-300 mb-2">
            A seamless platform to connect with top talent quickly and
            effectively.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              AI-driven smart job listings to attract the right candidates
            </li>
            <li>Enhanced visibility with 30 days of job posting access</li>
            <li>
              Customizable application tracking to streamline your process
            </li>
          </ul>
        </div>
      </div>

      {/* Right section with form */}
      <div className="md:w-2/3 w-full h-full flex justify-center items-center overflow-y-auto p-8">
        <form
          className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-blue-500 md:col-span-2">
            Step 1: Register Your Company
          </h2>
          {errorMessage && (
            <p className="text-red-600 text-center md:col-span-2">
              {errorMessage}
            </p>
          )}
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <span
                onClick={() => router.push("/StepTwo")}
                className="text-blue-500 font-semibold cursor-pointer  hover:text-blue-700"
              >
                Post your job here
              </span>
            </p>
          </div>

          {/* Company Name */}
          <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              placeholder="e.g., Swiggy"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Avatar URL */}
          {/* <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Company Avatar URL
            </label>
            <input
              type="text"
              name="company_avatar"
              placeholder="Enter avatar URL"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.company_avatar}
              onChange={handleChange}
            />
          </div> */}
          {/* <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Avatar
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaCloudUploadAlt className="text-blue-500 text-2xl mr-2" />
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="hidden"
              />
              <span className="text-sm text-gray-600 truncate">
                {avatarFile ? avatarFile.name : "No file chosen"}
              </span>
            </div>
          </div>

          {/* Company Description */}
          <div className="md:col-span-2">
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              name="company_description"
              placeholder="Enter a brief description"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.company_description}
              onChange={handleChange}
            />
          </div>

          {/* Number of Employees */}
          <div className="md:col-span-2">
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Number of Employees
            </label>
            <div className="flex space-x-2 mt-2">
              {[
                "0-50",
                "51-100",
                "101-300",
                "301-500",
                "501-1000",
                "1000 above",
              ].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleEmployeeCountChange(range)}
                  className={`px-3 py-2 rounded-lg transition border ${
                    employeeCount === range
                      ? "bg-blue-200 text-blue-600 border-blue-500"
                      : "text-blue-500 border-blue-500"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Remote Options */}
          <div className="md:col-span-2">
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Remote Options
            </label>
            <div className="flex space-x-2">
              {[
                {
                  label: "Work from Home",
                  value: "Work from Home",
                  icon: <FaHome />,
                },
                {
                  label: "Work from Office",
                  value: "Work from Office",
                  icon: <FaCity />,
                },
                { label: "Hybrid", value: "Hybrid", icon: <FaCloud /> },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, remote: option.value })
                  }
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition border ${
                    formData.remote === option.value
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

          {/* Company Location */}
          <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Company Location
            </label>
            <input
              type="text"
              name="company_location"
              placeholder="Enter location"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.company_location}
              onChange={handleChange}
            />
          </div>

          {/* Company Type Options */}
          <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Company Type
            </label>
            <div className="flex space-x-2">
              {["Corporate", "MNC", "Startup"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, company_type: type })
                  }
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition border ${
                    formData.company_type === type
                      ? "bg-blue-200 text-blue-600 border-blue-500"
                      : "text-blue-500 border-blue-500"
                  }`}
                >
                  <FaBriefcase
                    className={
                      formData.company_type === type
                        ? "text-blue-600"
                        : "text-blue-500"
                    }
                  />
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Industry Type */}
          <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Industry Type
            </label>
            <input
              type="text"
              name="industry_type"
              placeholder="e.g., IT Services"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.industry_type}
              onChange={handleChange}
            />
          </div>

          {/* Business Nature */}
          <div>
            <label className=" mb-2 block text-sm font-medium text-gray-700">
              Business Nature
            </label>
            <input
              type="text"
              name="business_nature"
              placeholder="e.g., B2B, B2C"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.business_nature}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-md flex items-center justify-center space-x-2 transition ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } md:col-span-2`}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
