import Image from "next/image";
import { FaFileAlt, FaBullhorn, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt size={24} className="text-white" />,
    title: "Comprehensive Job Listings",
    description: "Access a wide range of job opportunities tailored for you.",
  },
  {
    icon: <FaBullhorn size={24} className="text-white" />,
    title: "Easy Job Application Process",
    description: "Apply for jobs effortlessly with our streamlined application process.",
  },
  {
    icon: <FaChartLine size={24} className="text-white" />,
    title: "Career Growth Insights",
    description: "Receive insights on career growth and industry trends.",
  },
];

const WhyWeAreDifferent = () => {
  return (
    <section className="container m-auto flex flex-col md:flex-row items-center justify-between py-20 px-4 ">
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h2 className="text-4xl font-bold text-gray-900">Why We Stand Out</h2>
        <p className="text-gray-600">
          We provide genuine feedback from our users to ensure you have the best experience on our platform.
          Discover opportunities, get industry insights, and grow your career with us.
        </p>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/diff.webp"
          alt="Why we are different"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default WhyWeAreDifferent;
