import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import EditUser from "./EditUser";
import CreateNewUser from "./CreateNewUser"; // Import the new component
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false); // State to track if creating a new user

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers([newUser, ...users]); // Add the new user to the state
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = async (userId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <DotLoader
        color="#26aceb"
        size={"80px"}
        speedMultiplier={1}
        className="m-auto w-full"
      />
    );
  }

  return (
    <div className="container mx-auto p-4 border-none">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <div className="flex items-center justify-between">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Button
          onClick={() => {
            setIsCreating(true);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
              <th className="px-4 py-2 text-left text-gray-700">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-700" : "bg-green-400"
                  } border-b text-white`}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditClick(user)}
                      className="text-black"
                    >
                      Edit
                    </Button>
                    <Button
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Link to={`/userprofile/${user.id}`}>
                      <Button>View Profile</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CreateNewUser
        open={open}
        setOpen={setOpen}
        onUserAdded={handleUserAdded}
      />
      {isEditing && (
        <EditUser
          user={selectedUser}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
