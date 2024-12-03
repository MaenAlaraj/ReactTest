// src/useSetBalance.js

import { useState } from "react";

export const useSetBalance = () => {
  const [balanceMessage, setBalanceMessage] = useState("");

  const setBalance = (userID) => {
    // Simulate fetching or calculating the balance
    const Balance_LIST = [
      `pt残高:1000`, // Replace with dynamic logic
      `残高の下限:500`, // Replace with dynamic logic
    ];
    const message = `pt残高:${Balance_LIST[0].split(":")[1]}pt(残高の下限:${Balance_LIST[1].split(":")[1]}pt)`;
    setBalanceMessage(message);

    console.log("[REACT Console]: Balance message set:", message);
  };

  return { balanceMessage, setBalance };
};
