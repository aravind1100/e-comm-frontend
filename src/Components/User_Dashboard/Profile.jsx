import { useState, useEffect, useContext } from "react";
import API from "../../utils/api.js";
import { AuthContext } from "../../Context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Save,
  X,
} from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    profileImage: "", // URL or Base64
  });
  const handleCancel = () => {
    setEditMode(false);
    // Reset to original data if needed
  };
  const [imagePreview, setImagePreview] = useState("");

  // Load existing user data
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${user._id}`);

        const data = res.data.user; // backend full user object

        setProfileData({
          username: data.username || "",
          email: data.email || "",
          role: data.role || "",
          phone: data.phone || "",
          address: data.address || "",
          profileImage: data.profileImage || "",
        });

        setImagePreview(data.profileImage || "");
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [user]);

  // Handle input updates
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, profileImage: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Save to backend
  const handleSave = async () => {
    try {
      const { username, phone, address, profileImage } = profileData;
      const res = await API.put(`/users/${user._id}`, {
        username,
        phone,
        address,
        profileImage,
      });
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.log("Update error:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          {/* Profile Section */}
          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>

                {editMode && (
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-1 right-1 md:top-10 md:right-15">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-indigo-50 border border-indigo-200 "
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="font-medium">Edit Profile</span>
                </button>
              ) : null}
            </div>

            {/* Profile Form */}
            <div className="space-y-6 mt-4">
              {/* Username */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  disabled={!editMode}
                  value={profileData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                    editMode
                      ? "border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  } outline-none`}
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-600"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  disabled={!editMode}
                  value={profileData.phone}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                  maxLength="10"
                  pattern="\d{10}"
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                    editMode
                      ? "border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  } outline-none`}
                />
              </div>

              {/* Address */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  Address
                </label>
                <textarea
                  name="address"
                  disabled={!editMode}
                  value={profileData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  rows="3"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 resize-none ${
                    editMode
                      ? "border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  } outline-none`}
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            {editMode && (
              <div className="mt-8 flex gap-3 justify-end animate-fadeIn">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Tip:</span> Keep your
            profile information up to date to ensure seamless communication and
            better experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
