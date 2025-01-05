import toast from "react-hot-toast";

export function toastWarning(message: string) {
  toast.dismiss();
  toast.error(message, {
    duration: 3000,
    position: "top-center",
    className: "custom-toast",
    iconTheme: {
      primary: "#ffc107",
      secondary: "",
    },
  });
}
