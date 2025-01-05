import toast from "react-hot-toast";

export function toastError(message: string) {
  toast.dismiss();
  toast.error(message, {
    duration: 3000,
    position: "top-center",
    className: "custom-toast",
  });
}
