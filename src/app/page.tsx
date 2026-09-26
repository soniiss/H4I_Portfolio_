import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Home</h1>
    </main>
  );
  redirect("/about");
}
