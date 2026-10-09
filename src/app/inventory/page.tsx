"use client";

import { useEffect, useState } from "react";
import styles from "./inventory.module.css";
import AddFoodItemModal from "@/components/AddFoodItemModal";

type FoodItem = {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  quantity: number;
  imageUrl?: string;
};

export default function InventoryPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchFoodItems() {
      try {
        const response = await fetch("/api/food-items", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: FoodItem[] = await response.json();

        if (!ignore) {
          setFoodItems(data);
          setError(null);
        }
      } catch (err) {
        console.error("failed to load food items:", err);
        if (!ignore) {
          setError("unable load food items. please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchFoodItems();

    return () => {
      ignore = true;
    };
  }, []);

  let content;

  if (loading) {
    content = <p className={styles.subtitle}>Loading food items...</p>;
  } else if (error) {
    content = (
      <p className={styles.subtitle} role="alert">
        {error}
      </p>
    );
  } else if (foodItems.length === 0) {
    content = <p className={styles.subtitle}>No food items are currently available.</p>;
  } else {
    content = (
      <div className={styles.grid}>
        {foodItems.map((item) => (
          <div key={item._id ?? item.id ?? item.name} className={styles.card}>
            {/* image placeholder / wrapper */}
            <div className={styles.imageWrapper}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className={styles.image} />
              ) : (
                <span className={styles.noImage}>Image Placeholder</span>
              )}
            </div>

            {/* item info */}
            <div className={styles.info}>
              <p className={styles.category}>{item.category}</p>
              <h2 className={styles.name}>{item.name}</h2>
            </div>

            {/* conditional stock badge */}
            <div className={item.quantity === 0 ? styles.outOfStockBadge : styles.inStockBadge}>
              {item.quantity === 0 ? "Out of Stock" : `${item.quantity} in stock`}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pantry Inventory</h1>
      <p className={styles.subtitle}>See what food items are currently available at our pantry.</p>

      {content}
    </main>
  );
}
