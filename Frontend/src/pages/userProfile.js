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
    occupation: "",
    interests: "", // will be a comma-separated string
  });

  const [userId, setUserId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/user/", {
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
          occupation: res.data.occupation || "",
          interests: (res.data.interests || []).join(", "), // convert list to string
          photo: res.data.photo || null,  // Fetch the photo URL
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
          if (key === "interests") {
            const interestsList = profile[key].split(",").map(item => item.trim());
            formData.append(key, JSON.stringify(interestsList)); // ✅ send list as JSON string
          } else {
            formData.append(key, profile[key]);
          }
        }
      }

      await axios.post(`http://localhost:8000/auth/addprofile/${userId}`, formData, {
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
        <h2>Your Profile 💖</h2>
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

          <div className="form-group">
            <input
              type="text"
              name="occupation"
              value={profile.occupation}
              onChange={handleChange}
              placeholder=" "
              className="input"
            />
            <label className="floating-label">Occupation</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="interests"
              value={profile.interests}
              onChange={handleChange}
              placeholder="e.g. Music, Reading, Travel"
              className="input"
            />
            <label className="floating-label">Interests (comma-separated)</label>
          </div>

          <div className="form-group file-input">
            <label>Profile Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="photo-preview" />
            ) : profile.photo ? (
              <img
                src={`http://localhost:8000${profile.photo}`}
                alt="Profile"
                className="photo-preview"
              />
            ) : null}
          </div>

          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
