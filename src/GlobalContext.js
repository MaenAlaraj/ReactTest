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
  
  const [total, setTotal] = useState(0); // Total amount state
  const [items, setItems] = useState([]); // Items array state





  const [AccountNo, setAccountNo] = useState("");
  const [user, setUser] = useState("");
  const [Balance, setBalance] = useState(null);
  const [balanceMessage, setBalanceMessage] = useState(""); // Added state for balanceMessage
  const [productList, setProductList] = useState([]); // Add productList state
  const [totalAmount, setTotalAmount] = useState(0); // Moved totalAmount here
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
        getValueFromCatList,
        productList, // Expose productList
        setProductList, // Expose setProductList
        totalAmount,
        setTotalAmount,
        removeRow, // Expose removeRow
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
