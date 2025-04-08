import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import HomePage from "./pages/homePage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./pages/profilePage";
import Notification from "./pages/notification";
import Navbar from "./components/Navbar"; // Ensure you import Navbar
import UserProfile from "./pages/userProfile";


function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar always visible */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ HomePage as default */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/userProfile" element={<UserProfile />} />
        


        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
