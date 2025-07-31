

import { X } from "lucide-react"
import { useState, useRef } from "react"
import axios from "axios"
import { useChatStore } from "../store/useChatStore"
import camera from "../assets/Switch Camera.svg"

export default function GroupDetailsModal({ group, onClose }) {

  const currentGroup = group || defaultGroup
   const { setSelectedUser, updateSidebarGroupAvatar } = useChatStore()

  const [groupProfilePic, setGroupProfilePic] = useState(currentGroup.avatar || "/placeholder.svg?height=80&width=80")
  const fileInputRef = useRef(null)

  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setGroupProfilePic(reader.result)
        //Send to backend
        try {
          await axios.put(
            `http://localhost:5001/api/groups/${group._id}/avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          setSelectedUser({ ...currentGroup, avatar: reader.result })
          updateSidebarGroupAvatar(group._id, reader.result)
          console.log("Group avatar updated successfully")
          
        } catch (err) {
          
          console.error("Error updating group avatar:", err)
          setGroupProfilePic(currentGroup.avatar || "/placeholder.svg?height=80&width=80")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    maxWidth: "90%",
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

  const groupImageContainerStyle = {
    position: "relative",
    marginBottom: "16px",
  }

  const groupImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #FFFFFF",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  }

  const cameraIconStyle = {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    width: "24px",
    height: "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    cursor: "pointer",
  }

  const groupNameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000000",
    margin: "0 0 24px 0",
    textAlign: "center",
  }

  const memberListStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }

  const memberItemStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: "12px",
    padding: "12px 16px",
  }

  const memberAvatarStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "16px",
  }

  const memberNameStyle = {
    fontSize: "16px",
    fontWeight: "500",
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

        <div style={groupImageContainerStyle}>
          <img src={groupProfilePic || "/placeholder.svg"} alt={currentGroup.name} style={groupImageStyle} />
          <div style={cameraIconStyle} onClick={handleCameraClick}>
            <img src={camera} alt="Change Group Photo" style={{ width: "16px", height: "16px" }} />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <h2 style={groupNameStyle}>{currentGroup.name}</h2>

        <div style={memberListStyle}>
          {currentGroup.members && currentGroup.members.length > 0 ? (
            currentGroup.members.map((member) => (
              <div key={member._id} style={memberItemStyle}> 
                <img
                  src={member.avatar || member.profilePic || "/placeholder.svg"} 
                  alt={member.fullname || member.username || "Member"} 
                  style={memberAvatarStyle}
                />
                <span style={memberNameStyle}>{member.fullname || member.username}</span> 
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>No members to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
