import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "", // Added phone
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.phone.trim()) return toast.error("Phone number is required");
    // Simple phone validation (customize as needed)
    if (!/^\d{10,15}$/.test(formData.phone)) return toast.error("Invalid phone number");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
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
    border: "1px solid #000000",
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
    color: "#888888",
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
    marginTop: "24px",
  }

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#000000"
  }

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#000000"
  }

  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333333"
  }

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#000000"
  }



  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <h1 style={headingStyle}>whispr</h1>
        <p style={subtitleStyle}>Join us for an experience</p>

        {/* Registration Form */}
        <form style={formStyle} onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Enter your Full Name</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="fullname"
                placeholder="John"
                style={inputStyle}
                value={formData.fullname}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isSigningUp}
              />
              <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

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
                disabled={isSigningUp}
              />
              <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Phone */}
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Enter your Phone Number</label>
            <div style={{ position: "relative" }}>
              <input
                type="tel"
                name="phone"
                placeholder="0123456789"
                style={inputStyle}
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                disabled={isSigningUp}
              />
              <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
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
                disabled={isSigningUp}
              />
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
                {showPassword ? "🙈" : "👁️"}
              </button>
              <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={isSigningUp}
          >
            {isSigningUp ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;