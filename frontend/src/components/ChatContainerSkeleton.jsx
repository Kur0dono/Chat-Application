

export default function ChatContainerSkeleton() {
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
    width: "430px",
    backgroundColor: "#F5F5F5",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #EDEDED",
  }

  const headerLeftStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
  }

  const backButtonSkeletonStyle = {
    width: "24px",
    height: "24px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginRight: "16px",
  }

  const profileImageSkeletonStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    marginRight: "16px",
  }

  const userInfoSkeletonStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }

  const userNameSkeletonStyle = {
    height: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    width: "120px",
    marginBottom: "4px",
  }

  const statusSkeletonStyle = {
    height: "14px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    width: "80px",
  }

  const actionsSkeletonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  }

  const actionButtonSkeletonStyle = {
    width: "28px",
    height: "28px",
    backgroundColor: "#f0f0f0",
    borderRadius: "50%",
  }

  // Messages Area Skeleton Styles
  const messagesContainerStyle = {
    flex: 1,
    padding: "16px 20px",
    overflowY: "auto",
    backgroundColor: "#EDEDED",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }

  const messageSkeletonStyle = (isMe) => ({
    display: "flex",
    justifyContent: isMe ? "flex-end" : "flex-start",
    marginBottom: "16px",
  })

  const messageBubbleSkeletonStyle = (isMe, width = "200px") => ({
    width: width,
    height: "40px",
    backgroundColor: "#f0f0f0",
    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    marginBottom: "4px",
  })

  const imageMessageSkeletonStyle = {
    width: "200px",
    height: "150px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    marginBottom: "4px",
  }

  const voiceMessageSkeletonStyle = (isMe) => ({
    width: "180px",
    height: "50px",
    backgroundColor: "#f0f0f0",
    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    marginBottom: "4px",
  })

  const timestampSkeletonStyle = (isMe) => ({
    width: "40px",
    height: "12px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    alignSelf: isMe ? "flex-end" : "flex-start",
  })

  // Input Area Skeleton Styles
  const inputContainerStyle = {
    padding: "16px 20px 24px 20px",
    backgroundColor: "#F5F5F5",
    borderTop: "1px solid #EDEDED",
  }

  const inputWrapperSkeletonStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "25px",
    padding: "12px 16px",
    height: "50px",
    gap: "12px",
  }

  const inputButtonSkeletonStyle = {
    width: "32px",
    height: "32px",
    backgroundColor: "#e0e0e0",
    borderRadius: "50%",
    flexShrink: 0,
  }

  const inputFieldSkeletonStyle = {
    flex: 1,
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
  }

  const skeletonPulseStyle = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  }

  // Sample message skeletons 
  const messageSkeletons = [
    { type: "text", isMe: false, width: "180px" },
    { type: "text", isMe: true, width: "150px" },
    { type: "image", isMe: false },
    { type: "text", isMe: true, width: "200px" },
    { type: "voice", isMe: false },
    { type: "voice", isMe: true },
    { type: "text", isMe: false, width: "160px" },
    { type: "text", isMe: true, width: "120px" },
  ]

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      <div style={containerStyle}>
        {/* Header Skeleton */}
        <div style={headerStyle}>
          <div style={headerLeftStyle}>
            <div style={{ ...backButtonSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...profileImageSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={userInfoSkeletonStyle}>
              <div style={{ ...userNameSkeletonStyle, ...skeletonPulseStyle }} />
              <div style={{ ...statusSkeletonStyle, ...skeletonPulseStyle }} />
            </div>
          </div>
          <div style={actionsSkeletonStyle}>
            <div style={{ ...actionButtonSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...actionButtonSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...actionButtonSkeletonStyle, ...skeletonPulseStyle }} />
          </div>
        </div>

        {/* Messages Area Skeleton */}
        <div style={messagesContainerStyle}>
          {messageSkeletons.map((msg, index) => (
            <div key={index} style={messageSkeletonStyle(msg.isMe)}>
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: msg.isMe ? "flex-end" : "flex-start" }}
              >
                {msg.type === "text" && (
                  <div style={{ ...messageBubbleSkeletonStyle(msg.isMe, msg.width), ...skeletonPulseStyle }} />
                )}
                {msg.type === "image" && <div style={{ ...imageMessageSkeletonStyle, ...skeletonPulseStyle }} />}
                {msg.type === "voice" && (
                  <div style={{ ...voiceMessageSkeletonStyle(msg.isMe), ...skeletonPulseStyle }} />
                )}
                <div style={{ ...timestampSkeletonStyle(msg.isMe), ...skeletonPulseStyle }} />
              </div>
            </div>
          ))}
        </div>

        {/* Input Area Skeleton */}
        <div style={inputContainerStyle}>
          <div style={{ ...inputWrapperSkeletonStyle, ...skeletonPulseStyle }}>
            <div style={{ ...inputButtonSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...inputFieldSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...inputButtonSkeletonStyle, ...skeletonPulseStyle }} />
            <div style={{ ...inputButtonSkeletonStyle, ...skeletonPulseStyle }} />
          </div>
        </div>
      </div>
    </>
  )
}
