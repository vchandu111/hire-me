import Link from "next/link";

const JobExpertSection = () => {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-center py-12 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://preview.colorlib.com/theme/jobboard/images/hero_1.jpg.webp')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-60"></div>

      {/* Left Content (Looking for a Job) */}
      <div className="relative w-full md:w-1/2 p-8 flex flex-col items-center text-center text-white z-10 border-b md:border-b-0 md:border-r border-white">
        <h2 className="text-3xl font-bold mb-4">Looking for a Job?</h2>
        <p className="text-lg mb-6">
          We connect you to top employers with quick application processes.
        </p>
        <Link href="/jobs">
          <button className="px-6 py-3 font-semibold text-white bg-blue-700 rounded-full hover:bg-blue-600 transition-colors duration-200">
            Browse Job
          </button>
        </Link>
      </div>

      {/* Right Content (Looking for an Expert) */}
      <div className="relative w-full md:w-1/2 p-8 flex flex-col items-center text-center text-white z-10">
        <h2 className="text-3xl font-bold mb-4">Looking for an Expert?</h2>
        <p className="text-lg mb-6">
          Post your job and reach talented professionals ready to work.
        </p>
        <Link href="/post-job">
          <button className="px-6 py-3 font-semibold text-white bg-blue-700 rounded-full hover:bg-blue-600 transition-colors duration-200">
            Post A Job
          </button>
        </Link>
      </div>
    </section>
  );
};

export default JobExpertSection;
