import { FaPencilAlt, FaCode, FaChartLine, FaMobileAlt, FaHardHat, FaLaptop, FaBuilding, FaPenNib } from "react-icons/fa";
import Link from "next/link";

const categories = [
  { icon: <FaPencilAlt />, label: "Design & Creative", count: 653 },
  { icon: <FaCode />, label: "Design & Development", count: 658 },
  { icon: <FaChartLine />, label: "Sales & Marketing", count: 658 },
  { icon: <FaMobileAlt />, label: "Mobile Application", count: 658 },
  { icon: <FaHardHat />, label: "Construction", count: 658 },
  { icon: <FaLaptop />, label: "Information Technology", count: 658 },
  { icon: <FaBuilding />, label: "Real Estate", count: 658 },
  { icon: <FaPenNib />, label: "Content Writer", count: 658 },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Browse Top Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-blue-500 text-4xl mb-3">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{category.label}</h3>
            <p className="text-pink-500 text-sm mt-2">({category.count})</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/all-categories">
          <span className="inline-block px-8 py-3 text-blue-500 font-semibold border border-blue-300 rounded-full hover:bg-blue-50 transition cursor-pointer">
            Browse All Sectors
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
