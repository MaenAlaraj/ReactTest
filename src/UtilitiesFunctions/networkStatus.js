// src/UtilitiesFunctions/networkStatus.js

/**
 * Get the current WiFi status message.
 * @returns {string} The WiFi status message.
 */
export const getWiFiStatusMessage = () => {
    return navigator.onLine ? "Wi-Fiの状態: 接続済み" : "Wi-Fiの状態: 切断されました";
  };
  
  /**
   * Set up listeners to monitor network status changes and update the WiFi status.
   * @param {Function} setStatus - A function to update the WiFi status in the React component's state.
   */
  export const setupWiFiStatusListeners = (setStatus) => {
    const updateWiFiStatus = () => {
      setStatus(getWiFiStatusMessage());
    };
  
    // Initial status update
    updateWiFiStatus();
  
    // Add event listeners for network status changes
    window.addEventListener("online", updateWiFiStatus);
    window.addEventListener("offline", updateWiFiStatus);
  
    // Return a cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", updateWiFiStatus);
      window.removeEventListener("offline", updateWiFiStatus);
    };
  };
  