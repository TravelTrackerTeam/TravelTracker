
import "../styles/theme.css";

export default function CurrencySwitcher({ currency, onCurrencyChange }) {
  return (
    <select
      className="currency-switcher"
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
    >
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
      <option value="GBP">GBP (£)</option>
      <option value="JPY">JPY (¥)</option>
    </select>
  );
}



  
