import { FaFileAlt, FaUsers, FaChartLine, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt size={40} />,
    title: "Search Millions of Jobs",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    icon: <FaSearch size={40} />,
    title: "Easy To Manage Jobs",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    icon: <FaChartLine size={40} />,
    title: "Top Careers",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "Search Expert Candidates",
    description: "A small river named Duden flows by their place and supplies.",
  },
];

const FeatureSection = () => {
  return (
    <section
      className="relative py-16 bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('https://preview.colorlib.com/theme/careers/images/hero_1.jpg.webp')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2871ba] via-[#0b569b] to-[#2158b0] opacity-90"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-transparent rounded-lg"
          >
            <div className="mb-4 text-white">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-200">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
