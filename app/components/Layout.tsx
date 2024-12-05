"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Layout.module.css";
function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <div>
      <nav className={styles.navContainer}>
        <Link
          href={"/"}
          className={`${styles.link} ${pathName === "/" ? styles.active : ""}`}
        >
          Home
        </Link>
        <Link
          href={"/component"}
          className={`${styles.link} ${
            pathName === "/component" ? styles.active : ""
          }`}
        >
          Component
        </Link>
      </nav>
      {children}
    </div>
  );
}

export default Layout;
