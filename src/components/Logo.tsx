import Image from "next/image";
import styles from "../styles/Logo.module.css";

// Reusable Logo component
export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/food-pantry-logo.png"
        alt="Cal Poly Food Pantry Logo"
        // Width and heigh used for aspect ratios calculated with sizes
        width={491}
        height={507}
        sizes="(max-width: 1080px) 40px, 48px"
        className={styles.logo}
        // Helps load logo faster
        priority
      />
    </div>
  );
}
