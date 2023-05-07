import React, { useState } from "react";
import axios from "axios";

const CryptoPricefinal = () => {
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  const handleSymbol1Change = (event) => {
    setSymbol1(event.target.value.toUpperCase());
  };

  const handleSymbol2Change = (event) => {
    setSymbol2(event.target.value.toUpperCase());
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol1}`
      );
      console.log("API Response 1:", response1.data);
      const symbol1PriceUsd = response1.data.last_price_usd;

      const response2 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol2}`
      );
      console.log("API Response 2:", response2.data);
      const symbol2PriceUsd = response2.data.last_price_usd;

      const amountInSymbol1 = parseFloat(amount);
      const symbol1ToUsdRate = parseFloat(symbol1PriceUsd);
      const symbol2ToUsdRate = parseFloat(symbol2PriceUsd);

      const amountInUsd = amountInSymbol1 * symbol1ToUsdRate;
      const amountInSymbol2 = amountInUsd / symbol2ToUsdRate;

      setResult(amountInSymbol2);
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to get price data. Please check the symbols and try again.");
      setResult(null);
    }
  };

  const formatPrice = (price) => {
    if (price) {
      return parseFloat(price).toFixed(8);
    } else {
      return "-";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter amount of {symbol1}:
          <input type="text" value={amount} onChange={handleAmountChange} />
        </label>
        <br />
        <label>
          Enter symbol 1 (e.g. BTC):
          <input type="text" value={symbol1} onChange={handleSymbol1Change} />
        </label>
        <br />
        <label>
          Enter symbol 2 (e.g. ETH):
          <input type="text" value={symbol2} onChange={handleSymbol2Change} />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        {formatPrice(amount)} {symbol1} is equal to {formatPrice(result)} {symbol2}
      </p>
    </div>
  );
};

export default CryptoPricefinal;
