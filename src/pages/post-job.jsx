import Footer from "@/Components/Common/Footer";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  FaUsers,
  FaCheckCircle,
  FaRegClock,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function JobPosting() {
  const [jobTitle, setJobTitle] = useState(""); // State for job title
  const [openFAQ, setOpenFAQ] = useState(null); // State to track which FAQ is open
  const router = useRouter();

  // Function to handle Next button click
  const handleNext = () => {
    if (jobTitle.trim()) {
      router.push(`/JobDetailsForm?title=${encodeURIComponent(jobTitle)}`);
    } else {
      alert("Please enter the job title.");
    }
  };

  // Function to toggle FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
        <div className="mb-6">
          <FaUsers className="text-blue-600" size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Post a Job and Find Top Talent
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Reach thousands of qualified candidates quickly and easily.
        </p>
        <div className="w-full max-w-md mb-6">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="job-title"
          >
            Job Title
          </label>
          <input
            type="text"
            id="job-title"
            placeholder="e.g., Software Engineer"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)} // Update job title state
          />
        </div>
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleNext} // Navigate to the next page
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
        <p className="text-center text-gray-500 text-md mt-6 max-w-md">
          Posting a job is free. Reach a vast pool of qualified candidates and
          fill your role faster.
        </p>
        <p className="text-center text-gray-500 text-md mt-2 max-w-md">
          For more information on our job posting guidelines,{" "}
          <a href="#" className="text-blue-600 underline">
            click here
          </a>
          .
        </p>
      </div>

      {/* Why Post a Job Here? */}
      <section className="w-full max-w-4xl mt-16 text-center mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Why Post a Job Here?
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <FaRegClock className="text-blue-600 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Hiring
            </h3>
            <p className="text-gray-600">
              80% of jobs receive qualified applicants within the first day.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <FaCheckCircle className="text-blue-600 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-900">
              Verified Candidates
            </h3>
            <p className="text-gray-600">
              Access a pool of thoroughly vetted candidates.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <FaMoneyBillWave className="text-blue-600 mb-2" size={32} />
            <h3 className="text-lg font-semibold text-gray-900">
              Affordable Pricing
            </h3>
            <p className="text-gray-600">
              Flexible pricing plans that suit your hiring needs.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-4xl mt-16 text-center mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <span className="text-3xl font-extrabold text-blue-600 mb-2">
              1
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              Create Your Job Post
            </h3>
            <p className="text-gray-600">
              Fill in the job details to start attracting candidates.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <span className="text-3xl font-extrabold text-blue-600 mb-2">
              2
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              Receive Applications
            </h3>
            <p className="text-gray-600">
              Candidates apply to your job post, and you review applications.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-md bg-white shadow">
            <span className="text-3xl font-extrabold text-blue-600 mb-2">
              3
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              Hire the Best Fit
            </h3>
            <p className="text-gray-600">
              Choose the most qualified candidate and make your offer.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full max-w-4xl mt-16 text-center mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Success Stories
        </h2>
        <p className="text-gray-600 mb-4">
          See what our clients say about hiring through our platform:
        </p>
        <blockquote className="p-4 border-l-4 border-blue-600 bg-white rounded-md shadow">
          <p className="italic text-gray-600">
            "We found the perfect candidate within hours of posting! The quality
            of applicants was impressive."
          </p>
          <cite className="block mt-4 text-gray-900 font-semibold">
            – Sarah M., HR Manager
          </cite>
        </blockquote>
      </section>

      {/* Accordion FAQs */}
      <section className="w-full max-w-4xl mt-16 text-center mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-left">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow">
              <div
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                {openFAQ === index ? (
                  <FaChevronUp className="text-blue-600" />
                ) : (
                  <FaChevronDown className="text-blue-600" />
                )}
              </div>
              {openFAQ === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    question: "How much does it cost to post a job?",
    answer:
      "Posting a job is free, with options for premium placements at affordable rates.",
  },
  {
    question: "How long will my job post remain active?",
    answer: "Each job post stays active for 30 days, with options to extend.",
  },
  {
    question: "Can I edit my job post after publishing?",
    answer: "Yes, you can edit your job post at any time from your dashboard.",
  },
];
