import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            <span className={styles.titleGreen}>Cal Poly SLO</span>
            <span className={styles.titleBlack}>Food Pantry</span>
          </h1>
          <p className={styles.description}>
            Food for today, hope for tomorrow. Connecting the community with food resources and support, because no one
            should have to choose between college and food.
          </p>
          <div className={styles.buttons}>
            <Link href="/inventory" className={styles.buttonPrimary}>
              View Inventory
            </Link>
            <Link href="/contact" className={styles.buttonSecondary}>
              Support
            </Link>
          </div>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/food-pantry.jpg"
            alt="Food pantry volunteers"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className={styles.cards}>
        <Link href="/inventory" className={styles.card}>
          <Image src="/browse-food.jpg" alt="" width={48} height={48} className={styles.cardIcon} />
          <div>
            <h2 className={styles.cardTitle}>Browse Food</h2>
            <p className={styles.cardText}>
              See what&apos;s currently available at our pantry and find the items your family needs.
            </p>
          </div>
        </Link>

        <Link href="/contact" className={styles.card}>
          <Image src="/support-our-community.jpg" alt="" width={48} height={48} className={styles.cardIcon} />
          <div>
            <h2 className={styles.cardTitle}>Support Our Community</h2>
            <p className={styles.cardText}>Together we can make a lasting impact and ensure no one goes hungry.</p>
          </div>
        </Link>

        <Link href="/donate" className={styles.card}>
          <Image src="/donate.jpg" alt="" width={48} height={48} className={styles.cardIcon} />
          <div>
            <h2 className={styles.cardTitle}>Donate</h2>
            <p className={styles.cardText}>
              Help us keep our shelves stocked with nutritious food and essential items.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
