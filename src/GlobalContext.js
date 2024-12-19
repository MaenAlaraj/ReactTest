import React, { createContext, useContext, useState, useRef } from "react";

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
  const [items, setItems] = useState([]); // Items array state
  const [AccountNo, setAccountNo] = useState("");
  const [user, setUser] = useState("");
  const [Balance, setBalance] = useState(null);
  const [balanceMessage, setBalanceMessage] = useState("");
  const [productList, setProductList] = useState([]); 
  const [totalAmount, setTotalAmount] = useState(0);
  const timerId = useRef(null);




  const errorsSubstring = "エラー";
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

  const getValueFromCatList = (category) => {
    const key = category.trim();

    if (Cat_List.hasOwnProperty(key)) {
      return Cat_List[key];
    } else {
      return "商品のカテゴリーが見つかりません。";
    }
  };


  const removeRow = (rowIndex) => {
    const itemToRemove = productList.find((item) => item.index === rowIndex);
    if (itemToRemove) {
      setProductList((prevList) => prevList.filter((item) => item.index !== rowIndex));
      setTotalAmount((prevTotal) => prevTotal - itemToRemove.price);
    }
  };

  const disableButtonById = (buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.disabled = true;
      console.log(`[GlobalContext]: Button with ID '${buttonId}' is disabled.`);
    } else {
      console.warn(`[GlobalContext]: Button with ID '${buttonId}' not found.`);
    }
  };

  const enableButtonById = (buttonId) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.disabled = false;
      console.log(`[GlobalContext]: Button with ID '${buttonId}' is enabled.`);
    } else {
      console.warn(`[GlobalContext]: Button with ID '${buttonId}' not found.`);
    }
  };



  const executeAfterDelay = () => {
    // Code to execute after 5 seconds
    document.getElementById("authContainer").style.display = "block";
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "none";

    // Reset user-specific variables if needed
    setUserBeforePrefix(""); 
    console.log("executeAfterDelay: userBeforePrefix reset and UI updated.");
  };



  const startTimer = () => {
    // Clear any existing timer
    clearTimeout(timerId.current);

    // Set a new timer to execute the function after 5 seconds 
    timerId.current = setTimeout(() => {
      executeAfterDelay();
    }, 5000);

    console.log("Timer started.");
  };



  const stopTimer = () => {
    // Clear the timer
    clearTimeout(timerId.current);
    console.log("Timer stopped.");
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
        setItems,
        gcMall_code,
        header_prefix,
        AccountNo,
        setAccountNo,
        user,
        setUser,
        payment_terminalID,
        Balance,
        setBalance,
        balanceMessage,
        setBalanceMessage,
        Cat_List,
        getValueFromCatList,
        productList,
        setProductList,
        totalAmount,
        setTotalAmount,
        disableButtonById,
        enableButtonById ,
        removeRow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
