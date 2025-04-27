import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaPlane, FaHotel, FaListAlt, FaDollarSign, FaClipboardList } from "react-icons/fa";

export default function TravelTracker() {
  const [tripName, setTripName] = useState("");
  const [budget, setBudget] = useState("");
  const [flight, setFlight] = useState("");
  const [expenses, setExpenses] = useState([""]);
  const [itinerary, setItinerary] = useState([""]);
  const [notes, setNotes] = useState("");

  const [activeSection, setActiveSection] = useState(null);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api";

  const handleCreateTrip = async () => {
    if (!tripName.trim()) {
      alert("Trip name cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${API}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tripName, budget, flight, expenses, itinerary, notes }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Trip created!");
        setTripName("");
        setBudget("");
        setFlight("");
        setExpenses([""]);
        setItinerary([""]);
        setNotes("");
      } else {
        alert(data.msg || "Error creating trip.");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Error creating trip.");
    }
  };

  const handleExpenseChange = (index, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = value;
    setExpenses(updatedExpenses);
  };

  const handleItineraryChange = (index, value) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[index] = value;
    setItinerary(updatedItinerary);
  };

  return (
    <div className="trip-planner-page">
      <h2 className="page-header">Trip Planner</h2>

      {/* Trip Name and Budget */}
      <div className="trip-header">
        <Input
          placeholder="Enter Trip Name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Enter Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="mb-2"
        />
      </div>

      {/* Section buttons */}
      <div className="planner-tabs">
        <Button  onClick={() => setActiveSection("flights")}><FaPlane className="flight" />Flights</Button>
        <Button  onClick={() => setActiveSection("stay")}><FaHotel className="stay" />Stay</Button>
        <Button  onClick={() => setActiveSection("itinerary")}><FaListAlt className="itinerary" />Itinerary</Button>
        <Button  onClick={() => setActiveSection("budget")}><FaDollarSign className="budget" />Budget</Button>
        <Button  onClick={() => setActiveSection("planning")}><FaClipboardList className="planning" />Planning</Button>
      </div>

      {/* Input information Section */}
      <div>
        {activeSection === "flights" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
            <h4><center>What flight(s) will you be taking? Enter the airline, flight number, departure and arrival times, etc.</center></h4>
              {expenses.map((expense, index) => (
                <Input
                  key={index}
                  placeholder="Enter flight/expense detail"
                  value={expense}
                  onChange={(e) => handleExpenseChange(index, e.target.value)}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {activeSection === "stay" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
              <h4><center>Where will you be staying? Enter the address, name, city, etc.</center></h4>
              {expenses.map((expense, index) => (
                <Input
                  key={index}
                  placeholder="Enter stay/hotel detail"
                  value={expense}
                  onChange={(e) => handleExpenseChange(index, e.target.value)}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {activeSection === "itinerary" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
            <h4><center>What will you be doing? Enter any desired destinations, museums, restaurants to visit.</center></h4>
              {itinerary.map((item, index) => (
                <Input
                  key={index}
                  placeholder="Enter itinerary item"
                  value={item}
                  onChange={(e) => handleItineraryChange(index, e.target.value)}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {activeSection === "budget" && (
          <Card className="mb-4">
            <CardContent className="p-4">
            <h4><center>How much do you plan to spend?</center></h4>
              <Input
                type="number"
                placeholder="Enter your updated budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </CardContent>
          </Card>
        )}

        {activeSection === "planning" && (
          <Card className="mb-4">
            <CardContent className="p-4">
            <h4><center>Record any additional thoughts, important items to remember, events to attend, etc.</center></h4>
              <Input
                placeholder="Enter additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        )}
      </div>
      <Button onClick={handleCreateTrip} className="save-trip-button">Save Trip</Button>
    </div>
  );
}
