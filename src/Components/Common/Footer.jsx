import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
  } from "react-icons/fa";
  import Link from "next/link";
  
  const Footer = () => {
    const socialLinks = [
      { href: "https://facebook.com", icon: <FaFacebookF /> },
      { href: "https://twitter.com", icon: <FaTwitter /> },
      { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
      { href: "https://instagram.com", icon: <FaInstagram /> },
    ];
  
    const employerLinks = [
      { href: "/how-it-works", text: "How it works" },
      { href: "/register", text: "Register" },
      { href: "/post-job", text: "Post a Job" },
      { href: "/blog", text: "Blog" },
      { href: "/faq", text: "FAQ" },
    ];
  
    const workerLinks = [
      { href: "/how-it-works", text: "How it works" },
      { href: "/register", text: "Register" },
      { href: "/post-your-skills", text: "Post Your Skills" },
      { href: "/job-search", text: "Job Search" },
      { href: "/employer-search", text: "Employer Search" },
    ];
  
    const contactInfo = [
      { icon: <FaMapMarkerAlt />, text: "Hitech City, Hyderabad" },
      { icon: <FaPhoneAlt />, text: "+91 998987618" },
      { icon: <FaEnvelope />, text: "hireme@support.com" },
    ];
  
    return (
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">HireMe</h2>
              <p className="text-gray-300">
                We connect talented individuals with leading companies to create
                meaningful career opportunities. Let us help you find the right
                role.
              </p>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="p-2 rounded-full border border-gray-500 hover:bg-blue-700 transition"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
  
            {/* Employers Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold mb-4">Employers</h4>
              <ul className="space-y-2 text-gray-300">
                {employerLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Workers Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold mb-4">Workers</h4>
              <ul className="space-y-2 text-gray-300">
                {workerLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Have a Question? Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">Have a Question?</h4>
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center text-gray-300 space-x-2">
                  {info.icon}
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="border-t flex justify-between border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} HireMe. All rights reserved.</p>
            <p>
              This template is made with ❤️ by{" "}
              <Link href="https://colorlib.com" className="hover:text-white">
                Hire Me
              </Link>
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  