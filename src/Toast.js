import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message, duration = 7000) => {
    setToast({ message, visible: true });

    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, duration);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast.visible && (
        <div style={styles.toastContainer}>
          <p style={styles.toastMessage}>{toast.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = {
  toastContainer: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "18px",
    zIndex: 1000,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  toastMessage: {
    margin: 0,
  },
};
