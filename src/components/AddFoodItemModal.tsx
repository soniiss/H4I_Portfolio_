"use client";
import { useRef, useState } from "react";
import Button from "./Button";
import styles from "../styles/AddFoodItemModal.module.css";

export default function AddFoodItemModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // quantity stays a string since inputs always give us text, we turn it into a number when we send it
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const openModal = () => {
    setSuccess("");
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // forms reload the whole page by default, this stops that so we can handle it ourselves
    e.preventDefault();

    if (!name || !category || !quantity) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    try {
      const response = await fetch("/api/food-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          quantity: Number(quantity),
          imageUrl,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        // the server sends back { error: "..." } so we show that, and the modal stays open so they can fix it
        setError(data.error || "An error occurred while adding the item.");
      } else {
        // TODO: add the new item to the inventory list once the inventory page is merged (#18)
        setSuccess(`${data.name} was added!`);
        setName("");
        setCategory("");
        setQuantity("");
        setImageUrl("");
        closeModal();
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button variant="round" onClick={openModal} aria-label="Add food item" title="Add food item">
        {/* I drew the + as an icon so it's perfectly centered, a text + depends on the font */}
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </Button>

      {/* <dialog> is hidden until we open it, and it handles the dark background and closing with Esc for us */}
      <dialog ref={dialogRef} className={styles.dialog}>
        <h2 className={styles.title}>Add Food Item</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="imageUrl">
              Image URL <span className={styles.optional}>(optional)</span>
            </label>
            <input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </dialog>

      {success && (
        <p role="status" className={styles.success}>
          {success}
        </p>
      )}
    </div>
  );
}
