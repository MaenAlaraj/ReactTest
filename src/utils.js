import { useToast } from './ToastContext';

// Define the setMessage function
export function setMessage(str, showToast, id = "message") {
  if (id === "show_message" && typeof showToast === "function") {
    showToast(str); // Use the new toast system
  } else {
    const messageElement = document.getElementById(id);
    if (messageElement) {
      messageElement.innerText = str;
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  }
  console.log(str);
}
