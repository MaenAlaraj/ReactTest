export const setBalance = async ({
    userID,
    setUserBeforePrefix,
    prefix,
    payment_terminalID,
    setGlobalBalance,
  }) => {
    setUserBeforePrefix(userID);
    const user1 = prefix + userID;
  
    // Simulating an asynchronous call to a global interface
    const Balance_STR = await window.CCWalletInterface.Balance(user1, payment_terminalID);
    const Balance_LIST = Balance_STR.split(" ");
    document.getElementById("message").innerText =
      "pt残高:" +
      Balance_LIST[0].split(":")[1] +
      "pt(残高の下限:" +
      Balance_LIST[1].split(":")[1] +
      "pt)";
    setGlobalBalance(
      parseInt(Balance_LIST[0].split(":")[1]) -
        parseInt(Balance_LIST[1].split(":")[1])
    );
  };
  
