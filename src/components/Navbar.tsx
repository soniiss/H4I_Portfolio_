"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import styles from "../styles/Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/inventory", label: "Inventory" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  // Gets the current page URL for determining active page
  const pathname = usePathname();

  return (
    <nav className={styles.navbar} aria-label="Primary navigation">
      <Link href="/" className={styles.brand}>
        <Logo />
        <span className={styles.brandName}>Community Pantry</span>
      </Link>

      {/* Used Array.map to map each page link to label and help reduce repetive code*/}
      <div className={styles.links}>
        {links.map(({ href, label }) => {
          // Determine whether this page isActivce:
          // For home page, pathname must exactly = href ("/")
          // For all other pages, pathname must either exactly = href OR
          // must start with href ("/inventory/123")
          const isActive = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              // Styles are dynamically applied for active page
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              // Browser accesibility
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
