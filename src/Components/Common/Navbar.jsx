import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaChevronDown,
  FaBriefcase,
  FaBookmark,
  FaClipboardList,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("userId");
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const accountItems = [
    { label: "Posted Jobs", href: "/jobs-posted", icon: <FaBriefcase /> },
    { label: "Saved Jobs", href: "/jobs-saved", icon: <FaBookmark /> },
    { label: "Applied Jobs", href: "/jobs-applied", icon: <FaClipboardList /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Hire Me
            </Link>
          </div>

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

          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#007ef0] font-semibold text-white px-4 py-1 rounded-full hover:bg-[#005bbd] transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                {/* Post a Job button */}
                <Link href="/post-job">
                  <button className="bg-blue-600 font-semibold text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    Post a Job
                  </button>
                </Link>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <UserButton />
                  {isLoaded && user && (
                    <span className="text-gray-700 font-medium">
                      {user.firstName || user.fullName || "User"}
                    </span>
                  )}
                </div>

                {/* My Account Dropdown - Placed after profile */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center cursor-pointer text-gray-700 font-medium hover:text-[#007ef0] transition-colors duration-200"
                  >
                    <MdAccountCircle className="text-blue-600 text-3xl mr-1" />

                    <FaChevronDown className="ml-1" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 z-100 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul className="py-2">
                        {accountItems.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.href}
                              className="flex items-center px-4 py-2 text-blue-700 hover:bg-[#007ef0] hover:text-white transition-colors duration-200"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.icon}
                              <span className="ml-2 text-black">
                                {item.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </SignedIn>
          </div>

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

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 ">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-[#007ef0] px-3 py-2 rounded-md text-center"
              >
                {item.label}
              </Link>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-[#007ef0] text-white font-semibold px-3 py-2 rounded-md hover:bg-[#005bbd] transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col space-y-2">
                {accountItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-gray-700 text-center font-medium hover:text-[#007ef0] px-3 py-2 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/post-job">
                  <button className="w-full bg-blue-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Post a Job
                  </button>
                </Link>
                <div className="flex items-center justify-center space-x-2">
                  <UserButton />
                  {isLoaded && user && (
                    <span className="text-gray-700 font-medium">
                      {user.firstName || user.fullName || "User"}
                    </span>
                  )}
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
