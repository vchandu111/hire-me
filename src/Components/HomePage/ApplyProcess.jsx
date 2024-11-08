import { FaSearch, FaClipboardCheck, FaBriefcase } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={40} className="text-white" />,
    title: "1. Search a job",
    description: "Browse through millions of job listings to find the perfect role that matches your skills and interests.",
  },
  {
    id: 2,
    icon: <FaClipboardCheck size={40} className="text-white" />,
    title: "2. Apply for job",
    description: "Submit your application with ease and take the first step towards advancing your career.",
  },
  {
    id: 3,
    icon: <FaBriefcase size={40} className="text-white" />,
    title: "3. Get your job",
    description: "Successfully secure the position and begin your journey with a new and exciting role.",
  },
];

const ApplyProcess = () => {
  return (
    <section
      className="relative py-20 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://preview.colorlib.com/theme/jobfinderportal/assets/img/gallery/how-applybg.png.webp')",
      }}
    >
      <div className="text-center mb-10">
        <h4 className="text-pink-400 uppercase font-semibold mb-2">
          Apply Process
        </h4>
        <h2 className="text-4xl font-bold">How it works</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-blue-900 bg-opacity-80 p-8 rounded-lg shadow-lg"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApplyProcess;
