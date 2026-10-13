"use client";
import styles from "../styles/ConfirmDeleteModal.module.css";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

type ConfirmDeleteModalProps = {
  // the item to delete, or null when the modal should be closed
  item: { id: string; name: string } | null;
  onClose: () => void;
  onDeleted: (id: string) => void;
};

export default function ConfirmDeleteModal({ item, onClose, onDeleted }: ConfirmDeleteModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // the page opens the modal by passing in an item, and closes it by setting item back to null
  useEffect(() => {
    if (item) {
      setError("");
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [item]);

  // hides the success message after 3 seconds
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  const handleDelete = async () => {
    if (!item) return;
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/food-items/${item.id}`, { method: "DELETE" });
      if (response.ok) {
        // save the name now since item turns into null once the modal closes
        setSuccess(`"${item.name}" was deleted.`);
        onDeleted(item.id);
        onClose();
      } else {
        const data = await response.json();
        // the API's message has the ID in it, which is only useful for us, so log it instead of showing it
        console.error("Failed to delete food item:", data.error);

        if (response.status === 404) {
          setError(`"${item.name}" no longer exists. It may have already been deleted.`);
        } else {
          setError(`Couldn't delete "${item.name}". Please try again.`);
        }
      }
    } catch {
      setError("Failed to delete the item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* onClose runs when Esc closes the dialog too, so the page knows it's closed */}
      <dialog ref={dialogRef} onClose={onClose} className={styles.dialog}>
        <h2 className={styles.title}>Confirm Deletion</h2>
        <p className={styles.message}>Are you sure you want to delete {`"${item?.name}"`}?</p>
        <p className={styles.warning}>This can&apos;t be undone.</p>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </dialog>

      {/* the toast goes outside the dialog since the dialog closes when the delete works */}
      {success && (
        <p key={success} role="status" className={styles.toast}>
          {success}
        </p>
      )}
    </>
  );
}
