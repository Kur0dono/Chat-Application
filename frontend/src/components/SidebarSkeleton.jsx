"use client"

export default function HomepageSkeleton() {
  const containerStyle = {
    minHeight: "932px",
    width: "430px",
    backgroundColor: "#FFFFFF",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  }

  const headerStyle = {
    padding: "20px 24px 20px 24px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #f0f0f0",
  }

  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40px",
  }

  const logoSkeletonStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    flexShrink: 0,
  }

  const toggleSkeletonStyle = {
    flex: 1,
    height: "36px",
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
    marginLeft: "16px",
    marginRight: "16px",
  }

  const searchIconSkeletonStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    flexShrink: 0,
  }

  const chatListStyle = {
    flex: 1,
    overflowY: "auto",
  }

  const chatItemSkeletonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #f5f5f5",
  }

  const avatarSkeletonStyle = {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    marginRight: "16px",
    flexShrink: 0,
  }

  const contentSkeletonStyle = {
    flex: 1,
    minWidth: 0,
  }

  const nameSkeletonStyle = {
    height: "16px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "8px",
    width: "60%",
  }

  const messageSkeletonStyle = {
    height: "14px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    width: "80%",
  }

  const timeSkeletonStyle = {
    width: "40px",
    height: "12px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginLeft: "12px",
    flexShrink: 0,
  }

  const skeletonPulseStyle = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  }

  // Create an array of skeleton items
  const skeletonItems = Array.from({ length: 12 }, (_, index) => (
    <div key={index} style={chatItemSkeletonStyle}>
      <div style={{ ...avatarSkeletonStyle, ...skeletonPulseStyle }} />
      <div style={contentSkeletonStyle}>
        <div style={{ ...nameSkeletonStyle, ...skeletonPulseStyle }} />
        <div style={{ ...messageSkeletonStyle, ...skeletonPulseStyle }} />
      </div>
      <div style={{ ...timeSkeletonStyle, ...skeletonPulseStyle }} />
    </div>
  ))

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
          <div style={topBarStyle}>
            {/* Cloud Logo Skeleton */}
            <div style={{ ...logoSkeletonStyle, ...skeletonPulseStyle }} />

            {/* Toggle/Search Area Skeleton */}
            <div style={{ ...toggleSkeletonStyle, ...skeletonPulseStyle }} />

            {/* Search Icon Skeleton */}
            <div style={{ ...searchIconSkeletonStyle, ...skeletonPulseStyle }} />
          </div>
        </div>

        {/* Chat List Skeleton */}
        <div style={chatListStyle}>{skeletonItems}</div>
      </div>
    </>
  )
}

