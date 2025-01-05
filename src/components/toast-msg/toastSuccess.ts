import toast from "react-hot-toast";

export function toastSuccess(message: string) {
  toast.dismiss();
  toast.success(message, {
    duration: 3000,
    position: "top-center",
    className: "custom-toast",
  });
}
