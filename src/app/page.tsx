import { mockFoodItems } from "@/data/mockFoodItems";
import styles from "./inventory.css";

export default function InventoryPage() {
  return (
    <main className={styles.main}>
      <h1>Inventory</h1>

      <div className={styles.grid}>
        {mockFoodItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <h2>{item.name}</h2>
            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Quantity:</strong>{" "}
              {item.quantity === 0 ? <span className={styles.outOfStock}>Out of Stock</span> : item.quantity}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
