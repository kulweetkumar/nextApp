'use client';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createContactApi } from "../apiServices/api";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reduxDispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await createContactApi(formData);
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
        });
        toast.success(response.data.message); 
      } catch (error) {
        // If there's an error
        if (error.response) {
          toast.error(error.response.data.message); 
        } else {
          toast.error('Failed to create contact. Please try again later.'); 
        }
      }
    }
    
  };
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {}, []); 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 lg:p-24 bg-gray-100">
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Contact Us</h1>
      </header>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Your Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Your Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Send Message
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
    </main>
  );
}
