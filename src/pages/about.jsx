import React from "react";
import {
  FaBullseye,
  FaHandshake,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaSmile,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-[#f3f2ee]">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen text-center text-white flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl font-light max-w-2xl">
          Empowering careers and building connections through our professional
          platform.
        </p>
      </section>

      {/* Our Mission and Vision Section */}
      <section className="container mx-auto py-16 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission & Vision</h2>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
            We strive to create a seamless hiring experience and foster
            meaningful career connections globally.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex-1">
            <FaBullseye className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              To connect professionals with opportunities that match their
              skills and aspirations.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex-1">
            <FaChartLine className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600">Our Vision</h3>
            <p className="mt-2 text-gray-600">
              To be the world’s leading platform for career development and
              talent discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-md">
              <FaGlobe className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">Global Reach</h3>
              <p className="text-gray-600 mt-2">
                Connect with professionals and companies worldwide.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md">
              <FaHandshake className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">Trusted Partners</h3>
              <p className="text-gray-600 mt-2">
                Collaborate with industry-leading companies.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md">
              <FaSmile className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">User-Friendly</h3>
              <p className="text-gray-600 mt-2">
                Enjoy an intuitive and seamless experience on our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "CEO", img: "https://via.placeholder.com/150" },
            { name: "Jane Smith", role: "CTO", img: "https://via.placeholder.com/150" },
            { name: "Sara Lee", role: "CFO", img: "https://via.placeholder.com/150" },
          ].map((teamMember, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={teamMember.img} alt={teamMember.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-blue-600">{teamMember.name}</h3>
              <p className="text-gray-500">{teamMember.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">Our Core Values</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Integrity</h3>
              <p className="text-gray-600 mt-2">We uphold transparency and honesty in all our actions.</p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Innovation</h3>
              <p className="text-gray-600 mt-2">We constantly evolve to meet the dynamic demands of the industry.</p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Diversity</h3>
              <p className="text-gray-600 mt-2">We embrace and celebrate diverse backgrounds and perspectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="container mx-auto py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="border-l-4 border-blue-500 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {[
            { year: "2018", event: "Founded with a vision to connect talent globally." },
            { year: "2020", event: "Reached 1 million users worldwide." },
            { year: "2022", event: "Launched new AI-driven job matching feature." },
          ].map((milestone, index) => (
            <div key={index} className="flex items-center mb-8 text-center">
              <div className="w-full md:w-1/2 p-4">
                <h4 className="text-xl font-bold text-blue-600">{milestone.year}</h4>
                <p className="text-gray-700">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at Company (Photo Gallery) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Life at [Company]</h2>
          <p className="text-gray-600 mt-2">Explore the vibrant culture and atmosphere that make us unique.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8).fill("https://via.placeholder.com/300").map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="Life at Company" className="rounded-lg shadow-md w-full" />
          ))}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="text-center py-16 bg-blue-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Ready to Join Us?</h2>
        <p className="text-lg mb-8 text-gray-600">Discover exciting career opportunities and be part of our journey.</p>
        <a href="/careers" className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition">
          Explore Open Positions
        </a>
      </section>

      {/* Social Media Section */}
      <section className="text-center py-8 bg-white">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://linkedin.com" className="text-blue-500 hover:text-blue-700">
            <FaLinkedin size={28} />
          </a>
          <a href="https://twitter.com" className="text-blue-500 hover:text-blue-700">
            <FaTwitter size={28} />
          </a>
          <a href="https://facebook.com" className="text-blue-500 hover:text-blue-700">
            <FaFacebook size={28} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
