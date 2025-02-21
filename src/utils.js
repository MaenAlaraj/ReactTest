import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Updated setMessage function
export function setMessage(str, type = "info") {
  const options = {
    position: "top-center", // Adjust location (top-left, top-right, bottom-center, etc.)
    autoClose: 5000, // Adjust display time in milliseconds (5 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { fontSize: "18px" }, // Adjust font size
  };

  if (type === "error") {
    toast.error(str, options);
  } else {
    toast.success(str, options);
  }
}
