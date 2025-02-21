import React, { createContext, useState, useContext } from 'react';

// Create Toast Context
const ToastContext = createContext();

// Custom Hook to use Toast Context
export const useToast = () => useContext(ToastContext);

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', visible: false });

  // Function to show toast with message
  const showToast = (message, duration = 3000) => {
    setToast({ message, visible: true });

    // Hide toast after duration
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Message Component */}
      {toast.visible && (
        <div style={styles.toast}>{toast.message}</div>
      )}
    </ToastContext.Provider>
  );
};

// Toast Styling
const styles = {
  toast: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    zIndex: 1000,
  },
};
