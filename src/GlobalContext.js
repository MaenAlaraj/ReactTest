import React, { createContext, useContext, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Create Provider Component
export const GlobalProvider = ({ children }) => {
  const [showSecondScreenFlg, setShowSecondScreenFlg] = useState(true);
  const [gckid, setGckid] = useState("");
  const [prefix, setPrefix] = useState("93929");
  const [sbuser, setSbuser] = useState("93929" + "09000000013");
  const [extractedUserID, setExtractedUserID] = useState("");
  const [userBeforePrefix, setUserBeforePrefix] = useState("");
  const [total, setTotal] = useState(0);
  const [AccountNo, setAccountNo] = useState("");
  const [user, setUser] = useState("");
  const [Balance, setBalance] = useState(null);
  const [balanceMessage, setBalanceMessage] = useState(""); // Added state for balanceMessage

  const errorsSubstring = "エラー";
  const items = [];
  const gcMall_code = "09000000015";
  const header_prefix = "＆％MALL／";
  const payment_terminalID = "";
  const Cat_List = {
    A: 6000,
    B: 10000,
    C: 5,
    D: 10000,
    E: 6000,
    F: 8000,
    G: 70000,
    H: 5000,
  };

  return (
    <GlobalContext.Provider
      value={{
        showSecondScreenFlg,
        setShowSecondScreenFlg,
        gckid,
        setGckid,
        prefix,
        setPrefix,
        sbuser,
        setSbuser,
        errorsSubstring,
        extractedUserID,
        setExtractedUserID,
        userBeforePrefix,
        setUserBeforePrefix,
        items,
        gcMall_code,
        header_prefix,
        total,
        setTotal,
        AccountNo,
        setAccountNo,
        user,
        setUser,
        payment_terminalID,
        Balance,
        setBalance,
        balanceMessage, // Expose balanceMessage
        setBalanceMessage, // Expose setBalanceMessage
        Cat_List,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
