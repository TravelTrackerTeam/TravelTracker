
import { useState } from "react";
import "../styles/theme.css";

export default function AddTripModal({ onAddTrip, onClose }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !budget) return;
    onAddTrip({ title, budget: parseFloat(budget), currency, expenses: [] });
    setTitle("");
    setBudget("");
    setCurrency("USD");
    onClose();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        placeholder="Trip Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input-field"
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <select
        className="input-field"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="JPY">JPY (¥)</option>
      </select>

      <div className="modal-buttons">
        <button type="submit" className="button-save">Save</button>
        <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}













