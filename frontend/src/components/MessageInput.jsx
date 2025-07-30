

import { useState, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"
import attach from "../assets/Attach.svg"
import emoji from "../assets/LOL.svg"
import mic from "../assets/Microphone.svg"
import cross from "../assets/Xbox Cross.svg"

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)
  const { sendMessage, isMessagesLoading, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()

 const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) {
      toast.error("No file selected.")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!selectedUser) return
    if (!text.trim() && !imagePreview) return // Only block if both are empty

    await sendMessage({
      text,
      image: imagePreview,
    })

    setText("")
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const handleMicPress = () => {
    setIsRecording(!isRecording)
    console.log(isRecording ? "Stopped recording" : "Started recording")
    // Add your voice recording logic here
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const containerStyle = {
    padding: "16px 20px 24px 20px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #ffffff",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: "relative",
  }

  const inputWrapperStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "3px 16px",
    border: "1.4px solid #000000",
    gap: "12px",
    minHeight: "50px",
  }

  const emojiButtonStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  }

  const messageInputStyle = {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#666666",
    backgroundColor: "transparent",
    fontFamily: "inherit",
    resize: "none",
    minHeight: "20px",
    maxHeight: "100px",
  }

  const attachButtonStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  }

  const micButtonStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    backgroundColor: isRecording ? "#FF4444" : "transparent",
    borderRadius: "50%",
    transition: "all 0.2s ease",
  }

  const imagePreviewStyle = {
    position: "absolute",
    bottom: "100px",
    left: "20px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #EDEDED",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  }

  const previewImageStyle = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
  }

 

  const handleEmojiClick = () => {
    console.log("Emoji picker clicked")
    // Add emoji picker logic here
  }

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleButtonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1)"
  }

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)"
  }



  const closeIconStyle = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "20px",
    height: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    cursor: "pointer",
    zIndex: 1,
  }

  return (
    <div style={containerStyle}>
      {/* Image Preview */}
      {imagePreview && (
        <div style={imagePreviewStyle}>
          <img src={imagePreview || "/placeholder.svg"} alt="Preview" style={previewImageStyle} />
          <div style={closeIconStyle} onClick={removeImage}>
          <img src={cross} alt="Emoji" style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      )}

      {/* Input Container */}
      <form onSubmit={handleSendMessage}>
        <div style={inputWrapperStyle}>
          {/* Emoji Button */}
          <div
            style={emojiButtonStyle}
            onClick={handleEmojiClick}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
          </div>

          {/* Text Input */}
          <textarea
            style={messageInputStyle}
            placeholder="Type your message here ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isMessagesLoading}
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto"
              e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"
            }}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {/* Attach Button */}
          <div
            style={attachButtonStyle}
            onClick={handleAttachClick}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <img src={attach} alt="Attach" style={{ width: "24px", height: "24px" }} />
          </div>

          {/* Microphone Button */}
          <div
            style={micButtonStyle}
            onClick={handleMicPress}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <img
              src={mic}
              alt="Microphone"
              style={{
                width: "20px",
                height: "20px",
                filter: isRecording ? "brightness(0) invert(1)" : "none",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
