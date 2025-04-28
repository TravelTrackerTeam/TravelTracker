import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/theme.css";

export default function Navbar() {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-left">
        <Link to="/dashboard" className="logo-text">TravelTracker</Link>
      </div>
      <div className="navbar-right">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={() => localStorage.removeItem("token")}>Logout</Link>
      </div>
    </motion.nav>
  );
}









