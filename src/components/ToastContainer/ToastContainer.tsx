import { ElementType, FC } from "react";
import { ToastType } from "src/types";
import { Toast as ToastComponent } from "src/components/";
import "./styles.css";

type ToastContainerProps = {
  toasts: ToastType[];
  dismissToast: (id: number) => void;
  ToastComponent?: ElementType<{
    toast: ToastType;
    onDismiss: (id: number) => void;
  }>;
};

export const ToastContainer: FC<ToastContainerProps> = ({
  toasts,
  dismissToast,
}) => {
  const groupedToasts = toasts.reduce<Record<string, ToastType[]>>(
    (acc, toast) => {
      acc[toast.position] = acc[toast.position] || [];
      acc[toast.position].push(toast);
      return acc;
    },
    {}
  );

  return (
    <>
      {Object.entries(groupedToasts).map(([position, toastsInPosition]) => (
        <div key={position} className={`toast-container ${position}`}>
          {toastsInPosition.map((toast) => (
            <ToastComponent
              key={toast.id}
              toast={toast}
              onDismiss={() => dismissToast(toast.id)}
            />
          ))}
        </div>
      ))}
    </>
  );
};
