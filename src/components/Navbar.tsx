import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <Link href="/about" className={styles.link}>
        About
      </Link>
      <Link href="/inventory" className={styles.link}>
        Inventory
      </Link>
      <Link href="/donate" className={styles.link}>
        Donate
      </Link>
      <Link href="/contact" className={styles.link}>
        Contact Us
      </Link>
    </nav>
  );
}
