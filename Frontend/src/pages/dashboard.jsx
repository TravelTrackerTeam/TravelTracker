import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { FaPlane, FaPlaneDeparture, FaHotel, FaListAlt, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion"; 
import "../styles/theme.css";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API}/trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTrips(data);
        } else {
          alert(data.msg || "Failed to load trips.");
        }
      } catch (err) {
        console.error("Failed to fetch trips", err);
        alert("Error loading trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="page">
      <motion.div 
      className="dashboard-title"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <h1>
          My Trips <FaPlaneDeparture style={{ color: "#ff6fa2", marginLeft: "8px", verticalAlign: "middle" }} />
        </h1>
      </motion.div>

      {loading ? (
        <p>Loading trips...</p>
      ) : trips.length === 0 ? (
        <p>No trips found. Start planning!</p>
      ) : (
        <div className="trip-list">
          {trips.map((trip) => (
            <Card key={trip._id} className="mb-4">
              <CardContent className="p-4">
                <h3 className="trip-name">{trip.tripName}</h3>

                <p><strong>Budget:</strong> {trip.currency} {trip.budget}</p>

                {trip.flight && trip.flight.length > 0 && (
                  <div>
                    <strong>Flights:</strong>
                    <ul>
                      {trip.flight.map((f, index) => (
                        <li key={index}>
                          {typeof f === "string"
                            ? f
                            : `${f.detail || "Flight"}: ${trip.currency} ${f.price || "0.00"}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trip.stay && trip.stay.length > 0 && (
                  <div>
                    <strong>Stay:</strong>
                    <ul>
                      {trip.stay.map((stay, index) => (
                        <li key={index}>
                          {stay.item || "Stay"}: {trip.currency} {stay.amount || "0.00"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trip.expenses && trip.expenses.length > 0 && (
                  <div>
                    <strong>Expenses:</strong>
                    <ul>
                      {trip.expenses.map((expense, index) => (
                        <li key={index}>
                          {expense.item || "Expense"}: {trip.currency} {expense.amount || "0.00"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trip.itinerary && trip.itinerary.length > 0 && (
                  <p><strong>Itinerary:</strong> {trip.itinerary.join(", ")}</p>
                )}
                
                {trip.notes && <p><strong>Notes:</strong> {trip.notes}</p>}

              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button className="mt-4" onClick={() => window.location.href = "/planner"}>
        + Plan a New Trip
      </Button>
    </div>
  );
}
