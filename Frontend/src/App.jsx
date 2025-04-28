import React from "react";
import Navbar from "./components/Navbar";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default function TravelTracker() {
  const [tripName, setTripName] = useState("");
  const [budget, setBudget] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const API_BASE_URL = "http://localhost:5000/api";


  const testConnection = async () => {
    const res = await fetch("http://localhost:5000/api/test");
    const data = await res.json();
    console.log("From Backend:", data.msg);
    alert(`Backend: ${data.msg}`);
  };
  

  const handleSignUp = async () => {
    console.log("Signup button clicked");
    
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log(JSON.stringify({ email, password }))
    
    const data = await response.json();
    if (response.ok) {
      alert("Sign-up successful! Please log in.");
    } else {
      alert(data.msg || "Error signing up.");
    }
  };

  const handleLogin = async () => {
    console.log("Login button clicked");
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
    } else {
      alert(data.msg || "Invalid credentials.");
    }
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    setToken("");
    localStorage.removeItem("token");
  };

  const handleCreateTrip = async () => {
    console.log("Create Trip button clicked");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    if (!tripName.trim()) {
      console.log("Trip creation failed: empty trip name");
      alert("Trip name cannot be empty.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tripName, budget }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Trip created successfully!");
    } else {
      alert(data.msg || "Error creating trip.");
    }
  };
=======
=======
>>>>>>> Stashed changes
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import TripPlanner from "./pages/planner";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    <Router>
      <AuthProvider>
        <div className="container">
          <div className="title"><h1>Travel Tracker</h1>
          </div>
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/planner" 
            element={
              <ProtectedRoute>
                <TripPlanner />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
