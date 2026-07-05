'use client';

import React from 'react';
import styles from './CamperFeatures.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';
interface Camper {
  id: string; // 
  transmission: string;
  engine: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
}

export default function FeaturesTab({ camper }: { camper: Camper }) {
  const formatForm = (formValue: string) => {
    if (!formValue) return '';
    const lower = formValue.toLowerCase();
    if (lower.includes('panel')) return 'Panel van';
    if (lower.includes('fully')) return 'Fully integrated';
    if (lower.includes('semi')) return 'Semi-integrated';
    return formValue;
  };

  return (
    <div className={styles.tabContainer}>
      
     
      <div className={styles.featuresCard}>
        
      
        <div className={styles.badgesGrid}>
          <span className={styles.badge}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="5" r="1.75" stroke="#101828" strokeWidth="1.5"/>
              <circle cx="5" cy="15" r="1.75" stroke="#101828" strokeWidth="1.5"/>
              <circle cx="15" cy="15" r="1.75" stroke="#101828" strokeWidth="1.5"/>
              <path d="M10 6.75v5.5M5 12.25h10M5 12.25v1M15 12.25v1" stroke="#101828" strokeWidth="1.5"/>
            </svg>
            <span className={styles.capitalize}>{camper.transmission}</span>
          </span>

          <span className={styles.badge}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 5.83334V15M3.33331 15.8333V4.16668c0-.92043.74623-1.66667 1.66668-1.66667h5c.92041 0 1.66671.74624 1.66671 1.66667V15.8333M1.66666 15.8333h13.3333M5.83331 5.83334h3.33337v2.5H5.83331v-2.5z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.capitalize}>{camper.engine}</span>
          </span>

          {camper.AC && (
            <span className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2v16M2 10h16M14.24 5.76l-8.48 8.48M5.76 5.76l8.48 8.48" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>AC</span>
            </span>
          )}

          {camper.kitchen && (
            <span className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33331 16.6667V3.33334c0-.92043.74624-1.66667 1.66668-1.66667h10c.9204 0 1.6667.74624 1.6667 1.66667V16.6667z" stroke="#101828" strokeWidth="1.5"/>
              </svg>
              <span>Kitchen</span>
            </span>
          )}
        </div>

        
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsTitle}>Vehicle details</h3>
          <div className={styles.line} />
          
          <div className={styles.infoTable}>
            <div className={styles.infoRow}>
              <span>Form</span>
              <span className={styles.infoValue}>{formatForm(camper.form)}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Length</span>
              <span className={styles.infoValue}>{camper.length}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Width</span>
              <span className={styles.infoValue}>{camper.width}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Height</span>
              <span className={styles.infoValue}>{camper.height}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Tank</span>
              <span className={styles.infoValue}>{camper.tank}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Consumption</span>
              <span className={styles.infoValue}>{camper.consumption}</span>
            </div>
          </div>
        </div>

      </div>

    
      
<div className={styles.formColumn}>
  <BookingForm camperId={camper.id} />
</div>

    </div>
  );
}