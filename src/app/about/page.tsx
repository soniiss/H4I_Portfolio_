import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

/* icon variables */
const Icons = {
  Plant: "/icon-plant.png",
  Handshake: "/icon-handshake.png",
  Sprout: "/icon-sprout.png",
};

export default function About() {
  return (
    <main className={styles.container}>
      <section className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heroText}>
          <h1 id="about-heading" className={styles.mainHeading}>
            About the Cal Poly Food Pantry
          </h1>
          <p className={styles.tagline}>Food for today. Hope for tomorrow.</p>
          <p className={styles.intro}>
            The Cal Poly Food Pantry feeds the Mustang community. We believe everyone deserves access to fresh
            nutritious food. The pantry provides free groceries to students, faculty, and staff in need.
          </p>
        </div>

        <div className={styles.heroImageWrapper}>
          <Image
            src="/food-pantry-2.png"
            alt="Food pantry volunteers"
            width={1200}
            height={800}
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.cards} aria-label="About the pantry">
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <Image src={Icons.Plant} alt="" aria-hidden="true" width={24} height={24} />
            </div>
            <h2 className={styles.cardHeading}>Our Mission</h2>
          </div>
          <p className={styles.cardText}>
            The Cal Poly Food Pantry is dedicated to alleviating food insecurity on campus by providing free groceries
            to students, faculty, and staff in need.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <Image src={Icons.Handshake} alt="" aria-hidden="true" width={24} height={24} />
            </div>
            <h2 className={styles.cardHeading}>How We Help</h2>
          </div>
          <p className={styles.cardText}>
            We distribute free groceries to those in need, ensuring that everyone has access to nutritious food.
          </p>
        </article>
      </section>

      {/* Impact section */}
      <section className={styles.impact} aria-label="Our impact">
        <article className={styles.impactItem}>
          <div className={styles.iconCircleSmall}>
            <Image src={Icons.Sprout} alt="" aria-hidden="true" width={20} height={20} />
          </div>
          <div className={styles.impactContent}>
            <h2 className={styles.impactHeading}>Nutritious Food</h2>
            <p className={styles.impactText}>We help our community access nourishing food for their everyday needs.</p>
          </div>
        </article>

        <article className={styles.impactItem}>
          <div className={styles.iconCircleSmall}>
            <Image src={Icons.Handshake} alt="" aria-hidden="true" width={20} height={20} />
          </div>
          <div className={styles.impactContent}>
            <h2 className={styles.impactHeading}>Stronger Community</h2>
            <p className={styles.impactText}>
              The school and partners work together to support people in our community.
            </p>
          </div>
        </article>

        <article className={styles.impactItem}>
          <div className={styles.iconCircleSmall}>
            <Image src={Icons.Plant} alt="" aria-hidden="true" width={20} height={20} />
          </div>
          <div className={styles.impactContent}>
            <h2 className={styles.impactHeading}>Brighter Tomorrows</h2>
            <p className={styles.impactText}>
              Access to food and support can help people move toward a brighter future.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
