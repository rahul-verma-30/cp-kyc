import Navbar from "@/components/home/navbar/Navbar";
import HeroSection from "@/components/home/hero/HeroSection";
import StatsSection from "@/components/home/stats/StatsSection";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.pageWrapper}>
      <HeroSection />
      <StatsSection />
    </main>
  );
}
