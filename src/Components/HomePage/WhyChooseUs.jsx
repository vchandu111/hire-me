import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <section className="flex container m-auto flex-col md:flex-row items-center justify-between py-20 px-4 ">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Image
          src="/about.webp"
          alt="Why Choose Us Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">
          We Build Lasting Relationships Between Candidates & Businesses
        </h2>
        <p className="text-gray-600">
          We bring together candidates and employers in a seamless experience,
          allowing candidates to find meaningful jobs and employers to discover
          top talents.
        </p>
        <p className="text-gray-600">
          Our platform simplifies the hiring process, from job search to
          application, ensuring a smooth experience for both parties.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
          Find Talent
        </button>
      </div>
    </section>
  );
};

export default WhyChooseUs;
