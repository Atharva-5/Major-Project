import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileCard = () => {
    const user = {
        profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
        first_name: "John",
        last_name: "Doe",
        age: 25,
        bio: "Love traveling, coding, and coffee! ☕",
        interests: ["Hiking", "Movies", "Gaming", "Music", "Photography", "Tech", "Fitness"],
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-400 to-red-500">
            {/* Card with Hover Animation */}
            <motion.div
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

                {/* Name & Age */}
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    {user.first_name} {user.last_name}, {user.age}
                </h2>

                {/* Bio */}
                <p className="text-gray-600 text-sm px-4 mt-2">{user.bio}</p>

                {/* Interests Badges with Animation */}
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

                {/* Action Buttons with Hover Effects */}
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
        </div>
    );
};

export default ProfileCard;
