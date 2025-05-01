import { useState } from "react";
import "../styles/theme.css";

export default function AddExpenseForm({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAdd({ name, amount: parseFloat(amount) });
    setName("");
    setAmount("");
    onClose();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="modal-buttons">
        <button type="submit" className="button-save">Save</button>
        <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
