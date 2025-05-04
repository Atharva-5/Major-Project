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
        <div className="min-h-screen bg-gradient-to-b from-pink-200 to-red-600 flex flex-col items-center">
            <div className="flex flex-col items-center pt-24">
                <h1 className="text-black text-3xl font-bold mb-6">Explore Profiles ❤️</h1>

                {profiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((user) => (
                            <motion.div
                                key={user.id}
                                className="relative w-80 h-auto bg-white rounded-2xl shadow-xl p-6 text-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={`http://127.0.0.1:8000${user.photo}` || `https://via.placeholder.com/150`}
                                    alt="Profile"
                                    className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                    {user.title || user.username}, {user.age}
                                </h2>
                                <p className="text-gray-600 text-sm px-4 mt-2">{user.bio || "No bio available."}</p>
                                <motion.div
                                    className="flex flex-wrap justify-center gap-2 mt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    {(user.interests || []).map((interest, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-3 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full shadow-md"
                                            whileHover={{ scale: 1.1, backgroundColor: "#d6336c" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {interest}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <div className="flex justify-center mt-6 space-x-6">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "#d9534f" }}
                                        className="bg-red-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                        onClick={() => handleDislike(user.id)}
                                    >
                                        <FaTimesCircle className="text-3xl" />
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "#4caf50" }}
                                        className="bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                        onClick={() => handleLike(user.id)}
                                    >
                                        <FaCheckCircle className="text-3xl" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-xl mt-20">No profiles available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;
