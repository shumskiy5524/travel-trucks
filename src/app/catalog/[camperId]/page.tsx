'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { fetchCamperById, createBooking } from '@/lib/api';
import styles from './camper.module.css';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  gallery: { id: string; thumb: string; original: string; order: number; }[];
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC?: boolean;
  kitchen?: boolean;
  radio?: boolean;
  bathroom?: boolean;
  reviews?: { reviewer_name: string; reviewer_rating: number; comment: string; }[];
};

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const [form, setForm] = useState({ name: '', email: '', date: '', comment: '' });
  const [errors, setErrors] = useState({ name: '', email: '', comment: '' });

  useEffect(() => {
    const getCamper = async () => {
      try {
        const data = await fetchCamperById(camperId);
        setCamper(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCamper();
  }, [camperId]);

  const validateForm = () => {
    const newErrors = { name: '', email: '', comment: '' };
    let isValid = true;
    if (!form.name.trim()) { newErrors.name = 'Please enter your full name.'; isValid = false; }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { newErrors.email = 'Please enter a valid email address.'; isValid = false; }
    if (!form.comment.trim()) { newErrors.comment = 'Comment is required.'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleBooking = async () => {
    if (!validateForm()) return;
    try {
      await createBooking(form);
      alert('Booking successful!');
      setForm({ name: '', email: '', date: '', comment: '' });
    } catch {
      alert('Booking failed.');
    }
  };

  const renderStars = (rating: number) => (
    <div className={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={star <= Math.round(rating) ? styles.starGold : styles.starGray}
        >
          ★
        </span>
      ))}
    </div>
  );

  const formatForm = (formType: string) => {
    const forms: Record<string, string> = {
      panelTruck: 'Panel truck',
      fullyIntegrated: 'Fully integrated',
      alcove: 'Alcove',
    };
    return forms[formType] || formType;
  };

  if (loading) return <div className="p-10 text-center text-lg font-medium">Loading...</div>;
  if (!camper) return <div className="p-10 text-center text-red-500 font-medium">Camper not found</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
    
        <div className={styles.headerSection}>
          <h1 className={styles.title}>{camper.name}</h1>
          <div className={styles.metaInfo}>
            <div className={styles.ratingWrapper}>
              {renderStars(camper.rating)}
              <span className={styles.reviewsLink}>({camper.reviews?.length || 0} Reviews)</span>
            </div>
            <span>📍 {camper.location}</span>
          </div>
          <p className={styles.price}>€{camper.price.toFixed(2)}</p>
        </div>

       
        <div className={styles.galleryWrapper}>
          <Swiper
            loop={camper.gallery.length > 1}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs]}
            className={styles.mainSwiper}
          >
            {camper.gallery.map((img, idx) => (
              <SwiperSlide key={img.id}>
                <div className="relative w-full h-full">
                  <Image src={img.original} alt={camper.name} fill className="object-cover" priority={idx === 0} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={camper.gallery.length > 1}
            spaceBetween={16}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className={styles.thumbSwiper}
          >
            {camper.gallery.map((img) => (
              <SwiperSlide key={img.id} className={styles.thumbSlide}>
                <div className={styles.thumbImageWrapper}>
                  <Image src={img.thumb} alt="thumbnail" fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

     
        <p className={styles.description}>{camper.description}</p>

      
        <section className={styles.tabsContainer}>
          <button 
            onClick={() => setActiveTab('features')}
            className={`${styles.tabButton} ${activeTab === 'features' ? styles.tabActive : styles.tabInactive}`}
          >
            Features
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.tabActive : styles.tabInactive}`}
          >
            Reviews
          </button>
        </section>

    
        <div className={styles.bottomGrid}>
          <div className={styles.leftColumn}>
            {activeTab === 'features' ? (
              <div className={styles.featuresCard}>
                <div className={styles.badgesList}>
                  <span className={styles.badge}>⚙️ {camper.transmission}</span>
                  <span className={styles.badge}>⛽️ {camper.engine}</span>
                  {camper.AC && <span className={styles.badge}>💨 AC</span>}
                  {camper.kitchen && <span className={styles.badge}>🍳 Kitchen</span>}
                  {camper.radio && <span className={styles.badge}>📻 Radio</span>}
                  {camper.bathroom && <span className={styles.badge}>🚿 Bathroom</span>}
                </div>

                <div>
                  <h3 className={styles.detailsTitle}>Vehicle details</h3>
                  <div className={styles.detailsList}>
                    <div className={styles.detailsRow}><span>Form</span><span className={styles.detailsValue}>{formatForm(camper.form)}</span></div>
                    <div className={styles.detailsRow}><span>Length</span><span className={styles.detailsValue}>{camper.length}</span></div>
                    <div className={styles.detailsRow}><span>Width</span><span className={styles.detailsValue}>{camper.width}</span></div>
                    <div className={styles.detailsRow}><span>Height</span><span className={styles.detailsValue}>{camper.height}</span></div>
                    <div className={styles.detailsRow}><span>Tank</span><span className={styles.detailsValue}>{camper.tank}</span></div>
                    <div className={styles.detailsRow}><span>Consumption</span><span className={styles.detailsValue}>{camper.consumption}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.reviewsList}>
                {camper.reviews?.map((r, i) => (
                  <div key={i} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>{r.reviewer_name[0].toUpperCase()}</div>
                      <div>
                        <p className={styles.reviewerName}>{r.reviewer_name}</p>
                        {renderStars(r.reviewer_rating)}
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

         
          <div className={styles.bookingFormCard}>
            <h2 className={styles.formTitle}>Book your campervan now</h2>
            <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>
            
            <form className={styles.formFields} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Name*"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Email*"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>


              <button type="button" onClick={handleBooking} className={styles.submitButton}>
                Send
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}