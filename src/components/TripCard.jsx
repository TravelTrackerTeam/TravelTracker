
import { useState, useEffect } from "react";
import CurrencySwitcher from "./CurrencySwitcher";
import AddExpenseForm from "./AddExpenseForm";
import "../styles/theme.css";

export default function TripCard({ trip, onDelete, onAddExpense }) {
  const [selectedCurrency, setSelectedCurrency] = useState(trip.currency);
  const [exchangeRates, setExchangeRates] = useState({});
  const [expenses, setExpenses] = useState(trip.expenses || []);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  useEffect(() => {
    fetchRates();
  }, [selectedCurrency]);

  const fetchRates = async () => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${trip.currency}`);
      const data = await res.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  };

  const convertAmount = (amount) => {
    if (!exchangeRates || !exchangeRates[selectedCurrency]) return amount;
    const rate = exchangeRates[selectedCurrency];
    return (amount * rate).toFixed(2);
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = trip.budget - totalSpent;
  const isOverBudget = remaining < 0;

  const handleAddExpenseClick = () => {
    setShowExpenseForm(true);
  };

  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
    onAddExpense(expense);
    setShowExpenseForm(false);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="trip-card">
      <h2 className="trip-title">{trip.title}</h2>
      <p><strong>Budget:</strong> {selectedCurrency} {convertAmount(trip.budget)}</p>
      <p><strong>Spent:</strong> {selectedCurrency} {convertAmount(totalSpent)}</p>

      <p className={isOverBudget ? "over-budget" : "under-budget"}>
        {isOverBudget
          ? `Over Budget by ${selectedCurrency} ${Math.abs(convertAmount(remaining))}`
          : `Remaining: ${selectedCurrency} ${convertAmount(remaining)}`}
      </p>

      <div className="trip-buttons">
        <button className="button-edit" onClick={handleAddExpenseClick}>+ Add Expense</button>
        <button className="button-delete" onClick={onDelete}>Delete Trip</button>
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

      {/* List of Expenses */}
      {expenses.length > 0 && (
        <div className="trip-expenses">
          <h4 style={{ marginTop: "20px" }}>Expenses:</h4>
          {expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <span>{expense.name} - {selectedCurrency} {convertAmount(expense.amount)}</span>
              <button className="button-delete-expense" onClick={() => handleDeleteExpense(index)}>
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="currency-section">
        <CurrencySwitcher 
          currency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
        />
      </div>
    </div>
  );
}




