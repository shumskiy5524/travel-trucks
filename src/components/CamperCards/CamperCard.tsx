'use client';

import Image from 'next/image';
import RatingStars from '@/components/RatingStars/RatingStars';
import styles from './CamperCards.module.css';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  transmission: string;
  engine: string;
  form: string;
  coverImage?: string;
};

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {
  const openDetails = () => {
    window.open(`/catalog/${camper.id}`, '_blank');
  };

  const defaultSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F7F7F7'/><text x='50%' y='50%' font-family='sans-serif' font-size='12' fill='%236C717B' dominant-baseline='middle' text-anchor='middle'>No Image</text></svg>";

  return (
    <div className={styles.card}>
      <Image
        src={camper.coverImage || defaultSvg}
        alt={camper.name || "Camper"}
        width={290} 
        height={310} 
        className={styles.image}
      />
       
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h2 className={styles.title} title={camper.name}>
            {camper.name}
          </h2>
          <span className={styles.price}>
            €{camper.price.toFixed(0)}
          </span>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.ratingWrapper}>
            <RatingStars rating={camper.rating} />
            <span className={styles.reviewsText}>{camper.rating} (Reviews)</span>
          </div>
          
          <div className={styles.locationWrapper}>
            <span className={styles.locationIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 4.5l4.667-2.333L10.333 4.5 15 2.167v9.333l-4.667 2.333L5.667 11.5 1 13.833V4.5zM5.667 2.167v9.333M10.333 4.5v9.333" 
        stroke="#101828" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
            </span>
            <span>{camper.location}</span>
          </div>
        </div>
         
        <p className={styles.description}>
          {camper.description}
        </p>

       
<div className={styles.badgesRow}>
  
 
  <span className={styles.badge}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3333 5.83334V15M3.33331 15.8333V4.16668c0-.92043.74623-1.66667 1.66668-1.66667h5c.92041 0 1.66671.74624 1.66671 1.66667V15.8333M1.66666 15.8333h13.3333M5.83331 5.83334h3.33337v2.5H5.83331v-2.5z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 7.5c.8334.8333 2.5 0 2.5 1.6667v4.1666c0 .9205.7463 1.6667 1.6667 1.6667h.8333" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className={styles.badgeText}>{camper.engine}</span>
  </span>

 
  <span className={styles.badge}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="5" r="1.75" stroke="#101828" strokeWidth="1.5"/>
      <circle cx="5" cy="15" r="1.75" stroke="#101828" strokeWidth="1.5"/>
      <circle cx="15" cy="15" r="1.75" stroke="#101828" strokeWidth="1.5"/>
      <path d="M10 6.75v5.5M5 12.25h10M5 12.25v1M15 12.25v1" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className={styles.badgeText}>{camper.transmission}</span>
  </span>

 
  <span className={styles.badge}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.16666 10h11.66664M2.5 13.3333v-2.5c0-.9204.74619-1.6666 1.66666-1.6666h11.66668c.9205 0 1.6667.7462 1.6667 1.6666v2.5M3.33333 13.3333h13.33334c.4602 0 .8333.3732.8333.8334v1.6666c0 .4603-.3731.8334-.8333.8334H3.33333c-.46022 0-.83333-.3731-.83333-.8334v-1.6666c0-.4602.37311-.8334.83333-.8334z" stroke="#101828" strokeWidth="1.5"/>
      <circle cx="5.83333" cy="14.1667" r="0.833333" fill="#101828"/>
      <circle cx="14.1667" cy="14.1667" r="0.833333" fill="#101828"/>
      <path d="M5 9.16666l.83333-3.33332c.15-.6.65-.83334 1.25-.83334h5.83337c.6 0 1.1.23334 1.25.83334l.8333 3.33332" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className={styles.badgeText}>
      {camper.form === 'panelVan' ? 'Panel van' : camper.form === 'fullyIntegrated' ? 'Fully integrated' : camper.form}
    </span>
  </span>

</div>
         
        <div className={styles.actionRow}>
          <button onClick={openDetails} className={styles.showMoreButton}>
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}