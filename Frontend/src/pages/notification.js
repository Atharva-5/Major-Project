import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
        } else {
            fetchNotifications(token);
        }
    }, [navigate]);

    const fetchNotifications = async (token) => {
        try {
            const allData = [];
            const response = await axios.get("http://127.0.0.1:8000/auth/notifications/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            for (let i = 0; i < response.data.length; i++) {
                const senderId = response.data[i].sender__id;

                const userRes = await axios.get(
                    `http://127.0.0.1:8000/auth/user/${senderId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Push only required data
                allData.push({
                    id: senderId,
                    username: userRes.data.username,
                    age: userRes.data.age,
                    profile_picture: userRes.data.profile_picture,
                });
            }

            setNotifications(allData);
        } catch (error) {
            console.error("Failed to fetch notifications:", error.response?.data || error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-600 flex flex-col items-center pt-20">
            <h1 className="text-gray-800 text-2xl font-bold mb-6">Connection Requests 🔔</h1>
            <div className="w-full max-w-lg space-y-6">
                {notifications.length > 0 ? (
                    notifications.map((user) => (
                        <motion.div
                            key={user.id}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={user.profile_picture}
                                alt="Profile"
                                className="w-14 h-14 rounded-full border-2 border-gray-300 object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{user.username}</h2>
                                <p className="text-sm text-gray-600">Age: {user.age}</p>
                            </div>
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
                    ))
                ) : (
                    <p className="text-white text-lg">No connection requests yet 😔</p>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
