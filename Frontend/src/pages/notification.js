import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const notifications = [
    {
        id: 1,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Adventurer",
        age: "28",
        bio: "Exploring new places and seeking thrills 🌍🏕️",
    },
    {
        id: 2,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Artist",
        age: "26",
        bio: "Expressing emotions through colors and creativity 🎨🎭",
    }
];

const NotificationsPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login"); // Redirect to login if not logged in
        }
    }, [navigate]);
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-600 flex flex-col items-center pt-20">
            <h1 className="text-gray-800 text-2xl font-bold mb-6">Connection Requests 🔔</h1>

            <div className="w-full max-w-lg space-y-6">
                {notifications.map((user) => (
                    <motion.div
                        key={user.id}
                        className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Profile Picture */}
                        <img
                            src={user.profile_picture}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-2 border-gray-300"
                        />

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{user.title}, {user.age}</h2>
                            <p className="text-sm text-gray-600">{user.bio}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="bg-green-500 text-white p-2 rounded-full shadow-md"
                            >
                                <FaCheckCircle className="text-xl" />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="bg-red-500 text-white p-2 rounded-full shadow-md"
                            >
                                <FaTimesCircle className="text-xl" />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
