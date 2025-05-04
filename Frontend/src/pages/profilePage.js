import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilesPage = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [currentUserGender, setCurrentUserGender] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
        } else {
            fetchCurrentUserGender(token);
        }
    }, [navigate]);

    const fetchCurrentUserGender = async (token) => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/auth/user/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userGender = res.data.gender; // assuming response has `gender` field
            setCurrentUserGender(userGender);

            const oppositeGender = userGender === "Male" ? "Female" : "Male";
            fetchProfiles(oppositeGender);
        } catch (err) {
            console.error("Failed to fetch user profile:", err.response?.data || err);
        }
    };

    const fetchProfiles = async (gender) => {
        const token = localStorage.getItem("accessToken");
        try {
            const res = await axios.get(`http://127.0.0.1:8000/auth/profiles/random/${gender}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfiles(res.data || []);
        } catch (err) {
            console.error("Failed to fetch profiles:", err.response?.data || err);
        }
    };

    const handleLike = async (receiverId) => {
        try {
            const res = await axios.post(
                `http://127.0.0.1:8000/auth/connections/send/`,
                { receiver_id: receiverId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
            );

            if (res.status === 201) {
                setProfiles((prev) => prev.filter((p) => p.id !== receiverId));
            }
        } catch (err) {
            console.error("Error sending connection request:", err.response?.data || err);
        }
    };

    const handleDislike = (profileId) => {
        setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 flex flex-col items-center py-10">
            <div className="max-w-6xl w-full px-4">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-10">Explore Profiles</h1>

                {profiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {profiles.map((user) => (
                            <motion.div
                                key={user.id}
                                className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={`http://127.0.0.1:8000${user.photo}` || `https://via.placeholder.com/150`}
                                    alt="Profile"
                                    className="w-full h-56 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">{user.title || user.username}, {user.age}</h2>
                                    {user.occupation && (
                                        <p className="text-sm text-gray-600 mt-2 italic">{user.occupation}</p>
                                    )}
                                    <motion.div
                                        className="flex flex-wrap justify-center gap-2 mt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        {(user.interests || []).map((interest, index) => (
                                            <motion.span
                                                key={index}
                                                className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-full shadow-md"
                                                whileHover={{ scale: 1.1, backgroundColor: "#2c8b8b" }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {interest}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                    <div className="flex justify-center mt-6 space-x-6">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.1, backgroundColor: "#e74c3c" }}
                                            className="bg-red-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                            onClick={() => handleDislike(user.id)}
                                        >
                                            <FaTimesCircle className="text-3xl" />
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.1, backgroundColor: "#2ecc71" }}
                                            className="bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                            onClick={() => handleLike(user.id)}
                                        >
                                            <FaCheckCircle className="text-3xl" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl text-gray-600 text-center mt-20">No profiles available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;
