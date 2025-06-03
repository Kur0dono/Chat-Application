import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatMessages = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4" style={{ background: "#1E1E1E" }}>
      {messages.map((msg, idx) => {
        const isMe = msg.senderId === authUser._id;
        return (
          <div key={msg._id || idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
              {/* Image message */}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="rounded-lg mb-1 max-w-[50px] max-h-[50px] object-cover"
                  style={{ border: "1px solid #eee" }}
                />
              )}
              {/* Audio message */}
              {msg.audio && (
                <audio controls className="mb-1">
                  <source src={msg.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {/* Text message */}
              {msg.text && (
                <div
                  className={`px-4 py-2 rounded-2xl mb-1 text-base break-words ${
                    isMe
                      ? "bg-white border border-gray-300 text-black"
                      : "bg-gray-200 text-black"
                  }`}
                  style={{ borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}
                >
                  {msg.text}
                </div>
              )}
              {/* Timestamp */}
              <span className="text-xs text-gray-400 mt-1" style={{ alignSelf: isMe ? "flex-end" : "flex-start" }}>
                {formatMessageTime(msg.createdAt)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;