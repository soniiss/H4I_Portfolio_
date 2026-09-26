"use client";

import { useState } from "react";
import styles from "./donate.module.css";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const handleDonate = () => {
    const amount = donationAmount ?? Number(customAmount);

    if (amount > 0) {
      setConfirmationMessage(`Thank you for your donation of $${amount}!`);
    } else {
      setConfirmationMessage("Please enter a valid donation amount greater than $0.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Donate</h1>

      <div className={styles.formGroup}>
        {/* Preset donation amount buttons */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.presetButton}
            onClick={() => setDonationAmount(5)}
          >
            $5
          </button>
          <button
            type="button"
            className={styles.presetButton}
            onClick={() => setDonationAmount(10)}
          >
            $10
          </button>
          <button
            type="button"
            className={styles.presetButton}
            onClick={() => setDonationAmount(25)}
          >
            $25
          </button>
          <button
            type="button"
            className={styles.presetButton}
            onClick={() => setDonationAmount(50)}
          >
            $50
          </button>
        </div>

        {/* Custom donation amount input */}
        <input
          type="number"
          className={styles.inputField}
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setDonationAmount(null);
          }}
        />

        {/* Donate button */}
        <button
          type="button"
          className={styles.donateButton}
          onClick={handleDonate}
        >
          Donate Now
        </button>

        {/* Confirmation message */}
        {confirmationMessage && (
          <p className={styles.message}>{confirmationMessage}</p>
        )}
      </div>
    </div>
  );
}