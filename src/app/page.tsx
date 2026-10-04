import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <h1>Cal Poly Food Pantry</h1>
      <p>Connecting the community with food resources and support. No one should go hungry.</p>

      <Image
        src="/food-pantry.jpg"
        alt="Food pantry volunteers"
        width={2048}
        height={1365}
        className={styles.heroImage}
      />

      <div className={styles.buttons}>
        <Link href="/inventory" className={styles.button}>
          View Inventory
        </Link>
        <Link href="/donate" className={styles.button}>
          Donate
        </Link>
      </div>
    </main>
  );
}
