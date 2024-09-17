import { ToastStatus, ToastPosition } from "./constants";

export type ToastType = {
  id: number;
  status: ToastStatus;
  title: string;
  message: string;
  position: ToastPosition;
  duration: number;
}
