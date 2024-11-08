import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <section
      className="relative flex flex-col items-center md:flex-row md:justify-between py-24 md:py-40 px-6 sm:px-10 md:px-20 lg:px-32 text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/banner-2.webp')" }}
    >
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc] via-[#004c99] to-transparent opacity-100 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-radial from-[#007ef0] via-transparent opacity-50 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-radial from-[#00aaff] via-transparent opacity-30 blur-3xl"></div>

      {/* Content Section */}
      <div className="relative z-10 w-full md:w-2/3 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl md:w-3/4 lg:text-6xl font-bold text-white leading-tight">
          Find the perfect <span className="text-blue-400">job</span> for you
        </h1>
        <p className="text-white text-lg">
          Search your career opportunity through{" "}
          <span className="font-semibold text-blue-400">12,800</span> jobs
        </p>

        {/* Enhanced Responsive Search Bar */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-md md:rounded-full overflow-hidden w-full md:w-5/6 lg:w-4/5 xl:w-3/4 mt-5 p-2 md:p-2">
          <div className="flex items-center flex-1 px-4 py-2 md:py-3 w-full">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
            />
          </div>
          <span className="hidden md:block border-l border-gray-300 h-8"></span>
          <div className="flex items-center flex-1 px-4 py-2 md:py-3 w-full">
            <FaMapMarkerAlt className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
            />
          </div>
          <button className="bg-[#007ef0] text-white rounded-full py-3 px-8 font-semibold hover:bg-[#005bbd] transition w-full md:w-auto mt-2 md:mt-0">
            Find Job
          </button>
        </div>
      </div>

      {/* Illustration */}
      <div className="absolute bottom-0 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] md:right-5 lg:right-20 z-0">
        <Image
          src="/banner.webp" // This path points to the image in the public folder
          alt="Banner Illustration"
          layout="responsive"
          width={500}
          height={500}
          className="object-contain hidden md:block"
        />
      </div>
    </section>
  );
};

export default Banner;
