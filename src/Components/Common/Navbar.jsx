import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
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

  // Log user and isLoaded status for debugging
  useEffect(() => {
    console.log("User:", user);
    console.log("isLoaded:", isLoaded);
  }, [user, isLoaded]);

  // Menu items array
  const menuItems = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" },
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
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#007ef0] font-semibold text-white px-4 py-1 rounded-full hover:bg-[#005bbd] transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                {/* Posted Jobs link */}
                <Link href="/posted-jobs">
                  <span className="text-gray-700 font-medium hover:text-[#007ef0] transition-colors duration-200">
                    Posted Jobs
                  </span>
                </Link>
                {/* Post a Job button */}
                <Link href="/post-job">
                  <button className="bg-blue-500 font-semibold text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-colors duration-200">
                    Post a Job
                  </button>
                </Link>
                {/* User Avatar and Name */}
                <div className="flex items-center space-x-2">
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
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full bg-[#007ef0] text-white font-semibold px-3 py-2 rounded-md hover:bg-[#005bbd] transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col space-y-2">
                {/* Posted Jobs link for mobile */}
                <Link href="/posted-jobs">
                  <span className="w-full text-gray-700 text-center font-medium hover:text-[#007ef0] transition-colors duration-200">
                    Posted Jobs
                  </span>
                </Link>
                {/* Post a Job button for mobile */}
                <Link href="/post-job">
                  <button className="w-full bg-blue-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Post a Job
                  </button>
                </Link>
                {/* User Avatar and Name */}
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
