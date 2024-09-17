import { createContext } from "react";
import { ToastType } from "src/types";
import { ToastPosition } from "src/constants";

export const ToastContext = createContext<{
  showToasts: (
    toasts: Omit<ToastType, "id" | "duration" | "position"> & {
      duration?: number;
      position?: ToastPosition;
    }
  ) => void;
  dismissToast: (id: number) => void;
}>({ showToasts: () => null, dismissToast: () => null });
