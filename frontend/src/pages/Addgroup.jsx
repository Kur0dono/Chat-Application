import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import Cloud from "../assets/Cloud.svg"
import cross from "../assets/Xbox Cross.svg"

const AddGroup = () => {
const [allContacts, setAllContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [groupName, setGroupName] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const { authUser } = useAuthStore()

  // Fetch users from backend (excluding self)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users", { withCredentials: true })
        console.log("Fetched users:", res.data)
        setAllContacts(res.data)
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchUsers()
  }, [authUser])

  const filteredContacts = allContacts.filter((contact) =>
    (contact.fullname || contact.username || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const containerStyle = {
    //minHeight: "932px",
    height: "100vh",
    width: "430px",
    backgroundColor: "#FFFFFF",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    position: "relative", 
  }

  const headerStyle = {
    padding: "20px 24px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #EDEDED",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const headerLeftStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    position: "relative",
    overflow: "hidden",
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
    fontSize: "20px",
    fontWeight: "600",
    color: "#000000",
    margin: 0,
    opacity: isSearchActive ? 0 : 1,
    transform: isSearchActive ? "translateY(-10px) scale(0.95)" : "translateY(0) scale(1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "absolute",
    left: "40px",
  }

  const searchContainerStyle = {
    position: "absolute",
    left: "40px",
    right: "60px",
    opacity: isSearchActive ? 1 : 0,
    transform: isSearchActive ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: isSearchActive ? "auto" : "none",
  }

  const searchInputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #CCCCCC",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
  }

  const searchIconStyle = {
    width: "24px",
    height: "24px",
    color: "#000000",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  }

  
  const groupNameSectionStyle = {
    padding: "16px 24px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #EDEDED",
  }

  const groupNameInputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #CCCCCC",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  }

  const selectedContactsStyle = {
    padding: "16px 24px",
    borderBottom: "1px solid #EDEDED",
    backgroundColor: "#FFFFFF",
  }

  const selectedContactsRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  }

  const selectedContactStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: "20px",
    padding: "6px 12px 6px 6px",
    gap: "8px",
  }

  const selectedAvatarStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    objectFit: "cover",
  }

  const selectedNameStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#000000",
  }

  const removeButtonStyle = {
    width: "16px",
    height: "16px",
    color: "#000000",
    cursor: "pointer",
    marginLeft: "4px",
  }

  const contactsListStyle = {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "#FFFFFF",
    
  }

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #EDEDED",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }

  const contactAvatarStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    marginRight: "16px",
    objectFit: "cover",
  }

  const contactNameStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#000000",
  }

 
  const cloudButtonContainerStyle = {
    position: "fixed",
    bottom: "24px",
    right: "calc(50% - 215px + 24px)", 
    width: "60px",
    height: "150px",
    zIndex: 1000, 
    border: "none",
    outline: "none",
  }

  const cloudButtonStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    cursor: selectedContacts.length > 1 && groupName.trim() ? "pointer" : "not-allowed",
    opacity: selectedContacts.length > 1 && groupName.trim() ? 1 : 0.5,
    transition: "all 0.2s ease",
    position: "relative",
    padding: 0,
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))", 
    outline: "none",
  }

  const closeButtonStyle = {
    position: "absolute",
    top: "50px",
    right: "-2px",
    width: "10px",
    height: "10px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    zIndex: 1,
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (!isSearchActive) {
      setSearchTerm("")
    }
  }

  const handleContactClick = (contact) => {
    const isSelected = selectedContacts.some((selected) => selected._id === contact._id)
    if (isSelected) {
      setSelectedContacts(selectedContacts.filter((selected) => selected._id !== contact._id))
    } else {
      setSelectedContacts([...selectedContacts, contact])
    }
  }

  const handleRemoveContact = (contactId) => {
    setSelectedContacts(selectedContacts.filter((contact) => contact._id !== contactId))
  }

  const handleBackHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleBackLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  const handleSearchIconHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleSearchIconLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  const handleContactHover = (e) => {
    e.currentTarget.style.backgroundColor = "#EDEDED"
  }

  const handleContactLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#FFFFFF"
  }

  // Cloud button hover effects
  const handleCloudButtonHover = (e) => {
    if (selectedContacts.length > 1 && groupName.trim()) {
      e.currentTarget.style.transform = "scale(1.1)"
    }
  }

  const handleCloudButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }

  const handleCreateGroup = async () => {
    if (selectedContacts.length < 2 || !groupName.trim()) return
    try {
      await axios.post(
        "http://localhost:5001/api/groups",
        {
          name: groupName,
          members: selectedContacts.map((c) => c._id),
        },
        { withCredentials: true },
      )
      alert("Group created!")
      navigate("/home")
    } catch (err) {
      alert("Failed to create group.")
    }
  }

  // Handle close button click
  const handleCloseClick = (e) => {
    e.stopPropagation() 
    navigate(-1)
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerLeftStyle}>
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

          <h1 style={titleStyle}>Add Group</h1>

          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search contacts..."
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={isSearchActive}
            />
          </div>
        </div>

        <div onClick={handleSearchToggle} onMouseEnter={handleSearchIconHover} onMouseLeave={handleSearchIconLeave}>
          <svg style={searchIconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Group Name Input */}
      <div style={groupNameSectionStyle}>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={groupNameInputStyle}
        />
      </div>

      {/* Selected Contacts */}
      {selectedContacts.length > 0 && (
        <div style={selectedContactsStyle}>
          <div style={selectedContactsRowStyle}>
            {selectedContacts.map((contact) => (
              <div key={contact._id} style={selectedContactStyle}>
                <img
                  src={contact.profilePic || contact.avatar || "/placeholder.svg"}
                  alt={contact.fullname || contact.username}
                  style={selectedAvatarStyle}
                />
                <span style={selectedNameStyle}>{contact.fullname || contact.username}</span>
                <svg
                  style={removeButtonStyle}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => handleRemoveContact(contact._id)}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div style={contactsListStyle}>
        {filteredContacts.map((contact) => {
          const isSelected = selectedContacts.some((selected) => selected._id === contact._id)
          return (
            <div
              key={contact._id}
              style={{
                ...contactItemStyle,
                backgroundColor: isSelected ? "#EDEDED" : "#FFFFFF",
              }}
              onClick={() => handleContactClick(contact)}
              onMouseEnter={!isSelected ? handleContactHover : undefined}
              onMouseLeave={!isSelected ? handleContactLeave : undefined}
            >
              <img
                src={contact.profilePic || contact.avatar || "/placeholder.svg"}
                alt={contact.fullname || contact.username}
                style={contactAvatarStyle}
              />
              <div style={contactNameStyle}>{contact.fullname || contact.username}</div>
            </div>
          )
        })}
      </div>

      {/* Cloud Create Group Button - Now overlays on content */}
      <div style={cloudButtonContainerStyle}>
        <button
          style={cloudButtonStyle}
          disabled={selectedContacts.length < 2 || !groupName.trim()}
          onClick={handleCreateGroup}
          onMouseEnter={handleCloudButtonHover}
          onMouseLeave={handleCloudButtonLeave}
        >
          {/* Close X button on top right */}
          <div style={closeButtonStyle} onClick={handleCloseClick}>
            <img src={cross} alt="Close" style={{ width: "12px", height: "12px" }} />
          </div>

          {/* Cloud icon */}
          <img
            src={Cloud}
            alt="Create Group"
            style={{ width: "100%", height: "100%", objectFit: "contain", border: "none", outline: "none" }}
          />
        </button>
      </div>
    </div>
  )
}

export default AddGroup
