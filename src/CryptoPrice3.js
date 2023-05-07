import React, { useState } from "react";
import axios from "axios";

const CryptoPrice3 = () => {
  const [symbol1, setSymbol1] = useState("");
  const [price1, setPrice1] = useState(null);
  const [symbol2, setSymbol2] = useState("");
  const [price2, setPrice2] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange1 = (event) => {
    setSymbol1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSymbol2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol1.toUpperCase()}`
      );
      console.log("API Response 1:", response1.data);
      const lastPriceUsd1 = response1.data.last_price_usd;
      setPrice1(lastPriceUsd1);
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to get price data. Please check the symbol and try again.");
      setPrice1(null);
    }

    try {
      const response2 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol2.toUpperCase()}`
      );
      console.log("API Response 2:", response2.data);
      const lastPriceUsd2 = response2.data.last_price_usd;
      setPrice2(lastPriceUsd2);
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to get price data. Please check the symbol and try again.");
      setPrice2(null);
    }
  };

  const formatPrice = (symbol, price) => {
    if (price) {
      return `$${parseFloat(price).toFixed(8)} (${symbol.toUpperCase()})`;
    } else {
      return "-";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter crypto symbol 1 (e.g. BTC):
          <input type="text" value={symbol1} onChange={handleInputChange1} />
        </label>
        <label>
          Enter crypto symbol 2 (e.g. ETH):
          <input type="text" value={symbol2} onChange={handleInputChange2} />
        </label>
        <button type="submit">Get Prices</button>
      </form>
      {error && <p>{error}</p>}
      <p>The last price of {symbol1.toUpperCase()} in USD is: {formatPrice(symbol1, price1)}</p>
      <p>The last price of {symbol2.toUpperCase()} in USD is: {formatPrice(symbol2, price2)}</p>
    </div>
  );
};

export default CryptoPrice3;
