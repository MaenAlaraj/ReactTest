export const setBalance = async ({
    userID,
    setUserBeforePrefix,
    prefix,
    payment_terminalID,
    setGlobalBalance,
  }) => {
    // Log the userID and prefix for debugging
    console.log("User ID:", userID);
    console.log("Prefix:", prefix);
  
    setUserBeforePrefix(userID);
    const user1 = prefix + userID;
  
    // Log the combined userID for debugging
    console.log("Combined User ID:", user1);
  
    // Simulate the asynchronous call to CCWalletInterface
    try {
      const Balance_STR = await window.CCWalletInterface.Balance(user1, payment_terminalID);
  
      // Log the returned Balance_STR to see the raw string
      console.log("Balance String:", Balance_STR);
  
      const Balance_LIST = Balance_STR.split(" ");
      console.log("Balance List:", Balance_LIST);
  
      // Update the UI (optional, depending on your setup)
      document.getElementById("message").innerText =
        "pt残高:" +
        Balance_LIST[0].split(":")[1] +
        "pt(残高の下限:" +
        Balance_LIST[1].split(":")[1] +
        "pt)";
  
      // Calculate the balance difference
      const calculatedBalance =
        parseInt(Balance_LIST[0].split(":")[1]) -
        parseInt(Balance_LIST[1].split(":")[1]);
  
      // Log the calculated balance for debugging
      console.log("Calculated Balance:", calculatedBalance);
  
      setGlobalBalance(calculatedBalance);
    } catch (error) {
      // Log any errors if the CCWalletInterface call fails
      console.error("Error while getting balance:", error);
    }
  };
  