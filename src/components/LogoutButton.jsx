import React from "react";
import { useGlobalContext } from "../GlobalContext"; // Adjust path to your context

const LogoutButton = (productList, removeRow) => {
  const { setUserBeforePrefix } = useGlobalContext(); // Use context if needed for managing global states

  const handleRemoveRow = (rowIndex) => {
    removeRow(rowIndex);
  };


  const handleLogout = () => {
    console.log("[REACT Console]: ログアウトしています...");

    if (productList.length > 0) {
      const rows = productList.length;
      console.log("The value of rows:", rows);
      const firstRowIndex = productList[0].index; // Get the index of the first row
      console.log("The value of index of 1st row:", firstRowIndex);
      removeRow(firstRowIndex); // Call removeRow with the index of the first row
    }

    // Show authContainer and hide mainContainer and transitContainer
    document.getElementById("authContainer").style.display = "block";
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "none";


    // Enable the loadProduct button
    const loadProductButton = document.getElementById("loadProduct");
    if (loadProductButton) {
      loadProductButton.disabled = false;
    }

    // Reset userBeforePrefix
    setUserBeforePrefix(""); // Assuming you're managing it in the context
  };

  return (
    <button id="logoutButton" onClick={handleLogout}>
      ログアウト
    </button>
  );
};

export default LogoutButton;
