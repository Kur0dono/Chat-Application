import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";;

const SettingsPage = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "932px", // iPhone 16 Pro Max height
    width: "430px", // iPhone 16 Pro Max width
    backgroundColor: "#FFFFFF",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    padding: "20px 24px",
  }

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "32px",
    paddingTop: "20px",
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
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000000",
    margin: 0,
  }

  const settingsListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flex: 1,
    marginBottom: "32px",
  }

  const settingItemStyle = {
    backgroundColor: "#D9D9D9",
    borderRadius: "10px",
    padding: "27px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }

  const settingContentStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
  }

  const profileAvatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #3F3F3F",
  }

  const settingTextStyle = {
    display: "flex",
    flexDirection: "column",
  }

  const settingTitleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "2px",
  }

  const settingSubtitleStyle = {
    fontSize: "14px",
    color: "#3F3F3F",
  }

  const arrowStyle = {
    width: "20px",
    height: "20px",
    color: "#3F3F3F",
  }

  const logoutButtonStyle = {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    padding: "18px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    width: "100%",
  }

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  }

  const handleSettingClick = (setting) => {
    console.log(`${setting} clicked`)
    // Add navigation logic here
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  const handleBackHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleBackLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  const handleSettingHover = (e) => {
    e.currentTarget.style.backgroundColor = "#CCCCCC"
  }

  const handleSettingLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#D9D9D9"
  }

  const handleLogoutHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333333"
  }

  const handleLogoutLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#000000"
  }

  return (
    <motion.div
      style={containerStyle}
      initial={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }} // Slide out to the right and fade
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
        <h1 style={titleStyle}>Settings</h1>
      </div>

      {/* Settings List */}
      <div style={settingsListStyle}>
        {/* Profile Details */}
        <div
          style={settingItemStyle}
          onClick={() => handleSettingClick("Profile details")}
          onMouseEnter={handleSettingHover}
          onMouseLeave={handleSettingLeave}
        >
          <div style={settingContentStyle}>
            <div style={profileAvatarStyle}>
              <img
                src={
                  authUser?.profilePic
                    ? authUser.profilePic
                    : authUser?.avatar
                    ? `http://localhost:5001/uploads/${authUser.avatar}`
                    : "/placeholder.svg"
                }
                alt={authUser?.fullname || authUser?.username || "User"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={settingTextStyle}>
              <div style={settingTitleStyle}>Profile details</div>
              <div style={settingSubtitleStyle}>Edit profile information</div>
            </div>
          </div>
          <svg style={arrowStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Language Preferences */}
        <div
          style={settingItemStyle}
          onClick={() => handleSettingClick("Language Preferences")}
          onMouseEnter={handleSettingHover}
          onMouseLeave={handleSettingLeave}
        >
          <div style={settingContentStyle}>
            <div style={settingTextStyle}>
              <div style={settingTitleStyle}>Language Preferences</div>
            </div>
          </div>
          <svg style={arrowStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Notification Settings */}
        <div
          style={settingItemStyle}
          onClick={() => handleSettingClick("Notification settings")}
          onMouseEnter={handleSettingHover}
          onMouseLeave={handleSettingLeave}
        >
          <div style={settingContentStyle}>
            <div style={settingTextStyle}>
              <div style={settingTitleStyle}>Notification settings</div>
            </div>
          </div>
          <svg style={arrowStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* App Settings */}
        <div
          style={settingItemStyle}
          onClick={() => handleSettingClick("App settings")}
          onMouseEnter={handleSettingHover}
          onMouseLeave={handleSettingLeave}
        >
          <div style={settingContentStyle}>
            <div style={settingTextStyle}>
              <div style={settingTitleStyle}>App settings</div>
            </div>
          </div>
          <svg style={arrowStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Help and Support */}
        <div
          style={settingItemStyle}
          onClick={() => handleSettingClick("Help and support")}
          onMouseEnter={handleSettingHover}
          onMouseLeave={handleSettingLeave}
        >
          <div style={settingContentStyle}>
            <div style={settingTextStyle}>
              <div style={settingTitleStyle}>Help and support</div>
            </div>
          </div>
          <svg style={arrowStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Logout Button */}
      <button
        style={logoutButtonStyle}
        onClick={handleLogout}
        onMouseEnter={handleLogoutHover}
        onMouseLeave={handleLogoutLeave}
      >
        Log out
      </button>
    </motion.div>
  );
};

export default SettingsPage;