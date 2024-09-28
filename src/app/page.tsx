import Image from "next/image";
import styles from "./page.module.css";
import { Table } from "@/components/Table/Table";
import { Header } from "@/components/layout/Header/Header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Table />
    </main>
  );
}
