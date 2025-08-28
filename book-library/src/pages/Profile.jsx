import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Profile() {
  const defaultProfile = {
    name: "Achraf Mamounia",
    email: "achraf@example.com",
    joined: "August 2025",
    avatar:
      "https://ui-avatars.com/api/?name=Achraf+Mamounia&background=0D8ABC&color=fff&size=128",
    bio: "Frontend developer student, passionate about React & web technologies.",
  };

  const [profile, setProfile] = useLocalStorage("bookfinder:profile", defaultProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    setProfile(formData);
    setIsEditing(false);
  }

  return (
    <div className="flex flex-col items-center py-16 px-6">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-32 h-32 rounded-full mb-6 shadow-md"
      />

      {isEditing ? (
        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Avatar URL"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          />
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <p className="text-gray-600 mb-1">{profile.email}</p>
          <p className="text-gray-500 text-sm mb-6">Joined {profile.joined}</p>
          <div className="max-w-md text-center">
            <p className="text-gray-700">{profile.bio}</p>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(true);
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("bookfinder:profile");
                setProfile(defaultProfile);
              }}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
