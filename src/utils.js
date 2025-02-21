// Define the setMessage function
export function setMessage(str, id = "message") {
    if (id === "show_message") {
      // If you have a toast implementation
      if (window.ToastInterface) {
        window.ToastInterface.showToast(str,10000,80);
      } else {
        console.warn("ToastInterface is not available.");
      }
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
  