//const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6/2c672764cb333f647adb32f7/latest/USD";

export async function convertCurrency(amount, from, to) {
  if (from === to) return amount;

  const res = await fetch(`${BASE_URL}`);
  const data = await res.json();

  if (data.result === "success") {
    return amount * data.conversion_rate;
  } else {
    throw new Error("Currency conversion failed");
  }
}
  