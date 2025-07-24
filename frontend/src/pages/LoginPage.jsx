import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import email from "../assets/Email.svg";
import lock from "../assets/Lock.svg";
import doublecloud from "../assets/double cloud.svg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const containerStyle = {
    minHeight: "956px", // iPhone 16 Pro Max height
    width: "440px", // iPhone 16 Pro Max width
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: "0 auto",
  }

  const contentStyle = {
    width: "382px", // Full width minus padding
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  const logoStyle = {
    width: "395px",
    height: "100px",
    marginBottom: "30px",
  }

  const headingStyle = {
    color: "#000000",
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
    textAlign: "center",
  }

  const subtitleStyle = {
    color: "#888888",
    fontSize: "16px",
    margin: "0 0 48px 0",
    textAlign: "center",
    lineHeight: "1.4",
  }

  const formStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  }

  const inputContainerStyle = {
    position: "relative",
    width: "100%",
  }

  const labelStyle = {
    color: "#000000",
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "10px",
    display: "block",
  }

  const inputStyle = {
    width: "100%",
    padding: "18px 55px 18px 18px",
    border: "1px solid #000000", // Black border as requested
    borderRadius: "10px",
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#FFFFFF",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  }

  const iconStyle = {
    position: "absolute",
    right: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "22px",
    height: "22px",
  }

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: "40px",
    marginBottom: "24px",
  }

  const linkStyle = {
    color: "#888888",
    fontSize: "16px",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
  }

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#000000"
  }

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#000000" // Keep black border
  }

  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333333"
  }

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#000000"
  }


  const handleCreateAccount = () => {
    // Use navigation to go to signup page
    window.location.href = "/signup";
    // Or, if using react-router's useNavigate:
    // navigate("/signup");
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Double Cloud Logo */}
        <div style={logoStyle}>
          <img
            src={doublecloud}
            alt="Whispr Double Cloud Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Header */}
        <h1 style={headingStyle}>whispr</h1>
        <p style={subtitleStyle}>
          Welcome back ready to chat
          <br />
          again ?
        </p>

        {/* Sign In Form */}
        <form style={formStyle} onSubmit={handleSubmit}>
          {/* Email */}
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Enter your Email</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder="yourname@gmail.com"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isLoggingIn}
              />
              <img src={email} alt="Email" style={iconStyle} />
            </div>
          </div>

          {/* Password */}
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Enter your Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••"
                style={inputStyle}
                value={formData.password}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isLoggingIn}
              />
              <img src={lock} alt="Lock" style={iconStyle} />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: "45px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888888",
                  fontSize: "18px",
                  padding: 0,
                }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Create Account Link */}
        <div style={linkStyle} onClick={handleCreateAccount}>
          New here ? <span style={{  cursor: "pointer" }}>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;