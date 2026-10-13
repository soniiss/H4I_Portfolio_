import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
