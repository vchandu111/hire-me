import Footer from "@/Components/Common/Footer";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(
      "https://healthconnect-5248e-default-rtdb.firebaseio.com/help.json",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          toast.success(
            "Thank you for reaching out! We have received your message and will get back to you shortly.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("Failed to send message.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div className="text-center mt-24 px-4 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-10">
          Get in Touch
        </h2>
        <p className="text-gray-600">
          Have questions or need assistance? Fill out the form, and our team
          will get back to you shortly.
        </p>
      </div>

      <div className="flex flex-col w-3/4 md:flex-row items-center justify-center py-8 pb-12 m-auto">
        <div className="w-full md:w-1/2 h-96 md:h-auto overflow-hidden rounded-lg relative">
          <img
            src="https://www.linkedfusion.io/wp-content/uploads/2023/08/reporting-email.svg"
            alt="Map Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 md:ml-6 mt-8 md:mt-0 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none placeholder-gray-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default ContactUs;
