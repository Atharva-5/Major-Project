import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState({ name: "", profilePic: "" });

    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Helper function to check if token exists
    const checkAuthToken = () => {
        const token = localStorage.getItem("accessToken");
        return token !== null && token !== "";
    };

    // ✅ Fetch user details if authenticated
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.warn("No token found. User is not logged in.");
                setIsLoggedIn(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User Data:", response.data);

                setUser({
                    name: response.data.first_name || response.data.username,
                    profilePic: response.data.profile_picture || "",
                });

                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error fetching user:", error.response?.data || error.message);

                if (error.response?.status === 401) {
                    console.warn("Invalid token. Logging out.");
                    handleLogout();
                }
            }
        };

        if (checkAuthToken()) {
            fetchUser();
        }
    }, []);

    // ✅ Store token properly after login
    useEffect(() => {
        if (checkAuthToken()) {
            setIsLoggedIn(true);
        }
    }, []);

    // ✅ Handle navigation (scroll or route)
    const handleNavClick = (page) => {
        const section = document.getElementById(page);

        if (section) {
            // Scroll smoothly to the section
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            // Ensure navigation only happens if the section is not on the home page
            if (location.pathname !== "/") {
                navigate(`/#${page}`); // Use hash for direct linking
            }
        }
    };


    // ✅ Logout Function
    const handleLogout = () => {
        console.log("Logging out...");
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
                <div className="hidden md:flex space-x-4">

                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={() => navigate("/profile")}
                                className="relative text-white text-3xl mr-3">
                                <FaBell className="hover:text-pink-400" />
                            </button>
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

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-gray-800">
                                    <p className="font-semibold">
                                        {user.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </p>
                                    {/* <button
                                        onClick={() => navigate("/profile")}
                                        className="mt-2 w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Profile
                                    </button> */}
                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Logout
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