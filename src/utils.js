// Define the setMessage function
export function setMessage(str, id = "message") {
    if (id === "show_message") {
      // If you have a toast implementation
      if (window.ToastInterface) {
        window.ToastInterface.showToast(str);
      } else {
        console.warn("ToastInterface is not available.");
      }
    }else if (id === "showDialog"){
      if (window.ToastInterface) {
        window.ToastInterface.showDialogSound(str);
      } else {
        console.warn("ToastInterface[showDialogSound] is not available.");
      }
    }
     else {
      const messageElement = document.getElementById(id);
      if (messageElement) {
        messageElement.innerText = str;
      } else {
        console.warn(`Element with id "${id}" not found.`);
      }
    }
    console.log(str);
  }
  