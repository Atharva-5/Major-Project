import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaBell, FaUsers } from "react-icons/fa";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState({ name: "", profilePic: "" });

    const navigate = useNavigate();
    const location = useLocation();

    const checkAuthToken = () => {
        const token = localStorage.getItem("accessToken");
        return token !== null && token !== "";
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser({
                    name: response.data.first_name || response.data.username,
                    profilePic: response.data.photo || "",
                });

                setIsLoggedIn(true);
            } catch (error) {
                if (error.response?.status === 401) handleLogout();
            }
        };

        if (checkAuthToken()) fetchUser();
    }, []);

    useEffect(() => {
        if (checkAuthToken()) setIsLoggedIn(true);
    }, []);

    const handleNavClick = (page) => {
        const section = document.getElementById(page);
        section ? section.scrollIntoView({ behavior: "smooth" }) : location.pathname !== "/" && navigate(`/#${page}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setShowProfileMenu(false);
        navigate("/");
    };

    return (
        <nav className="bg-gradient-to-r from-maroon-600 to-gray-800 shadow-md fixed mx-auto w-full z-30">
            <div className="container mx-auto px-10 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl text-white font-bold">
                    <a href="/" className="hover:underline">VivahBandh</a>
                </div>

                {/* Navbar Buttons */}
                <div className="hidden md:flex space-x-6">
                    {["home", "about-us", "Guide", "partners", "contact-us"].map((label) => (
                        <button
                            key={label}
                            onClick={() => handleNavClick(label)}
                            className="text-white hover:text-pink-400"
                        >
                            {label.replace("-", " ").toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* User Authentication & Profile */}
                <div className="hidden md:flex space-x-4 items-center">
                    {isLoggedIn ? (
                        <div className="relative flex items-center space-x-4">
                            <button onClick={() => navigate("/profile")} className="relative text-white text-3xl">
                                <FaUsers className="hover:text-pink-400" />
                            </button>
                            {/* Bell Icon with Notification Dot */}
                            <button onClick={() => navigate("/notification")} className="relative text-white text-3xl">
                                <FaBell className="hover:text-pink-400" />
                                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>

                            {/* Profile Icon */}
                            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="text-white text-3xl pt-1 hover:text-pink-400">
                                {user.profilePic ? (
                                    <img
                                        src={`http://127.0.0.1:8000${user.profilePic}`}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                ) : (
                                    <FaUserCircle />
                                )}
                            </button>

                            {/* Profile Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg p-4 text-gray-800">
                                    <p className="font-semibold">
                                        {user.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </p>
                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                    <button
                                        onClick={() => setShowProfileMenu(false)} // Hide the menu
                                        className="mt-2 w-full text-center bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            navigate("/userprofile");
                                        }}
                                        className="mt-2 w-full text-center bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        User Profile
                                    </button>

                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
