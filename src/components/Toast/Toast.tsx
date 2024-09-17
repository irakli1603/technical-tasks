import { FC } from "react";
import "./styles.css";
import { ToastType } from "src/types";

export const Toast: FC<{
  toast: Pick<ToastType, "status" | "title" | "message">;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  const { status, title, message } = toast;

  return (
    <div className={`toast toast-${status}`}>
      <div className="toast-content">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button onClick={onDismiss} className="toast-close-button">
        &times;
      </button>
    </div>
  );
};
