// src/components/WiFiStatus.jsx

import React, { useState, useEffect } from "react";
import { setupWiFiStatusListeners } from "../UtilitiesFunctions/networkStatus";

const WiFiStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Set up network status listeners
    const cleanup = setupWiFiStatusListeners(setStatus);

    // Cleanup listeners on component unmount
    return cleanup;
  }, []);

  return <p id="wifiStatus">{status}</p>;
};

export default WiFiStatus;
