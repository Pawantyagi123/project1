import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditUser({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: user.id, // Ensure we track the user ID for updates
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: {
      city: user.address.city,
      street: user.address.street,
    },
    company: {
      name: user.company.name,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [field]: value },
      }));
    } else if (name.includes("company")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        company: { ...prevState.company, [field]: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate PUT request (JSONPlaceholder won't actually update the user)
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${formData.id}`,
        formData
      );

      if (response.status === 200) {
        onSave(formData);
        toast.success("User Edit Successfully"); // Pass updated user data to parent component
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    onClose(); // Close the modal after save
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
