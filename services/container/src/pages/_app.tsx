import type { AppProps } from "next/app";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <Link href={"/todo"}>todo</Link>
      <Link href={"/counter"}>counter</Link>
    </div>
  );
}
