import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { authFetch } from "../components/authFetch";
import "../styles/theme.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load current user info on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authFetch("/api/user");
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.msg || `Error ${res.status}`);
        }
        const data = await res.json();
        setUsername(data.username || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("loadUser error:", err);
        toast.error("Could not load profile: " + err.message, { icon: "⚠️" });
      }
    };
    loadUser();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, email };
      if (newPassword) payload.password = newPassword;

      const res = await authFetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.msg || `Error ${res.status}`);
      }

      toast.success("Profile updated successfully! 🎉", {
        style: { background: "#ffe5ec", color: "#ff69b4", fontWeight: "bold" },
        icon: "🌸",
      });
      setNewPassword("");
    } catch (err) {
      console.error("handleSaveProfile error:", err);
      toast.error(err.message, { icon: "⚠️" });
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("⚠️ Really delete your account? This cannot be undone.")) return;
    try {
      const res = await authFetch("/api/user", { method: "DELETE" });
      if (!res.ok) throw new Error(`Error ${res.status}`);

      toast("Account deleted 💔", {
        icon: "😢",
        style: { background: "#ffe5ec", color: "#ff4d6d", fontWeight: "bold" },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("handleDeleteAccount error:", err);
      toast.error(err.message, { icon: "⚠️" });
    }
  };

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Navbar />
      <Toaster position="top-center" />

      <div className="profile-page">
        <motion.div
          className="profile-card"
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(255, 182, 193, 0.4)" }}
        >
          <motion.img
            src="/logo.png"
            alt="TravelTracker Logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ width: 150, margin: "0 auto 10px", opacity: 0.9 }}
          />

          <h1 className="modal-title">Account Settings</h1>

          <form onSubmit={handleSaveProfile} className="auth-form" style={{ background: "transparent", gap: 10 }}>
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="New Password (leave blank to keep current)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className="button-save" style={{ width: "100%", marginTop: 10 }}>
              Save Changes
            </button>
          </form>

          <button
            className="button-cancel"
            onClick={handleDeleteAccount}
            style={{ width: "100%", marginTop: 15, backgroundColor: "#ffaaaa" }}
          >
            Delete My Account
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
