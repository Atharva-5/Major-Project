import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaBell, FaUsers } from "react-icons/fa";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState({ name: "", profilePic: "" });
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const checkAuthToken = () => {
        const token = localStorage.getItem("accessToken");
        return token !== null && token !== "";
    };

    const fetchUser = useCallback(async () => {
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
    }, []);

    const fetchNotifications = useCallback(async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) return;

        try {
            const response = await axios.get("http://127.0.0.1:8000/auth/notifications/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotifications(response.data);
            const unread = response.data.filter((notification) => !notification.read).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    }, []);

    useEffect(() => {
        if (checkAuthToken()) {
            fetchUser();
            fetchNotifications();
        }
    }, [fetchUser, fetchNotifications]);

    const handleNavClick = (page) => {
        const section = document.getElementById(page);
        section
            ? section.scrollIntoView({ behavior: "smooth" })
            : location.pathname !== "/" && navigate(`/#${page}`);
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

                {/* User Auth Section */}
                <div className="hidden md:flex space-x-4 items-center">
                    {isLoggedIn ? (
                        <div className="relative flex items-center space-x-4">
                            <button onClick={() => navigate("/profile")} className="relative text-white text-3xl">
                                <FaUsers className="hover:text-pink-400" />
                            </button>

                            {/* Notification Button with Badge */}
                            <button onClick={() => navigate("/notification")} className="relative text-white text-3xl">
                                <FaBell className="hover:text-pink-400" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex justify-center items-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Profile Icon */}
                            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="text-white text-3xl pt-1 hover:text-pink-400">
                                {user.profilePic ? (
                                    <img
                                        src={`http://127.0.0.1:8000${user.profilePic}`}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full border-2 border-white"
                                    />
                                ) : (
                                    <FaUserCircle />
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-32 w-48 bg-white rounded-lg shadow-xl p-4 text-gray-800 transition-all transform scale-95 hover:scale-100 ease-in-out duration-200 z-50 max-h-80 overflow-y-auto">
                                    {/* User Name */}
                                    <p className="font-semibold text-lg text-gray-900">
                                        {user.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-3 space-y-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                                        >
                                            Logout
                                        </button>

                                        <button
                                            onClick={() => setShowProfileMenu(false)}
                                            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                navigate("/userprofile");
                                            }}
                                            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out"
                                        >
                                            User Profile
                                        </button>
                                    </div>
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
