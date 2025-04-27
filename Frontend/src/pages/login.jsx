import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

   {/*const handleSubmit = async (e) => {
    e.preventDefault();
  
   // ---- test login ----
    if (email === "test@gmail.com" && password === "test") {
      login("fake-jwt-token", email); 
      navigate("/dashboard");
    } else {
      alert("Invalid test credentials!");
    }
  };*/}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = mode === "login" ? "/api/login" : "/api/signup";

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (mode === "login") {
          login(data.access_token); 
          navigate("/dashboard");  
        } else {
          alert("Signup successful! You can now log in.");
          setMode("login"); 
        }
      } else {
        alert(data.msg || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <div>
      
      <h2 className="page-header">{mode === "login" ? "Login" : "Sign Up"}</h2>
      <h4><center>Please login or signup to create and view your trips.</center></h4>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <p>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

