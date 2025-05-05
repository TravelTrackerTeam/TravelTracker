import { useState, useEffect } from "react";
import CurrencySwitcher from "./CurrencySwitcher";
import AddExpenseForm from "./AddExpenseForm";
import { authFetch } from "../components/authFetch";
import "../styles/theme.css";

export default function TripCard({ trip, onDelete, onAddExpense, onDeleteExpense }) {
  const storageKey = `trip_${trip._id}_currency`;
  const getInitialCurrency = () => localStorage.getItem(storageKey) || trip.currency || "USD";

  const [selectedCurrency, setSelectedCurrency] = useState(getInitialCurrency);
  const [exchangeRates, setExchangeRates] = useState({});
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const baseCurrency = trip.currency || "USD";
  useEffect(() => {
    let active = true;
    async function fetchRates() {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        const data = await res.json();
        if (active) setExchangeRates(data.rates || {});
      } catch (err) {
        console.error("Failed to fetch rates:", err);
      }
    }
    fetchRates();
    return () => { active = false; };
  }, [baseCurrency]);

  const convertAmount = (amount) => {
    const rate = exchangeRates[selectedCurrency];
    return rate ? (amount * rate).toFixed(2) : amount;
  };

  const expenses = trip.expenses || [];
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = trip.budget - totalSpent;
  const isOverBudget = remaining < 0;

  const handleTripDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      const res = await authFetch(`/api/trips/${trip._id}`, { method: "DELETE" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.msg || `Error ${res.status}`);
      onDelete();
    } catch (err) {
      console.error("Delete trip error:", err);
      alert(err.message || "Could not delete trip.");
    }
  };

  const handleExpenseSubmit = async ({ name, amount }) => {
    try {
      const payload = { description: name, amount: parseFloat(amount) };
      await onAddExpense(payload);
      setShowExpenseForm(false);
    } catch (err) {
      console.error("Add expense error:", err);
      alert(err.message || "Could not add expense.");
    }
  };

  const handleExpenseDelete = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await onDeleteExpense(expenseId);
    } catch (err) {
      console.error("Delete expense error:", err);
      alert(err.message || "Could not delete expense.");
    }
  };

  const onCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    localStorage.setItem(storageKey, newCurrency);
  };

  return (
    <div className="trip-card">
      <h2 className="trip-title">{trip.tripName}</h2>
      <p><strong>Budget:</strong> {selectedCurrency} {convertAmount(trip.budget)}</p>
      <p><strong>Spent:</strong> {selectedCurrency} {convertAmount(totalSpent)}</p>
      <p className={isOverBudget ? "over-budget" : "under-budget"}>
        {isOverBudget
          ? `Over Budget by ${selectedCurrency} ${Math.abs(convertAmount(remaining))}`
          : `Remaining: ${selectedCurrency} ${convertAmount(remaining)}`}
      </p>

      <div className="trip-buttons">
        <button className="button-edit" onClick={() => setShowExpenseForm(true)}>
          + Add Expense
        </button>
        <button className="button-delete" onClick={() => onDelete(trip._id)}>
          Delete Trip
        </button>
      </div>

      {showExpenseForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3 className="modal-title">Add Expense</h3>
            <AddExpenseForm
              onAdd={handleExpenseSubmit}
              onClose={() => setShowExpenseForm(false)}
            />
          </div>
        </div>
      )}

      {expenses.length > 0 && (
        <div className="trip-expenses">
          <h4>Expenses:</h4>
          {expenses.map((exp) => (
            <div key={exp._id} className="expense-item">
              <span>{exp.description}: {selectedCurrency} {convertAmount(exp.amount)}</span>
              <button
                className="button-delete-expense"
                onClick={() => onDeleteExpense(exp._id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="currency-section">
        <CurrencySwitcher
          currency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
        />
      </div>
    </div>
  );
}
