import { useState } from "react";
import { useGlobalContext } from './GlobalContext'; // Import the hook

export const useSetBalance = () => {
  const { prefix, payment_terminalID, setUserBeforePrefix } = useGlobalContext(); // Use the hook here
  const [balanceMessage, setBalanceMessage] = useState(""); // State to store the balance message
  const [userID, setUserID] = useState(""); // State to store the userID

  const setBalance = (userIDParam) => {
    const user1 = prefix + userIDParam;
    console.log("[setBalance] Combined userID:", user1);

    console.log("[setBalance] Retrieved prefix:", prefix);
    console.log("[setBalance] Retrieved payment_terminalID:", payment_terminalID);

    const Balance_STR = window.CCWalletInterface.Balance(user1, payment_terminalID);
    console.log("[setBalance] Raw Balance String:", Balance_STR);

    const Balance_LIST = Balance_STR.split(" ");
    console.log("[setBalance] Split Balance String:", Balance_LIST);

    // Format the message
    const message = `pt残高:${Balance_LIST[0].split(":")[1]}pt(残高の下限:${Balance_LIST[1].split(":")[1]}pt)`;

    // Update the states
    setBalanceMessage(message);
    setUserID(userIDParam);

    setUserBeforePrefix(userIDParam);
    console.log("[setBalance] Updated userBeforePrefix:", userIDParam);
  };

  return { balanceMessage, userID, setBalance }; // Return the states and the setBalance function
};
