import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <h1>Cal Poly Food Pantry</h1>
      <p>Connecting the community with food resources and support. No one should go hungry.</p>

      <Image src="/food-pantry.jpg" alt="Food pantry volunteers" width={800} height={400} />

      <div className={styles.buttons}>
        <Link href="/inventory">View Inventory</Link>
        <Link href="/delivery">Request Delivery</Link>
      </div>
    </main>
  );
}
