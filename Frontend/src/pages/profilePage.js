import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const profiles = [
    {
        id: 1,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Adventurer",
        age: "28",
        bio: "Exploring new places and seeking thrills 🌍🏕️",
        interests: ["Travel", "Hiking", "Extreme Sports", "Photography"],
    },
    {
        id: 2,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Artist",
        age: "26",
        bio: "Expressing emotions through colors and creativity 🎨🎭",
        interests: ["Painting", "Music", "Poetry", "Dancing"],
    },
    {
        id: 3,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Tech Enthusiast",
        age: "30",
        bio: "Passionate about AI, coding, and futuristic innovations 🤖💻",
        interests: ["AI", "Gaming", "Blockchain", "Startups"],
    },
    {
        id: 4,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Fitness Freak",
        age: "27",
        bio: "Living a healthy lifestyle and breaking limits 💪🏋️",
        interests: ["Gym", "Running", "Yoga", "Nutrition"],
    },
    {
        id: 5,
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        title: "The Bookworm",
        age: "25",
        bio: "Lost in books and exploring different worlds through words 📚✨",
        interests: ["Reading", "Writing", "Storytelling", "Philosophy"],
    },
];

const ProfilesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login"); // Redirect to login if not logged in
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-red-600 flex flex-col items-center">
            {/* Add top padding to prevent overlap */}
            <div className="flex flex-col items-center pt-24">
                <h1 className="text-black text-3xl font-bold mb-6">Explore Profiles ❤️</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((user) => (
                        <motion.div
                            key={user.id}
                            className="relative w-80 h-auto bg-white rounded-2xl shadow-xl p-6 text-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Profile Image */}
                            <motion.img
                                src={user.profile_picture}
                                alt="Profile"
                                className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Title & Age */}
                            <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                {user.title}, {user.age}
                            </h2>

                            {/* Bio */}
                            <p className="text-gray-600 text-sm px-4 mt-2">{user.bio}</p>

                            {/* Interests Badges */}
                            <motion.div
                                className="flex flex-wrap justify-center gap-2 mt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {user.interests.map((interest, index) => (
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

                            {/* Action Buttons */}
                            <div className="flex justify-center mt-6 space-x-6">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.1, backgroundColor: "#d9534f" }}
                                    className="bg-red-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                >
                                    <FaTimesCircle className="text-3xl" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.1, backgroundColor: "#4caf50" }}
                                    className="bg-green-500 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                                >
                                    <FaCheckCircle className="text-3xl" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilesPage;
