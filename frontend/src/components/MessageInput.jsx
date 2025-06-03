import { useState, useRef } from "react"
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Image, Send } from "lucide-react";
// This component allows users to input text messages and attach images.

const Messageinput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage, isMessagesLoading } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
           toast.error("Please select an image file.");
           return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };   

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Clear the file input
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        

        const messageData = {
            text: text.trim(),
            image: imagePreview,
        };

        try {
            await sendMessage(messageData);
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Clear the file input
            }
        } catch (error) {
            toast.error("Failed to send message.", error);
        }
    };

    return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center gap-2 p-2 border-t bg-white"
      style={{ position: "relative" }}
    >
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="p-2"
        title="Attach image"
      >
        <Image className="w-5 h-5 text-gray-500" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2 outline-none"
        placeholder="Type your message..."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isMessagesLoading}
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
        disabled={isMessagesLoading}
      >
        <Send className="w-5 h-5" />
      </button>
      {imagePreview && (
        <div className="absolute bottom-14 left-2 bg-white border rounded shadow p-2 flex items-center">
          <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded mr-2" />
          <button
            type="button"
            onClick={removeImage}
            className="text-red-500 text-xs"
          >
            Remove
          </button>
        </div>
      )}
    </form>
  );
};

export default Messageinput