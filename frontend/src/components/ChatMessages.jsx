

import { useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"

const ChatMessages = ({ messageEndRef }) => {
  const { messages, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()
  const [playingVoice, setPlayingVoice] = useState(null)
  const [voiceProgress, setVoiceProgress] = useState({})

  const handleVoicePlay = (messageId) => {
    if (playingVoice === messageId) {
      setPlayingVoice(null)
    } else {
      setPlayingVoice(messageId)
      // Simulate voice playback progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setVoiceProgress((prev) => ({ ...prev, [messageId]: progress }))
        if (progress >= 100) {
          clearInterval(interval)
          setPlayingVoice(null)
          setVoiceProgress((prev) => ({ ...prev, [messageId]: 0 }))
        }
      }, 100)
    }
  }

  const renderWaveform = (messageId, isMe, isPlaying) => {
    const bars = [8, 12, 6, 14, 10, 16, 8, 12, 6, 14, 10, 8, 12, 6, 10, 8]
    const progress = voiceProgress[messageId] || 0

    return bars.map((height, index) => {
      const isActive = isPlaying && (index / bars.length) * 100 <= progress
      return (
        <div
          key={index}
          style={{
            width: "3px",
            height: `${height}px`,
            backgroundColor: isActive ? "#000000" : "#C9C9C9",
            borderRadius: "1px",
          }}
        />
      )
    })
  }

  const containerStyle = {
    flex: 1,
    padding: "16px 20px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }

  const messageContainerStyle = (isMe) => ({
    display: "flex",
    justifyContent: isMe ? "flex-end" : "flex-start",
    marginBottom: "16px",
  })

  const messageWrapperStyle = (isMe) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: isMe ? "flex-end" : "flex-start",
    maxWidth: "70%",
  })

  const imageBubbleStyle = {
    borderRadius: "18px",
    overflow: "hidden",
    maxWidth: "280px",
    marginBottom: "4px",
    border: "1px solid #BCBCBC",
    backgroundColor: "#FFFFFF",
  }

  const imageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
  }

  const imageCaptionStyle = {
    padding: "12px 16px",
    fontSize: "16px",
    color: "#000000",
    lineHeight: "1.4",
    backgroundColor: "#FFFFFF",
  }

  const textBubbleStyle = (isMe) => ({
    padding: "12px 16px",
    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    backgroundColor: isMe ? "#FFFFFF" : "#F0F0F0",
    border: "1px solid #BCBCBC",
    fontSize: "16px",
    color: "#000000",
    lineHeight: "1.4",
    marginBottom: "4px",
    maxWidth: "100%",
    wordWrap: "break-word",
  })

  const voiceBubbleStyle = (isMe) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    backgroundColor: isMe ? "#FFFFFF" : "#F0F0F0",
    border: "1px solid #BCBCBC",
    marginBottom: "4px",
    minWidth: "200px",
    maxWidth: "280px",
  })

  const playButtonStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginRight: "12px",
  }

  const waveformContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    flex: 1,
    marginRight: "12px",
  }

  const voiceTimeStyle = {
    fontSize: "12px",
    color: "#666666",
    minWidth: "40px",
    textAlign: "right",
  }

  const timestampStyle = (isMe) => ({
    fontSize: "12px",
    color: "#888888",
    marginTop: "4px",
    alignSelf: isMe ? "flex-end" : "flex-start",
  })

  if (!Array.isArray(messages)) {
    return <div style={containerStyle}>No messages</div>
  }

  return (
    <div style={containerStyle}>
      {messages.map((msg, idx) => {
        const isMe = msg.senderId === authUser._id
        const isPlaying = playingVoice === (msg._id || idx)

        return (
          <div key={msg._id || idx} style={messageContainerStyle(isMe)}>
            <div style={messageWrapperStyle(isMe)}>
              {/* Image Message */}
              {msg.image && (
                <>
                  <div style={imageBubbleStyle}>
                    <img src={msg.image || "/placeholder.svg"} alt="Shared image" style={imageStyle} />
                    {msg.text && <div style={imageCaptionStyle}>{msg.text}</div>}
                  </div>
                  <div style={timestampStyle(isMe)}>{formatMessageTime(msg.createdAt)}</div>
                </>
              )}

              {/* Voice Message */}
              {msg.audio && (
                <>
                  <div style={voiceBubbleStyle(isMe)}>
                    <button style={playButtonStyle} onClick={() => handleVoicePlay(msg._id || idx)}>
                      {isPlaying ? (
                        // Pause icon
                        <div style={{ display: "flex", gap: "2px" }}>
                          <div style={{ width: "3px", height: "12px", backgroundColor: "#000000" }} />
                          <div style={{ width: "3px", height: "12px", backgroundColor: "#000000" }} />
                        </div>
                      ) : (
                        // Play icon
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid #000000",
                            borderTop: "6px solid transparent",
                            borderBottom: "6px solid transparent",
                            marginLeft: "2px",
                          }}
                        />
                      )}
                    </button>
                    <div style={waveformContainerStyle}>{renderWaveform(msg._id || idx, isMe, isPlaying)}</div>
                    <div style={voiceTimeStyle}>00:20</div>
                  </div>
                  <div style={timestampStyle(isMe)}>{formatMessageTime(msg.createdAt)}</div>
                </>
              )}

              {/* Text Message (only if no image) */}
              {msg.text && !msg.image && (
                <>
                  <div style={textBubbleStyle(isMe)}>{msg.text}</div>
                  <div style={timestampStyle(isMe)}>{formatMessageTime(msg.createdAt)}</div>
                </>
              )}
            </div>
          </div>
        )
      })}
      <div ref={messageEndRef} />
    </div>
  )
}

export default ChatMessages
