import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CamperDetails.module.css';


interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Camper {
  id: string;
  name: string;
  rating: number;
  location: string;
  price: number;
  gallery: string[];
  description: string;
  form: string;
  transmission: string;
  engine: string;
  kitchen?: boolean;
  AC?: boolean;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  reviews?: Review[];
}

interface CamperDetailsProps {
  camper: Camper | null; 
}

const StarIcon = () => <span className={styles.starGold}>★</span>;
const MapIcon = () => <span>📍</span>;

export default function CamperDetails({ camper }: CamperDetailsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  if (!camper) {
    return <div className={styles.pageWrapper}>Loading...</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
      
        <section className={styles.headerSection}>
          <h1 className={styles.title}>{camper.name || 'Mighty Class C Medium'}</h1>
          <div className={styles.metaInfo}>
            <div className={styles.ratingWrapper}>
              <StarIcon />
              <span>{camper.rating || '4.8'}</span>
              <a href="#reviews" className={styles.reviewsLink}>
                ({camper.reviews?.length || 0} Reviews)
              </a>
            </div>
            <div className={styles.ratingWrapper}>
              <MapIcon />
              <span>{camper.location || 'Kyiv, Ukraine'}</span>
            </div>
          </div>
          <div className={styles.price}>€{(camper.price || 8000).toFixed(2)}</div>
        </section>

     
        <section className={styles.galleryWrapper}>
          <div className={styles.mainSwiper} style={{ position: 'relative', overflow: 'hidden' }}>
            {camper.gallery?.[0] ? (
              <Image 
                src={camper.gallery[0]} 
                alt={camper.name || "Camper photo"}
                fill
                priority 
                sizes="(max-width: 1440px) 100vw, 1312px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#F2F4F7' }}>
                <span>Основное изображение</span>
              </div>
            )}
          </div>
        </section>

       
        <p className={styles.description}>
          {camper.description || 'Embrace simplicity and freedom with this beautiful motorhome.'}
        </p>

        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'features' ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

    
        <div className={styles.bottomGrid}>
          
          <div className={styles.leftColumn}>
            {activeTab === 'features' ? (
              <div className={styles.featuresCard}>
                <div className={styles.badgesList}>
                  <span className={styles.badge}>🚌 {camper.form || 'Panel truck'}</span>
                  <span className={styles.badge}>⚙️ {camper.transmission || 'Automatic'}</span>
                  <span className={styles.badge}>⛽ {camper.engine || 'Petrol'}</span>
                  {camper.kitchen && <span className={styles.badge}>🍳 Kitchen</span>}
                  {camper.AC && <span className={styles.badge}>❄️ AC</span>}
                </div>

                <div>
                  <h3 className={styles.detailsTitle}>Vehicle details</h3>
                  <div className={styles.detailsList}>
                    <div className={styles.detailsRow}>
                      <span>Form</span>
                      <span className={styles.detailsValue}>{camper.form || 'Panel truck'}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Length</span>
                      <span className={styles.detailsValue}>{camper.length || '4.99 m'}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Width</span>
                      <span className={styles.detailsValue}>{camper.width || '2.05 m'}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Height</span>
                      <span className={styles.detailsValue}>{camper.height || '2.68 m'}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Tank</span>
                      <span className={styles.detailsValue}>{camper.tank || '75 l'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.reviewsList} id="reviews">
                {(camper.reviews && camper.reviews.length > 0) ? camper.reviews.map((rev, idx) => (
                  <div key={idx} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>{rev.reviewer_name?.[0]?.toUpperCase() || 'A'}</div>
                      <div>
                        <h4 className={styles.reviewerName}>{rev.reviewer_name}</h4>
                        <div className={styles.starsContainer}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < rev.reviewer_rating ? styles.starGold : styles.starGray}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{rev.comment}</p>
                  </div>
                )) : (
                  <p className={styles.description}>No reviews yet for this vehicle.</p>
                )}
              </div>
            )}
          </div>

        
          <div className={styles.rightColumn}>
            <div className={styles.bookingFormCard}>
              <h3 className={styles.formTitle}>Book your campervan now</h3>
              <p className={styles.formSubtitle}>Stay connected, we&ll call you back</p>
              
              <form className={styles.formFields} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputWrapper}>
                  <input type="text" placeholder="Name*" className={styles.inputField} required />
                </div>
                <div className={styles.inputWrapper}>
                  <input type="email" placeholder="Email*" className={styles.inputField} required />
                </div>
                <div className={styles.inputWrapper}>
                  <input type="date" placeholder="Booking date*" className={styles.inputField} required />
                </div>
                <div className={styles.inputWrapper}>
                  <textarea placeholder="Comment" className={styles.textareaField}></textarea>
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Send
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}