export function setMessage(str, id = "message") {
  if (id === "show_message") {
    if (window.ToastInterface) {
      window.ToastInterface.showToast(str);
      setTimeout(() => {
        window.ToastInterface.hideToast();  // If ToastInterface supports hiding
      }, 3000); // Show for 3 seconds
    } else {
      console.warn("ToastInterface is not available.");
    }
  } else {
    const messageElement = document.getElementById(id);
    if (messageElement) {
      messageElement.innerText = str;
      
      // Adjust location, font size, and apply styles
      messageElement.style.position = "fixed";
      messageElement.style.bottom = "20px";
      messageElement.style.left = "20px";
      messageElement.style.fontSize = "18px";
      messageElement.style.transition = "opacity 0.5s ease";  // Smooth fade-out effect

      // Hide after 3 seconds
      setTimeout(() => {
        messageElement.style.opacity = "0";  // Fade out
      }, 3000);
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  }
  console.log(str);
}
