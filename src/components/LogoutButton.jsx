import React from "react";
import { useGlobalContext } from "../GlobalContext"; // Adjust path to your context

const LogoutButton = () => {
  const { setUserBeforePrefix } = useGlobalContext(); // Use context if needed for managing global states

  const handleLogout = () => {
    console.log("[REACT Console]: ログアウトしています...");

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
