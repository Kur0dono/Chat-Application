import { useEffect, useRef } from "react";
import {useChatStore} from "../store/useChatStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./Messageinput";
import ChatMessages  from "./ChatMessages";
import { useAuthStore } from "../store/useAuthStore";


const Chatcontainer = () => {
    const {messages,
         getMessages, 
         isMessagesLoading, 
         selectedUser, 
         subscribeToMessages,
        unsubscribeFromMessages
        } = useChatStore ();

    const {authUser} = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
        

    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    
    if (isMessagesLoading) return <div>Loading messages...</div>; 



    return (
    <div className="flex-1 flex flex-col overflow-auto"> 
    <ChatHeader />
    
    <ChatMessages/>
    
    <MessageInput />
    </div>
    );
};
export default Chatcontainer;

