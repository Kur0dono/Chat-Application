import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Chatcontainer from "../components/Chatcontainer";

const HomePage = () => {
  const { getSidebarUsersWithLastMessages, sidebarUsers, selectedUser, setSelectedUser, isUsersloading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getSidebarUsersWithLastMessages();
  }, [getSidebarUsersWithLastMessages]);

  if (isUsersloading) return <div>Loading...</div>;
  if (selectedUser) return <Chatcontainer />;

  // Filter sidebar users if "showOnlineOnly" is true
  const filteredSidebarUsers = showOnlineOnly
    ? sidebarUsers.filter(({ user }) => onlineUsers.includes(user._id))
    : sidebarUsers;

  return (
    <div>
      <button
        onClick={() => setShowOnlineOnly((prev) => !prev)}
        style={{ margin: "10px", padding: "5px 10px" }}
      >
        {showOnlineOnly ? "Show All" : "Show Online Only"}
      </button>
      {filteredSidebarUsers.map(({ user, lastMessage }) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #333"
          }}
        >
          <img
            src={user.profilePic || user.avatar}
            alt={user.fullname}
            width={40}
            height={40}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <div style={{ fontWeight: "bold", color: "#fff" }}>{user.fullname}</div>
            <div style={{ color: "#aaa", fontSize: "0.9em" }}>
              {lastMessage
                ? lastMessage.text ||
                  (lastMessage.image && "📷 Image") ||
                  (lastMessage.audio && "🎤 Audio")
                : "No messages yet"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;