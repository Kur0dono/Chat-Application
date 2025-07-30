import { useNavigate } from "react-router-dom";
import dashingAway from "../assets/dashing away.svg"; 

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333333"
  }

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#000000"
  }

  const handleLinkHover = (e) => {
    e.currentTarget.style.color = "#666666"
  }

  const handleLinkLeave = (e) => {
    e.currentTarget.style.color = "#888888"
  }
   const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: "100%",
  }

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "320px",
    width: "100%",
  }

  const logoContainerStyle = {
    marginBottom: "64px",
    width: "192px",
    height: "128px",
  }

  const headingStyle = {
    color: "#000000",
    fontSize: "32px",
    fontWeight: "bold",
    lineHeight: "1.2",
    margin: "0 0 16px 0",
  }

  const subtitleStyle = {
    color: "#888888",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "0 0 32px 0",
  }

  const iconRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    padding: "16px 0",
    marginBottom: "32px",
  }

  const iconStyle = {
    width: "20px",
    height: "20px",
    color: "#838383",
  }

  const buttonContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "16px",
  }

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "25px",
    padding: "18px 24px",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }

  const anonymousLinkStyle = {
    color: "#888888",
    fontSize: "14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s ease",
  }
     return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Logo/Icon  */}
        <div style={logoContainerStyle}>
          <img
            src={dashingAway}
            alt="Whispr Cloud Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Main heading */}
        <div>
          <h1 style={headingStyle}>
            Welcome to Whispr
            <br />& start chatting
          </h1>
          <p style={subtitleStyle}>
            Experience the soothing design of Whispr,
            <br />
            download now.
          </p>
        </div>

        {/* Icon row */}
        <div style={iconRowStyle}>
          {/* Moon icon */}
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>

          {/* Feather icon */}
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-7-9-7-9 7 9 7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l7-7 7 7M12 19V5" />
          </svg>

          {/* Cloud icon */}
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>

          {/* Sun icon */}
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Action buttons */}
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>

        {/* Anonymous link */}
        <button
          style={anonymousLinkStyle}
          onMouseEnter={handleLinkHover}
          onMouseLeave={handleLinkLeave}
          onClick={() => console.log("Explore anonymously clicked")}
        >
          Explore Whispr anonymously
        </button>
      </div>
    </div>
  )
};

export default WelcomePage;