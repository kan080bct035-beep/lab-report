import { useState } from "react";
import "./style.css";

function InputField({ label, type, value, onChange, placeholder, error }) {
  return (
    <div className="field-wrapper">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input error" : "input"}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email required";
    else if (!email.includes("@")) e.email = "Invalid email";
    if (!password) e.password = "Password required";
    else if (password.length < 6) e.password = "Min 6 chars";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      console.log("Login:", { email, password });
    }
  };

  return (
    <div className="card">
      <h2>Welcome Back 👋</h2>
      {success && <div className="success-box">✅ Login successful!</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          error={errors.password}
        />
        <button type="submit">Login</button>
      </form>
      <p className="switch-text">
        Don't have an account? <span onClick={onSwitch}>Register here</span>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name required";
    if (!formData.email) e.email = "Email required";
    else if (!formData.email.includes("@")) e.email = "Invalid email";
    if (!formData.password) e.password = "Password required";
    else if (formData.password.length < 6) e.password = "Min 6 chars";
    if (!formData.confirmPassword) e.confirmPassword = "Confirm password";
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      console.log("Register:", formData);
    }
  };

  return (
    <div className="card">
      <h2>Create Account ✨</h2>
      {success && <div className="success-box">✅ Registered successfully!</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          placeholder="Sita Sharma"
          error={errors.fullName}
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="you@example.com"
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Min. 6 characters"
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Re-enter password"
          error={errors.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>
      <p className="switch-text">
        Already have an account? <span onClick={onSwitch}>Login here</span>
      </p>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="page">
      <h1>Auth App</h1>
      {page === "login" ? (
        <LoginForm onSwitch={() => setPage("register")} />
      ) : (
        <RegisterForm onSwitch={() => setPage("login")} />
      )}
    </div>
  );
}