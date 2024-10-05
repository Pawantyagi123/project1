import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DotLoader } from "react-spinners";

const UserProfile = () => {
  const { userId } = useParams(); // Extract userId from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data by ID
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile for {user.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <div className="mt-4">
          <h3 className="font-bold">Address:</h3>
          <p>
            {user.address.street}, {user.address.suite}
          </p>
          <p>
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Company:</h3>
          <p>{user.company.name}</p>
          <p>{user.company.catchPhrase}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
