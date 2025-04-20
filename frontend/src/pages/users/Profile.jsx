import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@src/context/User";

const DashboardProfile = () => {
  const { user } = useUser();
  // const [username, setUsername] = useState(user?.name || "username");
  // const [bio, setBio] = useState("N/A");
  // const [phoneNumber, setPhoneNumber] = useState(
  //   user?.phone || "+91xxxxxxxxxx"
  // );
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1745129082~exp=1745132682~hmac=b46e69eed84b545abad517e6e3fd7d9413808f22f1a45f2d3a84b32074008adc&w=740"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [issue, setIssue] = useState("");

  // const handleSaveProfile = () => {
  //   setIsEditing(false);
  //   // Here you can add logic to save the updated profile to your backend
  //   console.log("Profile saved:", { username, bio, phoneNumber, avatar });
  // };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSendIssue = () => {
    if (issue.trim()) {
      console.log("Issue reported:", issue);
      alert("Your issue has been reported. We'll get back to you soon!");
      setIssue("");
    } else {
      alert("Please describe your issue before sending.");
    }
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Profile Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Username Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                // value={user?.name}
                // onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Enter Username"
              />
            ) : (
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {user?.name}
              </p>
            )}
          </div>

          {/* Bio Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                // value={bio}
                // onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                rows="4"
                placeholder="Enter Bio"
              />
            ) : (
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                N/A
              </p>
            )}
          </div>

          {/* Phone Number Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="text"
                // value={phoneNumber}
                // onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Enter Phone Number"
              />
            ) : (
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {user?.phone}
              </p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            // onClick={() =>
            //   isEditing ? handleSaveProfile() : setIsEditing(true)
            // }
            disabled
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-not-allowed"
          >
            <FontAwesomeIcon
              icon={isEditing ? faSave : faEdit}
              className="mr-2"
            />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Facing Any Issue? Tell Us Section */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4">Facing Any Issue? Tell Us</h3>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          rows="4"
          placeholder="Describe your issue here..."
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSendIssue}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardProfile;
