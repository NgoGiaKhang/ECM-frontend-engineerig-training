import {
  AlertTriangle,
  X,
} from "lucide-react";

import Button from "../Button/Button";

import styles from "./styles.module.css";

type ConfirmDialogProps = {
  open: boolean | unknown;

  title?: string;

  description?: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  variant?: "default" | "danger";

  onConfirm: () => void;

  onCancel: () => void;
};

export function ConfirmDialog({
  open,

  title = "Are you sure?",

  description = "This action cannot be undone.",

  confirmText = "Confirm",

  cancelText = "Cancel",

  loading = false,

  variant = "default",

  onConfirm,

  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  function handleClose() {
    if (loading) {
      return;
    }

    onCancel();
  }

  return (
    <div className={styles.root}>
      <div
        className={styles.overlay}
        onClick={handleClose}
      />

      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.close}
          onClick={handleClose}
          disabled={loading}
        >
          <X size={18} />
        </button>

        <div
          className={`${styles.icon} ${
            variant === "danger"
              ? styles.danger
              : ""
          }`}
        >
          <AlertTriangle
            size={28}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {title}
          </h2>

          <p
            className={
              styles.description
            }
          >
            {description}
          </p>
        </div>

        <div className={styles.footer}>
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
          
            variant={
              variant === "danger"
                ? "danger"
                : "primary"
            }
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}