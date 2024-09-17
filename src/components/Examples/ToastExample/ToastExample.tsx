import React, { useState } from "react";
import {
  DEFAULT_TOAST_DURATION,
  ToastPosition,
  ToastStatus,
} from "src/constants";
import { useToast } from "src/hooks";
import "./styles.css";
import { ToastType } from "src/types";

export const ToastExample: React.FC = () => {
  const { showToasts } = useToast();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ToastStatus>(ToastStatus.SUCCESS);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<ToastPosition>(
    ToastPosition.TOP_RIGHT
  );
  const [duration, setDuration] = useState<number | "">(DEFAULT_TOAST_DURATION);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const toastData: Omit<ToastType, "id" | "duration" | "position"> & {
      duration?: number;
      position?: ToastPosition;
    } = {
      title,
      status,
      message,
    };

    if (position) {
      toastData.position = position;
    }

    if (duration) {
      toastData.duration = Number(duration);
    }

    showToasts(toastData);

    setTitle("");
    setStatus(ToastStatus.SUCCESS);
    setMessage("");
    setPosition(ToastPosition.TOP_RIGHT);
    setDuration(DEFAULT_TOAST_DURATION);
  };

  return (
    <div className="example-wrapper">
      <h1>Toast Example</h1>
      <form className="toast-form" onSubmit={handleSubmit}>
        <div className="toast-field">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="toast-field">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => {
              const selectedStatus = e.target.value as ToastStatus;
              if (Object.values(ToastStatus).includes(selectedStatus)) {
                setStatus(selectedStatus);
              }
            }}
            required
          >
            {Object.values(ToastStatus).map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="toast-field">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="toast-field">
          <label>Position:</label>
          <select
            value={position}
            onChange={(e) => {
              const selectedPosition = e.target.value as ToastPosition;
              if (Object.values(ToastPosition).includes(selectedPosition)) {
                setPosition(selectedPosition);
              }
            }}
          >
            {Object.values(ToastPosition).map((positionOption) => (
              <option key={positionOption} value={positionOption}>
                {positionOption}
              </option>
            ))}
          </select>
        </div>

        <div className="toast-field">
          <label>Duration (ms):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => {
              const value = e.target.value;
              setDuration(value ? parseInt(value) : "");
            }}
            min="1000"
            placeholder={DEFAULT_TOAST_DURATION.toString()}
          />
        </div>

        <button type="submit">Show Toast</button>
      </form>
    </div>
  );
};
