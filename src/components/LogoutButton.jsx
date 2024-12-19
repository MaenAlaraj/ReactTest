import React from "react";
import { useGlobalContext } from "../GlobalContext"; // Adjust path to your context

const LogoutButton = () => {
  const { setUserBeforePrefix, setTotal, productList, removeRow, enableButtonById  } = useGlobalContext(); // Use context if needed for managing global states
  

  const handleRemoveRow = (rowIndex) => {
    removeRow(rowIndex);
  };



  const handleLogout = () => {
    console.log("[Logout Button]: ログアウトしています...");
    console.log("[Logout Button]: productList:", productList);

    //const firstRowIndex = productList[0].index; // Get the index of the first row
    //console.log("The value of index of 1st row:", firstRowIndex);

    //removeRowTEST(0); // Remove the first row (index 0) 
    //console.log("[LogoutButton]: The first row has been removed successfully.");


    if (productList.length > 0) {
      const rows = productList.length;
      console.log("[Logout Button]: The value of rows:", rows);
      const firstRowIndex = productList[0].index; // Get the index of the first row
      console.log("[Logout Button]: The value of index of 1st row:", firstRowIndex);
      removeRow(firstRowIndex); // Call removeRow with the index of the first row
      console.log("[LogoutButton]: The first row has been removed successfully.");
      //setTotal(0)
    }
    

    // Show authContainer and hide mainContainer and transitContainer
    document.getElementById("authContainer").style.display = "block";
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "none";
    //enableLoadProduct();
    enableButtonById("loadProduct");
    // Enable the loadProduct button
    /*const loadProductButton = document.getElementById("loadProduct");
    if (loadProductButton) {
      loadProductButton.disabled = false;
      console.log("[Load Product Button]: Load Product Button is enabled.");
    }*/

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
