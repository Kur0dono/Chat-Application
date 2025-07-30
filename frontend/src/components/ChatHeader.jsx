"use client"
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import { useState } from "react"
import UserDetailsModal from "./UserDetailsModal.jsx"
import GroupDetailsModal from "./GroupDetailsModal.jsx";
import phone from "../assets/Phone.svg";
import video from "../assets/Video Call.svg";
import menu from "../assets/Menu Vertical.svg";




const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Check if selected user is online
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id)

  const handleBackClick = () => {
    setSelectedUser(null)
  }

  const handlePhoneCall = () => {
    console.log("Phone call clicked")
    // Add phone call logic here
  }

  const handleVideoCall = () => {
    console.log("Video call clicked")
    // Add video call logic here
  }

  const handleMenuClick = () => {
    console.log("Menu clicked")
    // Add menu logic here
  }

  const handleProfileClick = () => {
    setShowDetailsModal(true)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
  }

  if (!selectedUser) return null

  const containerStyle = {
    width: "430px",
    backgroundColor: "#F5F5F5",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #EDEDED",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
  }

  const backButtonStyle = {
    width: "24px",
    height: "24px",
    marginRight: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  }

  const profileImageStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    marginRight: "16px",
    objectFit: "cover",
    border: "2px solid #FFFFFF",
  }

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }

  const userNameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
    margin: 0,
    lineHeight: "1.2",
  }

  const statusContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "2px",
  }

  const statusTextStyle = {
    fontSize: "14px",
    color: "#666666",
    margin: 0,
  }

  const onlineDotStyle = {
    width: "8px",
    height: "8px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    marginLeft: "6px",
  }

  const actionsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  }

  const actionButtonStyle = {
    width: "28px",
    height: "28px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const handleBackHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleBackLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  const handleActionHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleActionLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  return (
    <div style={containerStyle}>
      {/* Left Section - Back Button + Profile Info */}
      <div style={leftSectionStyle}>
        <div
          style={backButtonStyle}
          onClick={handleBackClick}
          onMouseEnter={handleBackHover}
          onMouseLeave={handleBackLeave}
        >

          
        <svg
          
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          color ="#3F3F3F"
        
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
         
        </div>

        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleProfileClick}>
          <img
            src={
              selectedUser.profilePic ||
              selectedUser.avatar ||
              "/placeholder.svg?height=48&width=48" ||
              "/placeholder.svg" ||
              "/placeholder.svg"
            }
            alt={selectedUser.fullname || selectedUser.username}
            style={profileImageStyle}
          />

          <div style={userInfoStyle}>
            <h2 style={userNameStyle}>
              {selectedUser.isGroup
                ? selectedUser.name
                : selectedUser.fullname || selectedUser.username || "User"}
            </h2>
            <div style={statusContainerStyle}>
              <p style={statusTextStyle}>{isOnline ? "Active now" : "Whisperd Away"}</p>
              {isOnline && <div style={onlineDotStyle} />}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div style={actionsStyle}>
        {/* Phone Call Button */}
        <div
          style={actionButtonStyle}
          onClick={handlePhoneCall}
          onMouseEnter={handleActionHover}
          onMouseLeave={handleActionLeave}
        >
          <img src={phone} alt="Video Call" style={{ width: "24px", height: "24px" }} />
        </div>

        {/* Video Call Button */}
        <div
          style={actionButtonStyle}
          onClick={handleVideoCall}
          onMouseEnter={handleActionHover}
          onMouseLeave={handleActionLeave}
        >
          <img src={video} alt="Video Call" style={{ width: "24px", height: "24px" }} />
        </div>

        {/*menu*/}
        <div
          style={actionButtonStyle}
          onClick={handleVideoCall}
          onMouseEnter={handleActionHover}
          onMouseLeave={handleActionLeave}
        >
          <img src={menu} alt="Menu" style={{ width: "24px", height: "24px" }} />
        </div>

        {/* Menu Button */}
        <div>
       
          <img src={menu} alt="Menu" style={{ width: "24px", height: "24px" }} />
        </div>
      </div>
      {showDetailsModal && (
        selectedUser.isGroup
          ? <GroupDetailsModal group={selectedUser} onClose={handleCloseDetailsModal} />
          : <UserDetailsModal user={selectedUser} onClose={handleCloseDetailsModal} />
      )}
    </div>
  )
}

export default ChatHeader
