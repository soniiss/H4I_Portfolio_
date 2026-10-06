import { mockFoodItems } from "@/data/mockFoodItems";
import styles from "./inventory.module.css";

export default function InventoryPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pantry Inventory</h1>
      <p className={styles.subtitle}>See what food items are currently available at our pantry.</p>

      <div className={styles.grid}>
        {mockFoodItems.map((item) => (
          <div key={item.id} className={styles.card}>
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
    </main>
  );
}
