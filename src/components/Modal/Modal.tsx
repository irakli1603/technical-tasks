import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalSize } from "src/constants";
import "./styles.css";

interface FooterAction {
  label: string;
  onClick: () => void;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: ModalSize;
  footerActions?: FooterAction[];
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = ModalSize.MEDIUM,
  footerActions = [],
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      // Handle focus trapping
      if (e.key === "Tab") {
        const focusableModalElements =
          modalRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
        const elements = focusableModalElements
          ? Array.from(focusableModalElements)
          : [];
        if (elements.length === 0) {
          e.preventDefault();
          return;
        }
        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      // Delay focus to ensure elements are rendered
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onMouseDown={handleOutsideClick}>
      <div
        className={`modal-content modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footerActions.length > 0 && (
          <div className="modal-footer">
            {footerActions.map((action, index) => (
              <button
                key={index}
                className="modal-footer-button"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
