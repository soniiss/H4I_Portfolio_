import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Cal Poly Food Pantry | Home",
    template: "Cal Poly Food Pantry | %s",
  },
  description:
    "The Cal Poly Food Pantry feeds the Mustang community. We believe everyone deserves access to fresh nutritious food. The Food Pantry has a robust inventory from a wide variety of packaged and canned foods, fresh produce, frozen meals, and personal hygiene items, such as diapers and menstrual products.",
  icons: {
    icon: "/food-pantry-white-logo.png",
    shortcut: "/food-pantry-white-logo.png",
    apple: "/food-pantry-white-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
