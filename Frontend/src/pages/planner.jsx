import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaPlane, FaPlaneDeparture, FaHotel, FaListAlt, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion"; 
import "../styles/theme.css";

export default function TravelTracker() {
  const [tripName, setTripName] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [flights, setFlights] = useState([{ detail: "", price: "" }]);
  const [stay, setStay] = useState([{ detail: "", price: "" }]);
  const [expenses, setExpenses] = useState([{ item: "", amount: "" }]);
  const [itinerary, setItinerary] = useState([""]);
  const [notes, setNotes] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [activeSection, setActiveSection] = useState(null);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api";

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];

  useEffect(() => {
    if (currency && selectedCurrency && currency !== selectedCurrency) {
      fetchRates();
    }
  }, [currency, selectedCurrency]);

  const fetchRates = async () => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      const data = await res.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  };

  const convertAmount = (amount) => {
    const num = parseFloat(amount);
    const rate = exchangeRates[selectedCurrency];
  
    if (isNaN(num) || !rate) return "0.00";
  
    return (num * rate).toFixed(2);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

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
        body: JSON.stringify({
          tripName,
          budget,
          currency,
          flights,
          stay,
          expenses,
          itinerary,
          notes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Trip created!");
        setTripName("");
        setBudget("");
        setCurrency("USD");
        setSelectedCurrency("USD");
        setFlights([{ detail: "", price: "" }]);
        setStay([{ detail: "", price: "" }]);
        setExpenses([{ item: "", amount: "" }]);
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

  const handleArrayChange = (index, field, value, setter, array) => {
    const updated = [...array];
    updated[index][field] = value;
    setter(updated);
  };

  const getTotalExpenses = () => {
    const totalFlights = flights.reduce((total, flight) => {
      const price = parseFloat(flight.price);
      return isNaN(price) ? total : total + price;
    }, 0);

    const totalStay = stay.reduce((total, accommodation) => {
      const price = parseFloat(accommodation.price);
      return isNaN(price) ? total : total + price;
    }, 0);

    const totalOtherExpenses = expenses.reduce((total, exp) => {
      const amount = parseFloat(exp.amount);
      return isNaN(amount) ? total : total + amount;
    }, 0);

    return totalFlights + totalStay + totalOtherExpenses;
  };

  const remainingBudget = parseFloat(budget) - getTotalExpenses();

  return (
    
    <div className="trip-planner-page">
      <motion.div 
      className="dashboard-title"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <h1>
          Trip Planner<FaPlaneDeparture style={{ color: "#ff6fa2", marginLeft: "8px", verticalAlign: "middle" }} />
        </h1>
      </motion.div>

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

        <label>
          Base Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mb-2 ml-2">
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </label>

        <label>
          View Converted In:
          <select value={selectedCurrency} onChange={handleCurrencyChange} className="mb-4 ml-2">
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </label>

        {currency !== selectedCurrency && (
          <p className="text-sm text-gray-500">
            Converted Budget: {selectedCurrency} {convertAmount(budget)}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-2">
          Remaining Budget: {selectedCurrency} {convertAmount(remainingBudget)}
        </p>
      </div>

      <div className="planner-tabs">
        <Button onClick={() => setActiveSection("flights")}><FaPlane /> Flights</Button>
        <Button onClick={() => setActiveSection("stay")}><FaHotel /> Stay</Button>
        <Button onClick={() => setActiveSection("itinerary")}><FaListAlt /> Itinerary</Button>
        <Button onClick={() => setActiveSection("budget")}><FaDollarSign /> Budget</Button>
        <Button onClick={() => setActiveSection("planning")}><FaClipboardList /> Planning</Button>
      </div>

      <div>
        {activeSection === "flights" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
              <h4><center>Enter your flight details.</center></h4>
              {flights.map((f, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Flight detail"
                    value={f.detail}
                    onChange={(e) => handleArrayChange(index, "detail", e.target.value, setFlights, flights)}
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={f.price}
                    onChange={(e) => handleArrayChange(index, "price", e.target.value, setFlights, flights)}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFlights([...flights, { detail: "", price: "" }])}
              >
                + Add Flight
              </Button>
            </CardContent>
          </Card>
        )}

        {activeSection === "stay" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
              <h4><center>Where will you be staying?</center></h4>
              {stay.map((s, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Stay detail"
                    value={s.detail}
                    onChange={(e) => handleArrayChange(index, "detail", e.target.value, setStay, stay)}
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={s.price}
                    onChange={(e) => handleArrayChange(index, "price", e.target.value, setStay, stay)}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setStay([...stay, { detail: "", price: "" }])}
              >
                + Add Stay
              </Button>
            </CardContent>
          </Card>
        )}

        {activeSection === "itinerary" && (
          <Card className="mb-4">
            <CardContent className="p-4 flex flex-col gap-2">
              <h4><center>What will you be doing?</center></h4>
              {itinerary.map((item, index) => (
                <Input key={index} placeholder="Itinerary item" value={item} onChange={(e) => handleArrayChange(index, e.target.value, setItinerary, itinerary)} />
              ))}
            </CardContent>
          </Card>
        )}

        {activeSection === "budget" && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <h4><center>Expenses</center></h4>
              {expenses.map((exp, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Expense item"
                    value={exp.item}
                    onChange={(e) => handleArrayChange(index, "item", e.target.value, setExpenses, expenses)}
                  />
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={exp.amount}
                    onChange={(e) => handleArrayChange(index, "amount", e.target.value, setExpenses, expenses)}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setExpenses([...expenses, { item: "", amount: "" }])}
              >
                + Add Expense
              </Button>
            </CardContent>
          </Card>
        )}

        {activeSection === "planning" && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <h4><center>Additional Notes</center></h4>
              <Input placeholder="Enter notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </CardContent>
          </Card>
        )}
      </div>

      <Button onClick={handleCreateTrip} className="save-trip-button">Save Trip</Button>
    </div>
  );
}
