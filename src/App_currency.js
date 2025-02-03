import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App_currency() {
  const [amount, setAmout] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [convert, setConvert] = useState("");
  const [isLoding, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function getConverting() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setConvert(data.rates[toCur]);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
      if (fromCur === toCur) return;
      getConverting();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmout(Number(e.target.value))}
        value={amount}
        disabled={isLoding}
      />
      <select
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoding}
        value={fromCur}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoding}
        value={toCur}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT: {convert ? convert : "no data converted"}</p>
    </div>
  );
}

export default App_currency;
