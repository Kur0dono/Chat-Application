import { useState } from "react"
import group from "../assets/Add Male User Group.svg"
import Male from "../assets/Add User Male.svg"
import { useChatStore } from "../store/useChatStore"
import { useNavigate } from "react-router-dom" 

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false)
  const [newContactData, setNewContactData] = useState({
    name: "",
    phoneNumber: "",
  })
  const [isAddingContact, setIsAddingContact] = useState(false)

  const navigate = useNavigate() 
  const { sidebarUsers } = useChatStore()

 
  const filteredUsers = sidebarUsers
    .filter((item) => item.type === "user" && item.user)
    .filter((item) => (item.user.fullname || item.user.username || "").toLowerCase().includes(searchTerm.toLowerCase()))

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
    backgroundColor: "#ffffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "35px", 
    borderBottom: "1px solid #c7c7c7ff",
    
  }

  const headerLeftStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
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

  const searchIconStyle = {
    width: "24px",
    height: "24px",
    color: "#000000",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  }

  const actionSectionStyle = {
    backgroundColor: "#ffffffff",
    padding: "0 24px 16px 24px",
    borderBottom: "1px solid #c7c7c7ff",
  }

  const actionItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 0",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  }

  const actionIconStyle = {
    width: "20px",
    height: "20px",
    marginRight: "16px",
  }

  const actionTextStyle = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#000000",
  }

  const contactsListStyle = {
    flex: 1,
    backgroundColor: "#F5F5F5",
  }

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #d4d4d4ff",
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
    fontSize: "18px",
    fontWeight: "500",
    color: "#000000",
  }

  const searchOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    opacity: isSearchActive ? 1 : 0,
    visibility: isSearchActive ? "visible" : "hidden",
    transition: "all 0.3s ease",
  }

  const searchModalStyle = {
    position: "absolute",
    top: "100px",
    left: "24px",
    right: "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "20px",
    zIndex: 999,
    transform: isSearchActive ? "translateY(0)" : "translateY(-20px)",
    opacity: isSearchActive ? 1 : 0,
    transition: "all 0.3s ease",
  }

  const searchInputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#F5F5F5",
    outline: "none",
    boxSizing: "border-box",
  }

  
  const addContactOverlayStyle = {
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
    opacity: isAddContactModalOpen ? 1 : 0,
    visibility: isAddContactModalOpen ? "visible" : "hidden",
    transition: "all 0.3s ease",
  }

  const addContactModalStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    width: "320px",
    maxWidth: "90%",
    transform: isAddContactModalOpen ? "scale(1)" : "scale(0.9)",
    transition: "transform 0.3s ease",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  }

  const modalTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "20px",
    textAlign: "center",
  }

  const inputContainerStyle = {
    marginBottom: "16px",
  }

  const inputLabelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#666666",
    marginBottom: "8px",
    display: "block",
  }

  const modalInputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#F9F9F9",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  }

  const modalButtonsStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  }

  const cancelButtonStyle = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#E0E0E0",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }

  const addButtonStyle = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: newContactData.name.trim() || newContactData.phoneNumber.trim() ? "pointer" : "not-allowed",
    opacity: newContactData.name.trim() || newContactData.phoneNumber.trim() ? 1 : 0.5,
    transition: "all 0.2s ease",
  }

  const handleBackClick = () => {
    console.log("Back clicked")
    window.history.back()
  }

  const handleSearchClick = () => {
    setIsSearchActive(true)
  }

  const handleSearchClose = () => {
    setIsSearchActive(false)
    setSearchTerm("")
  }

  const handleNewGroupClick = async (item) => {
    if (item === "New Group") {
      navigate("/add-group")
      console.log("New Group clicked")
    }
  }


  const handleNewContactClick = () => {
    console.log("New Contact clicked")
    setIsAddContactModalOpen(true)
  }

  
  const handleAddContactClose = () => {
    setIsAddContactModalOpen(false)
    setNewContactData({ name: "", phoneNumber: "" })
  }

  const handleInputChange = (field, value) => {
    setNewContactData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddContact = async () => {
    if (!newContactData.name.trim() && !newContactData.phoneNumber.trim()) {
      return
    }

    setIsAddingContact(true)

    try {
      // TODO: Replace with your actual API call
      console.log("Adding new contact:", newContactData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here:
      // 1. Make API call to add contact
      // 2. Update your contacts store/state
      // 3. Show success message

      alert(`Contact ${newContactData.name || newContactData.phoneNumber} added successfully!`)

      
      handleAddContactClose()
    } catch (error) {
      console.error("Error adding contact:", error)
      alert("Failed to add contact. Please try again.")
    } finally {
      setIsAddingContact(false)
    }
  }

  const handleContactClick = (contact) => {
    console.log("Contact clicked:", contact.name)
    // Add navigation to contact details or chat
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

  const handleActionHover = (e) => {
    e.currentTarget.style.opacity = "0.7"
  }

  const handleActionLeave = (e) => {
    e.currentTarget.style.opacity = "1"
  }

  const handleContactHover = (e) => {
    e.currentTarget.style.backgroundColor = "#F0F0F0"
  }

  const handleContactLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#FFFFFF"
  }

 
  const handleCancelHover = (e) => {
    e.currentTarget.style.backgroundColor = "#D0D0D0"
  }

  const handleCancelLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#E0E0E0"
  }

  const handleAddHover = (e) => {
    if (newContactData.name.trim() || newContactData.phoneNumber.trim()) {
      e.currentTarget.style.backgroundColor = "#333333"
    }
  }

  const handleAddLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#000000"
  }

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#000000"
  }

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#E0E0E0"
  }

  return (
    <div style={{ ...containerStyle, position: "relative" }}>
      {/* Search Overlay */}
      {isSearchActive && <div style={searchOverlayStyle} onClick={handleSearchClose} />}

      {/* Search Modal */}
      {isSearchActive && (
        <div style={searchModalStyle}>
          <input
            type="text"
            placeholder="Search contacts..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      )}

      {/* NEW: Add Contact Modal */}
      <div style={addContactOverlayStyle} onClick={handleAddContactClose}>
        <div style={addContactModalStyle} onClick={(e) => e.stopPropagation()}>
          <h2 style={modalTitleStyle}>Add New Contact</h2>

          <div style={inputContainerStyle}>
            <label style={inputLabelStyle}>Name</label>
            <input
              type="text"
              placeholder="Enter contact name"
              style={modalInputStyle}
              value={newContactData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={inputLabelStyle}>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              style={modalInputStyle}
              value={newContactData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div style={modalButtonsStyle}>
            <button
              style={cancelButtonStyle}
              onClick={handleAddContactClose}
              onMouseEnter={handleCancelHover}
              onMouseLeave={handleCancelLeave}
              disabled={isAddingContact}
            >
              Cancel
            </button>
            <button
              style={addButtonStyle}
              onClick={handleAddContact}
              onMouseEnter={handleAddHover}
              onMouseLeave={handleAddLeave}
              disabled={isAddingContact || (!newContactData.name.trim() && !newContactData.phoneNumber.trim())}
            >
              {isAddingContact ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>

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
          <h1 style={titleStyle}>Contacts</h1>
        </div>

        <div onClick={handleSearchClick} onMouseEnter={handleSearchIconHover} onMouseLeave={handleSearchIconLeave}>
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

      {/* Action Section */}
      <div style={actionSectionStyle}>
        {/* New Group */}
        <div
          style={actionItemStyle}
          onClick={() => handleNewGroupClick("New Group")}
          onMouseEnter={handleActionHover}
          onMouseLeave={handleActionLeave}
        >
          <img src={group || "/placeholder.svg"} alt="New Group" style={actionIconStyle} />
          <span style={actionTextStyle}>New Group</span>
        </div>

        {/* New Contact */}
        <div
          style={actionItemStyle}
          onClick={handleNewContactClick}
          onMouseEnter={handleActionHover}
          onMouseLeave={handleActionLeave}
        >
          <img src={Male || "/placeholder.svg"} alt="New Contact" style={actionIconStyle} />
          <span style={actionTextStyle}>New Contact</span>
        </div>
      </div>

      {/* Contacts List */}
      <div style={contactsListStyle}>
        {(isSearchActive && searchTerm
          ? filteredUsers
          : sidebarUsers.filter((item) => item.type === "user" && item.user)
        ).map((item) => (
          <div
            key={item.user._id}
            style={{
              ...contactItemStyle,
              justifyContent: "flex-start",
            }}
            onClick={() => handleContactClick(item.user)}
            onMouseEnter={handleContactHover}
            onMouseLeave={handleContactLeave}
          >
            <img
              src={
                item.user.profilePic
                  ? item.user.profilePic
                  : item.user.avatar
                    ? `http://localhost:5001/uploads/${item.user.avatar}`
                    : "/placeholder.svg"
              }
              alt={item.user.fullname || item.user.username}
              style={contactAvatarStyle}
            />
            <div style={contactNameStyle}>{item.user.fullname || item.user.username}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsPage
