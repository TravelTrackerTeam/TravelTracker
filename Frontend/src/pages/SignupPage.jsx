import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/theme.css";
import { authFetch } from "../components/authFetch";

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || `Signup failed (status ${res.status})`);
      }
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message || "Could not reach server.");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSignup}>
        <motion.img
          src="/logo.png"
          alt="TravelTracker Logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ width: 200, margin: "0 auto", display: "block", opacity: 0.8, marginBottom: 10 }}
        />

        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-button">
          Sign Up
        </button>

        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </form>
    </div>
  );
}
