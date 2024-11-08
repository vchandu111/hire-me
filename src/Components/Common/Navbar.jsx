import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menu items array
  const menuItems = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const authItems = [
    { label: "Post a Job", href: "/post", type: "outline" },
    { label: "Sign Up", href: "/signup", type: "button" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#007ef0]">
              Hire Me
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 font-medium hover:text-[#007ef0] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Links for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {authItems.map((item, index) =>
              item.type === "button" ? (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-[#007ef0] font-semibold text-white px-4 py-1 rounded-full hover:bg-[#005bbd] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="border border-[#007ef0] text-[#007ef0] font-semibold px-4 py-1 rounded-full hover:bg-[#007ef0] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-[#007ef0] px-3 py-2 rounded-md"
              >
                {item.label}
              </Link>
            ))}
            {authItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`block ${
                  item.type === "button"
                    ? "bg-[#007ef0] text-white hover:bg-[#005bbd]"
                    : "border border-[#007ef0] text-[#007ef0] hover:bg-[#007ef0] hover:text-white"
                } px-3 py-2 rounded-md font-semibold transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
