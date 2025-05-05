// api.js

/**
 * Fetches the conversion rate from your own backend (Flask) and applies it.
 * Requires that you have Vite proxy set up so that `/api/exchange-rate` → http://localhost:5000.
 */
export async function convertCurrency(amount, from, to) {
  console.log("convertCurrency called with:", { amount, from, to });
  if (!from || !to) {
    throw new Error("Both `from` and `to` currencies are required");
  }
  if (from === to) {
    return amount;
  }

  // call your Flask endpoint, which in turn hits the v6 API
  const res = await fetch(
    `/api/exchange-rate?base=${encodeURIComponent(from)}&target=${encodeURIComponent(to)}`
  );

  if (!res.ok) {
    // try to grab the error message from your backend
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || `Exchange-rate request failed with status ${res.status}`);
  }

  const data = await res.json();
  const rate = data.conversion_rate;
  if (typeof rate !== "number") {
    throw new Error("Invalid conversion rate received from backend");
  }

  return amount * rate;
}
