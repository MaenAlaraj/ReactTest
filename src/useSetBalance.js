// src/useSetBalance.js

import { useGlobalContext } from './GlobalContext'; // Import the hook

export const useSetBalance = () => {
  const { prefix, payment_terminalID, setUserBeforePrefix } = useGlobalContext(); // Use the hook here
  
  const setBalance = (userID) => {
    const user1 = prefix + userID;
    console.log("[setBalance] Combined userID:", user1);
    
    console.log("[setBalance] Retrieved prefix:", prefix);
    console.log("[setBalance] Retrieved payment_terminalID:", payment_terminalID);
    
    const Balance_STR = window.CCWalletInterface.Balance(user1, payment_terminalID);
    console.log("[setBalance] Raw Balance String:", Balance_STR);
    
    const Balance_LIST = Balance_STR.split(" ");
    console.log("[setBalance] Split Balance String:", Balance_LIST);
    
    document.getElementById('message').innerText = `pt残高:${Balance_LIST[0].split(":")[1]}pt(残高の下限:${Balance_LIST[1].split(":")[1]}pt)`;
    
    const Balance = parseInt(Balance_LIST[0].split(":")[1]) - parseInt(Balance_LIST[1].split(":")[1]);
    console.log("[setBalance] Calculated Balance:", Balance);
    
    setUserBeforePrefix(userID);
    console.log("[setBalance] Updated userBeforePrefix:", userID);
    
    return Balance;
  };

  return setBalance;
};
