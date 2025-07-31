import { useEffect, useRef } from "react";
import {useChatStore} from "../store/useChatStore";
import { socket } from "../lib/socket";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatMessages  from "./ChatMessages";
import { useAuthStore } from "../store/useAuthStore";
import ChatContainerSkeleton from "./ChatContainerSkeleton";


const Chatcontainer = () => {
    const {messages,
         getMessages, 
         isMessagesLoading, 
         selectedUser, 
         subscribeToMessages,
        unsubscribeFromMessages,
        setMessages
        } = useChatStore ();

    const {authUser} = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;

        if (selectedUser.isGroup) {
            socket.emit("join-group", selectedUser._id);
        }

        // Listen for new messages
        const handleNewMessage = (message) => {
            if (selectedUser.isGroup && message.groupId === selectedUser._id) {
                setMessages((prev) => [...prev, message]);
            }
        };

        socket.on("new-message", handleNewMessage);

        return () => {
            if (selectedUser.isGroup) {
                socket.emit("leave-group", selectedUser._id);
            }
            socket.off("new-message", handleNewMessage);
        };
    }, [selectedUser, setMessages]);

    useEffect(() => {
        if (!selectedUser) return;

        if (selectedUser.isGroup) {
            // Fetch group messages
            getMessages(selectedUser._id, true); 
        } else {
            // Fetch user messages
            getMessages(selectedUser._id, false);
        }

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, selectedUser?.isGroup, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
    
    if (isMessagesLoading) return <ChatContainerSkeleton/>; 



    return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh", 
      width: "430px",  
      background: "#ffffff",
      overflow: "hidden"
    }}
  >
    <ChatHeader />
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
      <ChatMessages messageEndRef={messageEndRef} />
    </div>
    <MessageInput />
  </div>
);
};
export default Chatcontainer;

