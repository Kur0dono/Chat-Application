

import { X } from "lucide-react"
import email from "../assets/Email.svg";
import icon from "../assets/User.svg";

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 270,
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const modalStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    width: "320px",
    maxWidth: "80%",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }

  const closeButtonStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    color: "#888888",
  }

  const profileImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px",
    border: "2px solid #FFFFFF",
    boxShadow: "0 2px 8px rgba(197, 54, 54, 0.1)",
  }

  const userNameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000000",
    margin: "0 0 8px 0",
  }

  const userBioStyle = {
    fontSize: "14px",
    color: "#888888",
    textAlign: "center",
    marginBottom: "24px",
    lineHeight: "1.4",
  }

  const detailItemStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    width: "90%",
  }

  const detailIconStyle = {
    width: "20px",
    height: "20px",
    marginRight: "16px",
    color: "#000000",
  }

  const detailTextStyle = {
    fontSize: "16px",
    color: "#000000",
  }

  const handleCloseHover = (e) => {
    e.currentTarget.style.color = "#000000"
  }

  const handleCloseLeave = (e) => {
    e.currentTarget.style.color = "#888888"
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={closeButtonStyle} onClick={onClose} onMouseEnter={handleCloseHover} onMouseLeave={handleCloseLeave}>
          <X size={24} />
        </div>

        <img
          src={user.profilePic || user.avatar || "/placeholder.svg?height=80&width=80"}
          alt={user.fullname || user.username}
          style={profileImageStyle}
        />
        <h2 style={userNameStyle}>{user.fullname || user.username || "User"}</h2>
        <p style={userBioStyle}>{user.bio || "ntn to show here"}</p>

        {user.email && (
          <div style={detailItemStyle}>
            <img src={email} alt="Email Icon" style={detailIconStyle} />
            <span style={detailTextStyle}>{user.email}</span>
          </div>
        )}
        {user.fullname && (
          <div style={detailItemStyle}>
            <img src={icon} alt="User Icon" style={detailIconStyle} />
            <span style={detailTextStyle}>{user.fullname}</span>
          </div>
        )}
        {user.phoneNumber && (
          <div style={detailItemStyle}>
            <img src="/phone-icon-details.svg" alt="Phone Icon" style={detailIconStyle} />
            <span style={detailTextStyle}>{user.phoneNumber}</span>
          </div>
        )}
      </div>
    </div>
  )
}
