import { useState, useEffect } from "react";
import { convertCurrency } from "../api";

export default function CurrencyConverter({ amount, from, to }) {
  const [result, setResult] = useState(null);
  useEffect(() => {
    convertCurrency(amount, from, to)
      .then(setResult)
      .catch(console.error);
  }, [amount, from, to]);

  if (result == null) return <p>Loading...</p>;
  return <p>{amount} {from} = {result.toFixed(2)} {to}</p>;
}
