"use client";

import { FormEvent, useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h1>Contact the Pantry</h1>
          <p>Questions, ideas, or looking to support us in some way? We’d love to hear from you!</p>
        </header>

        <div className={styles.contactDetails}>
          <div>
            <h2>Pantry contact</h2>
            <p>1 Grand Ave, San Luis Obispo, CA 93407</p>
            <p> Building 27, Room 10 (lower level)</p>
          </div>
          <div>
            <p>
              <a href="mailto:wellbeing@calpoly.edu ">wellbeing@calpoly.edu </a>
            </p>
            <p>
              <a href="tel:+18057566181">(805) 756-6181</a>
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />

          <button type="submit">Send message</button>
          {submitted && (
            <p className={styles.confirmation} role="status">
              Thanks for reaching out! Your message has been received.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
