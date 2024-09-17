import { useState } from "react";
import { ToastContext } from "./ToastContext";
import { ToastType } from "src/types";
import { ToastContainer } from "src/components";
import { DEFAULT_TOAST_DURATION, ToastPosition } from "src/constants";

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToasts = (toastParams: Omit<ToastType, "id">) => {
    const id = ++toastId;
    const duration =
      toastParams.duration > 0 ? toastParams.duration : DEFAULT_TOAST_DURATION;
    const position = toastParams.position ?? ToastPosition.TOP_RIGHT;

    setToasts((prevToasts) => [
      ...prevToasts,
      { id, position, ...toastParams },
    ]);

    setInterval(() => {
      dismissToast(id);
    }, duration);
  };

  const dismissToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToasts, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  );
};
