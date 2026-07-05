'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Travel<span className={styles.logoAccent}>Trucks</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${styles.navLink} ${pathname.startsWith('/catalog') ? styles.activeLink : ''}`}
          >
            Catalog
          </Link>
        </nav>

        <div className={styles.spacer} />
      </div>
    </header>
  );
}