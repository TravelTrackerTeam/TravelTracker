import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, userEmail, logout } = useAuth();

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-left">
      
          <div><a href="/">Home</a></div>
      </div>

      <div className="navbar-right">
          <div><a href="/dashboard">Dashboard</a></div>
          <div><a href="/planner">Trip Planner</a></div>
        </div>

        <div>
          {token ? (
            <>
              <span>Logged in!</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <a href="/login">Login / Signup</a>
          )}
        </div>
    </motion.nav>
  );
};

export default Navbar;
