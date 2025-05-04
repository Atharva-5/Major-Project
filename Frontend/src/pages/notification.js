import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications on page load
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
        } else {
            fetchNotifications(token);
        }
    }, [navigate]);

    // Function to handle accepting a connection request
    // Handle accept connection request
    const handleAccept = async (connectionId) => {
        const token = localStorage.getItem("accessToken");

        try {
            await axios.post(
                `http://127.0.0.1:8000/auth/connections/accept/${connectionId}/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchNotifications(token);  // Refresh notifications after accepting
        } catch (error) {
            console.error("Failed to accept the connection:", error);
        }
    };

    // Handle reject connection request
    const handleReject = async (connectionId) => {
        const token = localStorage.getItem("accessToken");

        try {
            await axios.post(
                `http://127.0.0.1:8000/auth/connections/reject/${connectionId}/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchNotifications(token);  // Refresh notifications after rejecting
        } catch (error) {
            console.error("Failed to reject the connection:", error);
        }
    };

    // Function to fetch notifications from the server
    const fetchNotifications = async (token) => {
        try {
            const allData = [];
            const response = await axios.get("http://127.0.0.1:8000/auth/notifications/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Fetch user details for each notification
            for (let i = 0; i < response.data.length; i++) {
                const senderId = response.data[i].sender__id;

                const userRes = await axios.get(
                    `http://127.0.0.1:8000/auth/user/${senderId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Push only required data
                allData.push({
                    id: response.data[i].id,
                    senderId: senderId,
                    username: userRes.data.username,
                    age: userRes.data.age,
                    photo: userRes.data.photo,
                    occupation: userRes.data.occupation || "Not specified",
                    caste: userRes.data.caste || "Not specified",
                    gender: userRes.data.gender || "Not specified",
                    interests: userRes.data.interests || [], // assumed to be a list
                });
            }

            setNotifications(allData);
        } catch (error) {
            console.error("Failed to fetch notifications:", error.response?.data || error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-600 flex flex-col items-center pt-20">
            <h1 className="text-gray-800 text-3xl font-semibold mb-6 mt-2">Connection Requests 🔔</h1>
            <div className="w-full max-w-2xl space-y-8">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-6 border border-gray-200"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.img
                                src={`http://127.0.0.1:8000${notification.photo}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-pink-300 object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800">{notification.username}, {notification.age}</h2>
                                <p className="text-sm text-gray-600">Gender: {notification.gender}</p>
                                <p className="text-sm text-gray-600">Caste: {notification.caste}</p>
                                <p className="text-sm text-gray-600">Occupation: {notification.occupation}</p>

                                {/* Interests */}
                                {notification.interests.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {notification.interests.map((interest, index) => (
                                            <motion.span
                                                key={index}
                                                className="bg-pink-200 text-pink-700 text-xs px-3 py-1 rounded-full shadow-sm"
                                                whileHover={{ scale: 1.1, backgroundColor: "#d6336c" }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {interest}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                                    onClick={() => handleAccept(notification.id)}
                                >
                                    <FaCheckCircle className="text-2xl" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-200"
                                    onClick={() => handleReject(notification.id)}
                                >
                                    <FaTimesCircle className="text-2xl" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <center>
                        <motion.p
                            className="text-black text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            No connection requests yet 😔
                        </motion.p>
                    </center>
                )}
            </div>
        </div>
    );

};

export default NotificationsPage;
