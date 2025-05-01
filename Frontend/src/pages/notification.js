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
                    id: response.data[i].id, // The connection ID
                    senderId: senderId,
                    username: userRes.data.username,
                    age: userRes.data.age,
                    photo: userRes.data.photo,
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
                    notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={`http://127.0.0.1:8000${notification.photo}`}
                                alt="Profile"
                                className="w-14 h-14 rounded-full border-2 border-gray-300 object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{notification.username}</h2>
                                <p className="text-sm text-gray-600">Age: {notification.age}</p>
                            </div>
                            <div className="flex space-x-3">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-green-500 text-white p-2 rounded-full shadow-md"
                                    onClick={() => handleAccept(notification.id)} // Accept request
                                >
                                    <FaCheckCircle className="text-xl" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-red-500 text-white p-2 rounded-full shadow-md"
                                    onClick={() => handleReject(notification.id)} // Reject request
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
