import { X } from 'lucide-react';
import {useAuthStore} from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const {selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
  return (
    <div>ChatHeader</div>
  )
}

export default ChatHeader