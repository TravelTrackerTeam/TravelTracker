
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
      <option value="AED">AED (¥)</option>
      <option value="CAD">CAD ($)</option>
      <option value="AUD">AUD ($)</option>
      <option value="BRL">BRL (R$)</option>
      <option value="KHR">KHR (៛)</option>
      <option value="CNY">CNY (¥)</option>
      <option value="COP">COP ($)</option>
      <option value="NZD">NZD ($)</option>
      <option value="CRC">CRC (₡)</option>
      <option value="CUP">CUP (₱)</option>
      <option value="VND">VND (₫)</option>
      <option value="THB">THB (฿)</option>
      <option value="CHF">CHF (₣)</option>
      <option value="RSD">RSD (din)</option>
      <option value="SAR">SAR (ر.س)</option>
      <option value="INR">INR (₨)</option>
      <option value="ZMW">ZMW (ZK)</option>
      <option value="MAD">MAD (د.م.)</option>
      <option value="YER">YER (﷼)</option>
      <option value="XPF">XPF (	Franc)</option>
      <option value="VEF">VEF (Bs.)</option>
      <option value="VUV">VUV (Vt)</option>
      <option value="UZS">UZS (лв)</option>
      <option value="UYU">UYU (	$)</option>
      <option value="UAH">UAH (₴)</option>
      <option value="UGX">UGX (Sh)</option>
      <option value="TRY">TRY (TL)</option>
      <option value="TND">TND (د.ت)</option>
      <option value="TWD">TWD (NT$)</option>
      <option value="SYP">SYP (£)</option>
      <option value="SEK">SEK (kr)</option>
      <option value="SZL">SZL (L)</option>
      <option value="SDG">SDG (£)</option>
      <option value="LKR">LKR (Rs)</option>
      <option value="ZAR">ZAR (R)</option>
      <option value="SGD">SGD ($)</option>
      <option value="XCD">XCD ($)</option>
      <option value="RON">RON (L)</option>
      <option value="QAR">QAR (ر.ق)</option>
      <option value="PLN">PLN (zł)</option>
      <option value="PHP">PHP (₱)</option>
      <option value="PEN">PEN (S/.)</option>
      <option value="PYG">PYG (₲)</option>
      <option value="PKR">PKR (₨)</option>
      <option value="NOK">NOK (kr)</option>
      <option value="MXN">MXN ($)</option>
      </select>

      <div className="modal-buttons">
        <button type="submit" className="button-save">Save</button>
        <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}













