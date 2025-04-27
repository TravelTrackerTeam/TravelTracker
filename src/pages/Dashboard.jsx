import { useState } from "react";
import Navbar from "../components/Navbar";
import AddTripModal from "../components/AddTripModal";
import TripCard from "../components/TripCard";
import { FaPlaneDeparture } from "react-icons/fa"; 
import { motion } from "framer-motion"; 
import "../styles/theme.css";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);

  
  const handleAddTrip = (tripData) => {
    setTrips([...trips, tripData]);
    setShowModal(false);
  };

 
  const handleDeleteTrip = (index) => {
    const updatedTrips = [...trips];
    updatedTrips.splice(index, 1);
    setTrips(updatedTrips);
  };

 
  const handleAddExpense = (tripIndex, expense) => {
    const updatedTrips = [...trips];
    if (!updatedTrips[tripIndex].expenses) {
      updatedTrips[tripIndex].expenses = [];
    }
    updatedTrips[tripIndex].expenses.push(expense);
    setTrips(updatedTrips);
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
    My Trips <FaPlaneDeparture style={{ color: "#ff6fa2", marginLeft: "8px", verticalAlign: "middle" }} />
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
            <AddTripModal 
              onAddTrip={handleAddTrip} 
              onClose={() => setShowModal(false)} 
            />
          </div>
        </div>
      )}

    
      {trips.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          No trips yet! Click 'Add Trip' to get started ✈️
        </p>
      ) : (
        <div className="trip-list">
          {trips.map((trip, index) => (
            <TripCard
              key={index}
              trip={trip}
              onDelete={() => handleDeleteTrip(index)}
              onAddExpense={(expense) => handleAddExpense(index, expense)}
            />
          ))}
        </div>
      )}
    </div>
  );
}





















