import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { FaPlane, FaHotel, FaListAlt, FaDollarSign, FaClipboardList } from "react-icons/fa";

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Travel Tracker</h1>

      {/* Temp test for server connection */}
      <Button onClick={testConnection}>Click to test servers</Button>

      {/* User Authentication */}
      {!token ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Login / Sign Up</h2>
          <Input 
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Input 
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2"
          />
          <div className="login-and-signup-btn">
            <Button onClick={handleLogin}>Log In</Button>
            <Button onClick={handleSignUp} variant="outline">Sign Up</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <p className="text-green-600">Logged in as {email}</p>
          <Button onClick={handleLogout} variant="destructive">Log Out</Button>
        </div>
      )}

      {/* Trip Input */}
      {token && (
        <div className="mb-4">
          <Input 
            placeholder="Enter Trip Name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="mb-2"
          />
          <Input 
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleCreateTrip}>Create Trip</Button>
        </div>
      )}

      {/* Tabs for trip management */}
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2 mb-4">
          <TabsTrigger value="flights" onClick={() => console.log("Flights tab clicked")}>
            <FaPlane className="mr-2" /> Flights
          </TabsTrigger>
          <TabsTrigger value="stay" onClick={() => console.log("Stay tab clicked")}>
            <FaHotel className="mr-2" /> Stay
          </TabsTrigger>
          <TabsTrigger value="itinerary" onClick={() => console.log("Itinerary tab clicked")}>
            <FaListAlt className="mr-2" /> Itinerary
          </TabsTrigger>
          <TabsTrigger value="budget" onClick={() => console.log("Budget tab clicked")}>
            <FaDollarSign className="mr-2" /> Budget
          </TabsTrigger>
          <TabsTrigger value="planning" onClick={() => console.log("Planning tab clicked")}>
            <FaClipboardList className="mr-2" /> Planning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights">
          <Card><CardContent className="p-4">Flight details coming soon...</CardContent></Card>
        </TabsContent>
        <TabsContent value="stay">
          <Card><CardContent className="p-4">Stay details coming soon...</CardContent></Card>
        </TabsContent>
        <TabsContent value="itinerary">
          <Card><CardContent className="p-4">Itinerary details coming soon...</CardContent></Card>
        </TabsContent>
        <TabsContent value="budget">
          <Card><CardContent className="p-4">Budget details coming soon...</CardContent></Card>
        </TabsContent>
        <TabsContent value="planning">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">Trip Planning</h2>
              <Input placeholder="Enter details..." className="mb-2" />
              <Button onClick={() => console.log("Submit button clicked")}>Submit</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
