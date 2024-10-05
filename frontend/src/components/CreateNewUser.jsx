import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  city: yup.string(), // Make it optional if not required
  street: yup.string(), // Make it optional if not required
  companyname: yup.string(), // Make it optional if not required
});

export default function CreateNewUser({ onUserAdded, open, setOpen }) {
  // For navigating after form submission
  const {
    register,
    handleSubmit,
    reset, // Add reset here
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
     
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        data
      );
      onUserAdded(response.data);
      reset();
      toast.success("New user added"); 
      setOpen(false); 
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <div className="container mx-auto p-4">
          <DialogTitle>
            <h1 className="text-2xl font-bold mb-4">Create New User</h1>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 shadow-md rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                {...register("name")}
                className={`border p-2 w-full ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                {...register("email")}
                className={`border p-2 w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                {...register("phone")}
                className={`border p-2 w-full ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                {...register("city")}
                placeholder="City"
                className={`border p-2 w-full ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              <input
                type="text"
                {...register("street")}
                placeholder="Street"
                className={`border p-2 w-full ${
                  errors.street ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Company Name:</label>
              <input
                type="text"
                {...register("companyname")}
                className={`border p-2 w-full ${
                  errors.companyname ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
