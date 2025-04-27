import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, userEmail, logout } = useAuth();

  return (
    <nav>
      <div id="nav-container">
        <div id="nav-bar">
          <div className="nav-item"><a href="/">Home</a></div>
          <div className="nav-item"><a href="/dashboard">View Trips</a></div>
          <div className="nav-item"><a href="/planner">Trip Planner</a></div>
        </div>

        <div>
          {token ? (
            <>
              <span>Logged in as {userEmail}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <a href="/login">Login / Signup</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
