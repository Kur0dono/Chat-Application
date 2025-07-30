import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Chatcontainer from "../components/Chatcontainer";
import cloud from "../assets/cloud.svg";
import { useNavigate } from "react-router-dom";
import SidebarSkeleton from "../components/SidebarSkeleton";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const {
    getSidebarUsersWithLastMessages,
    sidebarUsers,
    selectedUser,
    setSelectedUser,
    isUsersloading,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getSidebarUsersWithLastMessages();
  }, [getSidebarUsersWithLastMessages]);

    if (isUsersloading) {
    return <SidebarSkeleton count={6} />; // Render 6 skeleton items
  }
  if (selectedUser) return <Chatcontainer />;

  
  const filteredSidebarUsers = showOnlineOnly
    ? sidebarUsers.filter(({ user }) => user && onlineUsers.includes(user._id))
    : sidebarUsers;

  const searchedSidebarUsers = filteredSidebarUsers.filter((item) => {
    if (item.type === "user" && item.user) {
      return (
        (item.user.fullname || item.user.username || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    } else if (item.type === "group" && item.group) {
      return (
        (item.group.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  
  const containerStyle = {
    minHeight: "932px",
    width: "430px",
    backgroundColor: "#FFFFFF",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    position: "relative", 
    overflow: "hidden", 
    height: "100vh", 
    
    
  };

  
  const sidebarOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    opacity: isSidebarOpen ? 1 : 0,
    visibility: isSidebarOpen ? "visible" : "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    
  };

 
  const sidebarStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "240px",
    height: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 999,
    transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "32px 24px 24px 24px",
    
  };

  
  const sidebarHeaderStyle = {
    marginBottom: "20px",
    borderBottom: "1px solid #c7c7c7ff",
  };

  const sidebarTitleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000000",
    margin: "0 0 24px 0",
    
  };

  const userProfileStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    padding: "25px 0",
  };

  const userAvatarStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    marginRight: "12px",
    objectFit: "cover",
    border: "2px solid #f0f0f0",
  };

  const userNameStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#000000",
  };


  const menuListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    flex: 1,
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 2px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    color: "#000000",
  };

  const menuIconStyle = {
    width: "20px",
    height: "20px",
    marginRight: "13px",
    color: "#000000",
  };

  const menuTextStyle = {
    fontSize: "16px",
    fontWeight: "500",
  };

  const headerStyle = {
    padding: "20px 24px 20px 24px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #e7e7e7ff",
    flexShrink: 0,
  };

  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
  };

  const logoStyle = {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    cursor: "pointer", 
    transition: "transform 0.2s ease", 
  };

  const centerContentStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "16px",
    marginRight: "16px",
    position: "relative",
    height: "40px",
    overflow: "hidden",
  };

  const toggleContainerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    display: "flex",
    backgroundColor: "#f1f1f1ff",
    borderRadius: "15px",
    padding: "2px",
    width: "280px",
    height: "36px",
    margin: "0 auto",
    opacity: isSearchActive ? 0 : 1,
    transform: isSearchActive ? "translateY(-10px) scale(0.95)" : "translateY(0) scale(1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: isSearchActive ? "none" : "auto",
  };

  const toggleBackgroundStyle = {
    position: "absolute",
    top: "0px",
    left: showOnlineOnly ? "50%" : "1px",
    width: "50%",
    height: "40px",
    backgroundColor: "#000000",
    borderRadius: "15px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: showOnlineOnly ? "translateX(-2px)" : "translateX(0)",
  };

  const toggleOptionStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    zIndex: 2,
    position: "relative",
    transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none",
  };

  const activeOptionStyle = {
    ...toggleOptionStyle,
    color: "#FFFFFF",
  };

  const inactiveOptionStyle = {
    ...toggleOptionStyle,
    color: "#888888",
  };

  const searchContainerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    opacity: isSearchActive ? 1 : 0,
    transform: isSearchActive ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: isSearchActive ? "auto" : "none",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "10px 16px",
    border: "1px solid #000000",
    borderRadius: "14px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
    height: "36px",
  };

  const searchIconStyle = {
    width: "24px",
    height: "24px",
    color: "#000000",
    cursor: "pointer",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  };

  const chatListStyle = {
    flex: 1,
    overflowY: "auto",
    width: "100%"
  };

  const chatItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #dfdfdfff",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const avatarStyle = {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    marginRight: "16px",
    objectFit: "cover",
    border: "2px solid #f0f0f0",
  };

  const chatContentStyle = {
    flex: 1,
    minWidth: 0,
  };

  const nameStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "4px",
  };

  const messageStyle = {
    fontSize: "14px",
    color: "#888888",
    lineHeight: "1.3",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const timeStyle = {
    fontSize: "12px",
    color: "#888888",
    marginLeft: "12px",
    flexShrink: 0,
  };

 
  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };

 
  const handleCloudClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleMenuItemClick = async (item) => {
    if (item === "New Group") {
      navigate("/add-group");
    } else if (item === "Settings") {
      navigate("/settings");
    } else if (item === "Log out") {
      await logout();
      navigate("/login");
    } else if (item === "Contacts") {
      navigate("/contacts");
     
    }
    handleCloseSidebar();
  };

 
  const handleCloudHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleCloudLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleSearchIconHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleSearchIconLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleChatItemHover = (e) => {
    e.currentTarget.style.backgroundColor = "#f8f8f8";
  };

  const handleChatItemLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#FFFFFF";
  };

  const handleMenuItemHover = (e) => {
    e.currentTarget.style.backgroundColor = "#f8f8f8";
  };

  const handleMenuItemLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar Overlay */}
      <div style={sidebarOverlayStyle} onClick={handleCloseSidebar} />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Sidebar Header */}
        <div style={sidebarHeaderStyle}>
          <h1 style={sidebarTitleStyle}>whispr</h1>

          {/* User Profile Section */}
          <div
            style={{ ...userProfileStyle, cursor: "pointer" }}
            onClick={() => {
              handleCloseSidebar();
              navigate("/profile");
            }}
          >
            <img
              src={
                authUser?.profilePic
                  ? authUser.profilePic
                  : authUser?.avatar
                  ? `http://localhost:5001/uploads/${authUser.avatar}`
                  : "/placeholder.svg"
              }
              alt={authUser?.fullname || authUser?.username || "User"}
              style={userAvatarStyle}
            />
            <div>
              <div style={userNameStyle}>{authUser?.fullname || authUser?.username}</div>
              <div
                style={{
                  fontSize: "13px",
                  color: onlineUsers?.includes(authUser?._id) ? "#22c55e" : "#888",
                  fontWeight: 500,
                  marginTop: "2px",
                }}
              >
                {onlineUsers?.includes(authUser?._id) ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div style={menuListStyle}>
          <div
            style={menuItemStyle}
            onClick={() => handleMenuItemClick("New Group")}
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleMenuItemLeave}
          >
            <svg style={menuIconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span style={menuTextStyle}>New Group</span>
          </div>

          <div
            style={menuItemStyle}
            onClick={() => handleMenuItemClick("Settings")}
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleMenuItemLeave}
          >
            <svg style={menuIconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span style={menuTextStyle}>Settings</span>
          </div>

          <div
            style={menuItemStyle}
            onClick={() => handleMenuItemClick("Log out")}
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleMenuItemLeave}
          >
            <svg style={menuIconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span style={menuTextStyle}>Log out</span>
          </div>

          <div
            style={menuItemStyle}
            onClick={() => handleMenuItemClick("Contacts")}
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleMenuItemLeave}
          >
            <svg style={menuIconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span style={menuTextStyle}>Contacts</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* Header */}
      <div style={headerStyle}>
        <div style={topBarStyle}>
          {/* Cloud Logo - NOW CLICKABLE */}
          <div
            style={logoStyle}
            onClick={handleCloudClick}
            onMouseEnter={handleCloudHover}
            onMouseLeave={handleCloudLeave}
          >
            <img
              src={cloud || "/placeholder.svg"}
              alt="Cloud Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Center Content - Toggle OR Search Bar */}
          <div style={centerContentStyle}>
            {/* Toggle Filter */}
            <div style={toggleContainerStyle}>
              <div style={toggleBackgroundStyle}></div>
              <div
                style={!showOnlineOnly ? activeOptionStyle : inactiveOptionStyle}
                onClick={() => setShowOnlineOnly(false)}
              >
                All Chats
              </div>
              <div
                style={showOnlineOnly ? activeOptionStyle : inactiveOptionStyle}
                onClick={() => setShowOnlineOnly(true)}
              >
                Online Only
              </div>
            </div>

            {/* Search Bar */}
            <div style={searchContainerStyle}>
              <input
                type="text"
                placeholder="search"
                style={searchInputStyle}
                autoFocus={isSearchActive}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Search Icon */}
          <div
            onClick={handleSearchToggle}
            onMouseEnter={handleSearchIconHover}
            onMouseLeave={handleSearchIconLeave}
          >
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
      </div>

      {/* Chat List */}
      <div style={chatListStyle}>
        {searchedSidebarUsers.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
            No users or groups found.
          </div>
        ) : (
          searchedSidebarUsers.map((item) => {
            if (item.type === "user" && item.user) {
              const { user, lastMessage } = item;
              return (
                <div
                  key={`user-${user._id}`}
                  style={chatItemStyle}
                  onMouseEnter={handleChatItemHover}
                  onMouseLeave={handleChatItemLeave}
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={
                      user.profilePic
                        ? user.profilePic
                        : user.avatar
                        ? `http://localhost:5001/uploads/${user.avatar}`
                        : "/placeholder.svg"
                    }
                    alt={user.fullname || user.username}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover", marginRight: 16 }}
                  />
                  <div style={chatContentStyle}>
                    <div style={nameStyle}>{user.fullname || user.username}</div>
                    <div style={messageStyle}>
                      {lastMessage
                        ? lastMessage.text ||
                          (lastMessage.image && "📷 Image") ||
                          (lastMessage.audio && "🎤 Audio")
                        : "No messages yet"}
                    </div>
                  </div>
                  <div style={timeStyle}>
                    {lastMessage?.createdAt
                      ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : ""}
                  </div>
                </div>
              );
            } else if (item.type === "group" && item.group) {
              const { group, lastMessage } = item;
              return (
                <div
                  key={`group-${group._id}`}
                  style={chatItemStyle}
                  onMouseEnter={handleChatItemHover}
                  onMouseLeave={handleChatItemLeave}
                  onClick={() => setSelectedUser({ ...group, isGroup: true })}
                >
                  <img
                    src={group.avatar || "/placeholder.svg"}
                    alt={group.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover", marginRight: 16 }}
                  />
                  <div style={chatContentStyle}>
                    <div style={nameStyle}>{group.name}</div>
                    <div style={messageStyle}>
                      {lastMessage
                        ? lastMessage.text ||
                          (lastMessage.image && "📷 Image") ||
                          (lastMessage.audio && "🎤 Audio")
                        : "No messages yet"}
                    </div>
                  </div>
                  <div style={timeStyle}>
                    {lastMessage?.createdAt
                      ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : ""}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;