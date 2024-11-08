import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

const jobPosts = [
  {
    id: 1,
    type: "PARTTIME",
    title: "Frontend Development",
    company: "Facebook, Inc.",
    location: "Western City, UK",
    category: "Web Design",
    salary: "$2000",
    daysLeft: "20 DAYS",
    jobTypeColor: " text-blue-500",
  },
  {
    id: 2,
    type: "FULLTIME",
    title: "Full Stack Developer",
    company: "Google, Inc.",
    location: "Western City, UK",
    category: "Web Design",
    salary: "$2000",
    daysLeft: "20 DAYS",
    jobTypeColor: " text-green-500",
  },
  {
    id: 3,
    type: "FREELANCE",
    title: "Open Source Interactive Developer",
    company: "New York Times",
    location: "Western City, UK",
    category: "Web Design",
    salary: "$2000",
    daysLeft: "20 DAYS",
    jobTypeColor: " text-teal-500",
  },
  {
    id: 4,
    type: "INTERNSHIP",
    title: "UI/UX Designer",
    company: "Microsoft, Inc.",
    location: "Western City, UK",
    category: "UI/UX Design",
    salary: "$1500",
    daysLeft: "15 DAYS",
    jobTypeColor: " text-purple-500",
  },
  {
    id: 5,
    type: "FULLTIME",
    title: "Backend Developer",
    company: "Amazon, Inc.",
    location: "Western City, UK",
    category: "Backend Development",
    salary: "$2500",
    daysLeft: "10 DAYS",
    jobTypeColor: " text-green-500",
  },
  {
    id: 6,
    type: "PARTTIME",
    title: "Data Scientist",
    company: "IBM, Inc.",
    location: "Western City, UK",
    category: "Data Science",
    salary: "$3000",
    daysLeft: "12 DAYS",
    jobTypeColor: "text-blue-500",
  },
  {
    id: 7,
    type: "FREELANCE",
    title: "SEO Specialist",
    company: "LinkedIn",
    location: "Western City, UK",
    category: "Digital Marketing",
    salary: "$1800",
    daysLeft: "5 DAYS",
    jobTypeColor: " text-teal-500",
  },
  {
    id: 8,
    type: "INTERNSHIP",
    title: "Marketing Analyst",
    company: "Adobe, Inc.",
    location: "Western City, UK",
    category: "Marketing",
    salary: "$1600",
    daysLeft: "30 DAYS",
    jobTypeColor: " text-purple-500",
  },
];

const JobPosts = () => {
    return (
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-blue-500 font-semibold text-sm uppercase mb-2">
          Recently Added Jobs
        </h2>
        <h3 className="text-3xl font-bold mb-8">
          Featured Jobs Posts For This Week
        </h3>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex flex-col space-y-2 w-full sm:w-3/4">
                <span className={`text-sm font-bold ${job.jobTypeColor}`}>
                  {job.type}
                </span>
                <h4 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h4>
                <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4">
                  <span className="flex items-center">
                    <FaBuilding className="mr-1" /> {job.company}
                  </span>
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-1" /> {job.location}
                  </span>
                  <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-xs mt-2 sm:mt-0">
                    {job.category}
                  </span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                <span className="text-gray-500 text-xs">{job.daysLeft}</span>
                <span className="bg-green-100 text-green-500 font-semibold px-2 py-1 rounded-md text-lg">
                  {job.salary}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto">
                  Apply Job
                </button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-center mt-8">
          <button className="text-blue-500 font-semibold border border-blue-500 px-6 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200">
            View More
          </button>
        </div>
      </section>
    );
  };
  
  export default JobPosts;
