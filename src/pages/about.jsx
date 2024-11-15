import Footer from "@/Components/Common/Footer";
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
  FaFacebook,FaLightbulb
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://preview.colorlib.com/theme/jobfinderportal/assets/img/hero/about.jpg.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900 opacity-70"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">About Us</h1>
        </div>
      </div>

      {/* Our Mission and Vision Section */}
      <section className="container mx-auto py-16 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600">
            Our Mission & Vision
          </h2>
          <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
            We strive to create a seamless hiring experience and foster
            meaningful career connections globally.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex-1">
            <FaBullseye className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600">
              Our Mission
            </h3>
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
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-md flex flex-col items-center">
              <FaGlobe className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">
                Global Reach
              </h3>
              <p className="text-gray-600 mt-2">
                Connect with professionals and companies worldwide.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md flex flex-col items-center">
              <FaHandshake className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">
                Trusted Partners
              </h3>
              <p className="text-gray-600 mt-2">
                Collaborate with industry-leading companies.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md flex flex-col items-center">
              <FaSmile className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-blue-600">
                User-Friendly
              </h3>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Richard James",
              role: "CEO",
              img: "https://mighty.tools/mockmind-api/content/human/65.jpg",
            },
            {
              name: "Emma Brown",
              role: "CTO",
              img: "https://mighty.tools/mockmind-api/content/human/57.jpg",
            },
            {
              name: "Sara Lee",
              role: "CFO",
              img: "https://mighty.tools/mockmind-api/content/human/44.jpg",
            },
            {
              name: "David Richards",
              role: "CFO",
              img: "https://mighty.tools/mockmind-api/content/human/5.jpg",
            },
          ].map((teamMember, index) => (
            <div key={index} className=" rounded-lg text-center">
              <img
                src={teamMember.img}
                alt={teamMember.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-blue-600">
                {teamMember.name}
              </h3>
              <p className="text-gray-500">{teamMember.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Our Core Values
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4 text-blue-600">
                <FaHandshake size={40} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600">Integrity</h3>
              <p className="text-gray-600 mt-2">
                We uphold transparency and honesty in all our actions.
              </p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4 text-blue-600">
                <FaLightbulb size={40} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600">
                Innovation
              </h3>
              <p className="text-gray-600 mt-2">
                We constantly evolve to meet the dynamic demands of the
                industry.
              </p>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4 text-blue-600">
                <FaUsers size={40} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600">Diversity</h3>
              <p className="text-gray-600 mt-2">
                We embrace and celebrate diverse backgrounds and perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Life at Company (Photo Gallery) */}

      {/* Join Us Section */}
      <section className="text-center py-16 bg-blue-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Ready to Join Us?
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          Discover exciting career opportunities and be part of our journey.
        </p>
        <a
          href="/careers"
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Explore Open Positions
        </a>
      </section>

      {/* Social Media Section */}

      <Footer />
    </div>
  );
};

export default AboutUs;
