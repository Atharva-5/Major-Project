import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userProfile.css"; // <-- Import the CSS file

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    caste: "",
    gender: "",
    photo: null,
  });
  const [userId, setUserId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(res.data.id);
        setProfile((prev) => ({
          ...prev,
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone || "",
          caste: res.data.caste || "",
          gender: res.data.gender || "",
        }));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setProfile({ ...profile, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in profile) {
        if (profile[key]) {
          formData.append(key, profile[key]);
        }
      }

      await axios.post(`http://localhost:8000/api/addprofile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={profile.username}
              disabled
              placeholder=" "
              className="input"
            />
            <label className="floating-label">Username</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder=" "
              className="input"
            />
            <label className="floating-label">Email</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder=" "
              className="input"
            />
            <label className="floating-label">Phone</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="caste"
              value={profile.caste}
              onChange={handleChange}
              placeholder=" "
              className="input"
            />
            <label className="floating-label">Caste</label>
          </div>

          <div className="form-group">
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="" disabled hidden />
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label className="floating-label">Gender</label>
          </div>

          <div className="form-group file-input">
            <label>Profile Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="photo-preview"
              />
            )}
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
