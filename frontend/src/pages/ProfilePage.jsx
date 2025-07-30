import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import save from "../assets/Save.svg";
import camera from "../assets/Switch Camera.svg";


const ProfilePage = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(authUser?.profilePic || null);
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [email] = useState(authUser?.email || "");
  const [name, setName] = useState(authUser?.fullname || "");
  const [displayName, setDisplayName] = useState(authUser?.fullname || "");

  const [hasChanges, setHasChanges] = useState(false);

  // Handle image upload
  const handleUpdateProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
      setHasChanges(true);
    };
  };

  // Save all changes
  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ profilePic: selectedImage, phone, bio, fullname: name });
    setHasChanges(false);
  };

  // Save individual field
  const handleDoneClick = async (field) => {
    let payload = {};
    if (field === "name") payload = { fullname: name };
    if (field === "phone") payload = { phone };
    if (field === "bio") payload = { bio };
    if (field === "profilePic") payload = { profilePic: selectedImage };
    await updateProfile(payload);
    if (field === "name") setDisplayName(name); 
    setHasChanges(false);
  };

    const containerStyle = {
    minHeight: "932px",
    width: "430px",
    backgroundColor: "#F5F5F5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  }

  const headerStyle = {
    padding: "20px 24px",
    backgroundColor: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    paddingTop: "50px", 
  }

  const backButtonStyle = {
    width: "24px",
    height: "24px",
    color: "#000000",
    cursor: "pointer",
    marginRight: "16px",
    transition: "transform 0.2s ease",
  }

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000000",
    margin: 0,
  }

  const profileSectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 24px",
    backgroundColor: "#F5F5F5",
  }

  const profileImageContainerStyle = {
    position: "relative",
    marginBottom: "16px",
  }

  const profileImageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #FFFFFF",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  }

  const cameraButtonStyle = {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    width: "40px",
    height: "40px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    border: "2px solid #E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  }

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    margin: 0,
  }

  const formSectionStyle = {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: "0 24px",
  }

  const fieldContainerStyle = {
    backgroundColor: "#E0E0E0",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "16px",
    position: "relative",
  }

  const fieldLabelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#000000",
    marginBottom: "8px",
    display: "block",
  }

  const fieldValueStyle = {
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    resize: "none",
    
  }

  const textareaStyle = {
    ...fieldValueStyle,
    height: "16px",
    resize: "none",
  }

  const checkmarkStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "20px",
    height: "20px",
    color: "#000000",
  }

  const saveButtonStyle = {
    margin: "24px",
    padding: "16px",
    backgroundColor: hasChanges ? "#E0E0E0" : "#E0E0E0",
    color: "#000000",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: hasChanges ? "pointer" : "default",
    transition: "all 0.2s ease",
    opacity: hasChanges ? 1 : 0.7,
  }

  const handleBackClick = () => {
    window.history.back();
  }



  const handleFieldChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setHasChanges(true)
  }




  const handleBackHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleBackLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <svg
          style={backButtonStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={handleBackClick}
          onMouseEnter={handleBackHover}
          onMouseLeave={handleBackLeave}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h1 style={titleStyle}>Profile Details</h1>
      </div>

      {/* Profile Photo Section */}
      <div style={profileSectionStyle}>
        <div style={profileImageContainerStyle}>
          <img src={selectedImage || "/placeholder.svg"} alt="Profile" style={profileImageStyle} />
          <label style={cameraButtonStyle}>
            <img src={camera} alt="Change Photo" style={{ width: "20px", height: "20px" }} />
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpdateProfilePic} />
          </label>
        </div>
        <h2 style={nameStyle}>{name}</h2>
      </div>

      <div style={formSectionStyle}>
        {/* Full Name */}
        <div style={fieldContainerStyle}>
          <label style={fieldLabelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setHasChanges(true); }}
            style={fieldValueStyle}
            placeholder="Enter your full name"
          />
          <button
            style={{
              color: "#000000",
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: 0,
              margin: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "24px",
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => handleDoneClick("name")}
            title="Save Name"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        {/* Phone Number */}
        <div style={fieldContainerStyle}>
          <label style={fieldLabelStyle}>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => { setPhone(e.target.value); setHasChanges(true); }}
            style={fieldValueStyle}
            placeholder="Enter phone number"
          />
          <button
            style={{
              color: "#000000",
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: 0,
              margin: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "24px",
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => handleDoneClick("phone")}
            title="Save Phone"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>


        {/* Bio */}
        <div style={fieldContainerStyle}>
          <label style={fieldLabelStyle}>Bio</label>
          <textarea
            value={bio}
            onChange={e => { setBio(e.target.value); setHasChanges(true); }}
            style={textareaStyle}
            placeholder="Tell us about yourself"
            rows={1}
          />
          <button
            style={{
              color: "#000000",
              position: "absolute",
              top: "20px",
              right: "16px",
              padding: 0,
              margin: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "24px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => handleDoneClick("bio")}
            title="Save Bio"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        
        {/* Email (not editable, tick icon only) */}
        <div style={fieldContainerStyle}>
          <label style={fieldLabelStyle}>Email</label>
          <input
            type="email"
            value={email}
            style={fieldValueStyle}
            disabled
          />
          
        </div>
      </div>

      

      {/* Save Button */}
      <button
        style={saveButtonStyle}
        onClick={handleSave}
        disabled={!hasChanges}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <img src={save} alt="Save" style={{ width: "20px", height: "20px" }} />
          Save
        </div>
      </button>
    </div>
  )
};

export default ProfilePage;