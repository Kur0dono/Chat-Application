import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const handleUpdateProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image, phone, bio });
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ profilePic: selectedImage, phone, bio });
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            disabled={isUpdatingProfile}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            disabled={isUpdatingProfile}
          />
        </div>
        <div>
          <label htmlFor="avatar-upload">
            <Camera className="w-6 h-6 text-gray-500 cursor-pointer" />
          </label>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleUpdateProfile}
            disabled={isUpdatingProfile}
          />
        </div>
        <button type="submit" disabled={isUpdatingProfile}>
          {isUpdatingProfile ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;