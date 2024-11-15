import {
  FaPencilAlt,
  FaCode,
  FaChartLine,
  FaMobileAlt,
  FaHardHat,
  FaLaptop,
  FaBuilding,
  FaPenNib,
} from "react-icons/fa";
import Link from "next/link";

const categories = [
  { icon: <FaPencilAlt />, label: "Design & Creative" },
  { icon: <FaCode />, label: "Design & Development" },
  { icon: <FaChartLine />, label: "Sales & Marketing" },
  { icon: <FaMobileAlt />, label: "Mobile Application" },
  { icon: <FaHardHat />, label: "Construction" },
  { icon: <FaLaptop />, label: "Information Technology" },
  { icon: <FaBuilding />, label: "Real Estate" },
  { icon: <FaPenNib />, label: "Content Writer" },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Top Job Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-blue-500 text-4xl mb-3">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {category.label}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
