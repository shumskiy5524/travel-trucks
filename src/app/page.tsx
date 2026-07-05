'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay} />

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          Campers of your dreams
        </h1>

        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>

        <Link href="/catalog" className={styles.catalogLink}>
          View Now
        </Link>
      </div>
    </section>
  );
}