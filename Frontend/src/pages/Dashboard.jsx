import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddTripModal from "../components/AddTripModal";
import TripCard from "../components/TripCard";
import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";
import { authFetch } from "../components/authFetch";
import "../styles/theme.css";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch trips helper
  const fetchTrips = async () => {
    try {
      const res = await authFetch("/api/trips");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.msg || `Error ${res.status}`);
      }
      const data = await res.json();
      setTrips(data);
    } catch (err) {
      console.error("fetchTrips error:", err);
      alert("Could not load your trips: " + err.message);
    }
  };

  // Load trips on component mount
  useEffect(() => {
    fetchTrips();
  }, []);

  // Create a new trip on the backend, then refresh list
  const handleAddTrip = async (tripData) => {
    try {
      const res = await authFetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.msg || "Failed to create trip");
      await fetchTrips();
      setShowModal(false);
    } catch (err) {
      console.error("handleAddTrip error:", err);
      alert(err.message);
    }
  };

  // Delete a trip on the backend with optimistic update
  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    // Optimistically remove from UI
    setTrips((prev) => prev.filter((t) => t._id !== tripId));
    try {
      const res = await authFetch(`/api/trips/${tripId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.msg || `Error ${res.status}`);
      }
      // Refresh in background
      fetchTrips().catch(console.warn);
    } catch (err) {
      console.error("handleDeleteTrip error:", err);
      alert(err.message || "Could not delete trip.");
      // Re-fetch to revert UI on failure
      fetchTrips();
    }
  };

  // Add expense on backend, then refresh list
  const handleAddExpense = async (tripId, expense) => {
    try {
      const res = await authFetch(
        `/api/trips/${tripId}/expenses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expense),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.msg || `Error ${res.status}`);
      await fetchTrips();
    } catch (err) {
      console.error("handleAddExpense error:", err);
      alert(err.message || "Could not add expense.");
    }
  };

  // Delete expense on backend, then refresh list
  const handleDeleteExpense = async (tripId, expenseId) => {
    if (!window.confirm("Delete this expense?")) return;
    const res = await authFetch(`/api/trips/${tripId}/expenses/${expenseId}`, { method:"DELETE" });
    if (res.ok) await fetchTrips();
  };

  return (
    <div className="page">
      <Navbar />

      <motion.div
        className="dashboard-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          My Trips <FaPlaneDeparture style={{ color: "#ff6fa2", marginLeft: 8, verticalAlign: "middle" }} />
        </h1>
      </motion.div>

      <div className="controls">
        <button className="button-add-trip" onClick={() => setShowModal(true)}>
          + Add Trip
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="modal-title">Create New Trip</h2>
            <AddTripModal onAddTrip={handleAddTrip} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {trips.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 50 }}>
          No trips yet! Click 'Add Trip' to get started ✈️
        </p>
      ) : (
        <div className="trip-list">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={() => handleDeleteTrip(trip._id)}
              onAddExpense={(expense) => handleAddExpense(trip._id, expense)}
              onDeleteExpense={(expenseId) => handleDeleteExpense(trip._id, expenseId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
