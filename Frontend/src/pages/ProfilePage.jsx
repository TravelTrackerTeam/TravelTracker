
import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast"; 
import Navbar from "../components/Navbar";
import "../styles/theme.css";

export default function ProfilePage() {
  const [username, setUsername] = useState("DemoUser");
  const [email, setEmail] = useState("demo@example.com");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully! 🎉', {
      style: {
        background: '#ffe5ec',
        color: '#ff69b4',
        fontWeight: 'bold',
      },
      icon: '🌸',
    });
    setNewPassword("");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete your account? This cannot be undone.");
    if (confirmDelete) {
      toast('Account deleted 💔', {
        icon: '😢',
        style: {
          background: '#ffe5ec',
          color: '#ff4d6d',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} /> {/* 🎀 ADD TOAST CONTAINER */}

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
            style={{ width: "150px", margin: "0 auto", display: "block", opacity: "0.9", marginBottom: "10px" }}
          />

          <h1 className="modal-title">Account Settings</h1>

          <form onSubmit={handleSaveProfile} className="auth-form" style={{ boxShadow: "none", background: "transparent", gap: "10px" }}>
            <input 
              type="text" 
              className="input-field"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="email" 
              className="input-field"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              className="input-field"
              value={newPassword} 
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className="button-save" style={{ width: "100%", marginTop: "10px" }}>
              Save Changes
            </button>
          </form>

          <button 
            className="button-cancel"
            onClick={handleDeleteAccount}
            style={{ width: "100%", marginTop: "15px", backgroundColor: "#ffaaaa" }}
          >
            Delete My Account
          </button>

        </motion.div>
      </div>
    </motion.div>
  );
}










