"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Layout.module.css";
import styled from "styled-components";
import ImageModal from "./ImageModal";
const NavWrapper = styled.nav`
  position: relative;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  background-color: var(--background200);
`;
function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <div>
      <NavWrapper>
        <Link
          href={"/blueprint"}
          className={`${styles.link} ${
            pathName === "/blueprint" ? styles.active : ""
          }`}
        >
          Blueprint
        </Link>
        <Link
          href={"/theme"}
          className={`${styles.link} ${
            pathName === "/theme" ? styles.active : ""
          }`}
        >
          Theme
        </Link>
      </NavWrapper>
      <ImageModal />
      {children}
    </div>
  );
}

export default Layout;
