import React from "react";
import styles from "./about.module.css";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className={styles.container}>
      <Navbar />
      {/* About header and mission statement for Cal Poly Food Pantry */}
      <header className={styles.header}>
        <h1 className={styles.mainHeading}>About The Food Pantry</h1>
        <p className={styles.mission}>
          The Cal Poly Food Pantry feeds the Mustang community. We believe everyone deserves access to fresh nutritious
          food. The Food Pantry has a robust inventory from a wide variety of packaged and canned foods, fresh produce,
          frozen meals, and personal hygiene items, such as diapers and menstrual products.
        </p>
      </header>

      {/* Who the Pantry serves and the services it provides */}
      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.subHeading}>Who We Serve</h2>
          <p>
            The Cal Poly Food Pantry serves the Cal Poly community, primarily currently enrolled students, university
            staff, and employees who are experiencing food insecurity and/or financial hardship.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subHeading}>Services We Provide</h2>
          <ul>
            <li>
              <strong>Drop-in: </strong>Students and staff can drop in and take any amount of food and hygiene goods.
            </li>
            <li>
              <strong>CalFresh Assistance: </strong>Students can meet with the CalFresh Outreach Team at the pantry to
              see if they qualify for benefits and have questions answered.
            </li>
            <li>
              <strong>Emergency Meal Vouchers: </strong>Eligible individuals can receive vouchers valued up to $20 per
              week to buy prepared food at campus locations (like Vista Grande or the Campus Market).
            </li>
            <li>
              <strong>Monthly SLO Food Bank Food distributions: </strong>
              Thanks to the partnership with SLO Food Bank, San Luis Obispo community members can receive fresh
              groceries at Cal Poly during the monthly SLO Food Bank food distributions.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
