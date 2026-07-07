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

const [form, setForm] = useState({
  name: '',
  email: '',
});

const [errors, setErrors] = useState({
  name: '',
  email: '',
});
 

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
  const newErrors = {
    name: '',
    email: '',
  };

  let isValid = true;

  if (!form.name.trim()) {
    newErrors.name = 'Please enter your full name.';
    isValid = false;
  }

  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = 'Please enter a valid email address.';
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

  const handleBooking = async () => {
    if (!validateForm()) return;
    try {
      await createBooking(form);
      alert('Booking successful!');
      setForm({
  name: '',
  email: '',
});
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
        
    
        <div className={styles.topGrid}>

  {/* LEFT - GALLERY */}
  <div className={styles.galleryWrapper}>

    <Swiper
      loop={camper.gallery.length > 1}
      spaceBetween={10}
      thumbs={{
        swiper:
          thumbsSwiper && !thumbsSwiper.destroyed
            ? thumbsSwiper
            : null,
      }}
      modules={[FreeMode, Thumbs]}
      className={styles.mainSwiper}
    >
      {camper.gallery.map((img, idx) => (
        <SwiperSlide key={img.id}>
          <div className={styles.imageWrapper}>
            <Image
              src={img.original}
              alt={camper.name}
              fill
              className={styles.image}
              priority={idx === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>


    <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={16}
      slidesPerView={4}
      freeMode
      watchSlidesProgress
      modules={[FreeMode, Thumbs]}
      className={styles.thumbSwiper}
    >
      {camper.gallery.map((img) => (
        <SwiperSlide key={img.id}>
          <div className={styles.thumbImageWrapper}>
            <Image
              src={img.thumb}
              alt=""
              fill
              className={styles.image}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  </div>



  {/* RIGHT - INFO */}
  <div className={styles.infoColumn}>

    <h1 className={styles.title}>
      {camper.name}
    </h1>


    <div className={styles.metaInfo}>

      <div className={styles.ratingWrapper}>
        {renderStars(camper.rating)}

        <span>
          ({camper.reviews?.length || 0} Reviews)
        </span>
      </div>


      <span>
        📍 {camper.location}
      </span>

    </div>


    <p className={styles.price}>
      €{camper.price.toFixed(2)}
    </p>


    <p className={styles.description}>
      {camper.description}
    </p>


    <h3 className={styles.detailsTitle}>
      Vehicle details
    </h3>


    <div className={styles.detailsList}>

      <div className={styles.detailsRow}>
        <span>Form</span>
        <span>{formatForm(camper.form)}</span>
      </div>

      <div className={styles.detailsRow}>
        <span>Length</span>
        <span>{camper.length}</span>
      </div>

      <div className={styles.detailsRow}>
        <span>Width</span>
        <span>{camper.width}</span>
      </div>

      <div className={styles.detailsRow}>
        <span>Height</span>
        <span>{camper.height}</span>
      </div>

      <div className={styles.detailsRow}>
        <span>Tank</span>
        <span>{camper.tank}</span>
      </div>

      <div className={styles.detailsRow}>
        <span>Consumption</span>
        <span>{camper.consumption}</span>
      </div>

    </div>


  </div>

</div>
        <div className={styles.bottomGrid}>

  <div className={styles.leftColumn}>

    <div className={styles.reviewsList}>
      {camper.reviews?.map((r, i) => (
        <div key={i} className={styles.reviewItem}>

          <div className={styles.reviewHeader}>

            <div className={styles.avatar}>
              {r.reviewer_name[0].toUpperCase()}
            </div>

            <div>
              <p className={styles.reviewerName}>
                {r.reviewer_name}
              </p>

              {renderStars(r.reviewer_rating)}
            </div>

          </div>

          <p className={styles.reviewComment}>
            {r.comment}
          </p>

        </div>
      ))}
    </div>

  </div>


  <div className={styles.bookingFormCard}>

    <h2 className={styles.formTitle}>
      Book your campervan now
    </h2>

    <p className={styles.formSubtitle}>
      Stay connected! We are always ready to help you.
    </p>


    <form
      className={styles.formFields}
      onSubmit={(e) => e.preventDefault()}
    >

      <div className={styles.inputWrapper}>
        <input
  placeholder="Name*"
  value={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value
    })
  }
  className={styles.inputField}
/>

{errors.name && (
  <span className={styles.errorText}>
    {errors.name}
  </span>
)}
      </div>


      <div className={styles.inputWrapper}>
        <input
  type="email"
  placeholder="Email*"
  value={form.email}
  onChange={(e) =>
    setForm({
      ...form,
      email: e.target.value
    })
  }
  className={styles.inputField}
/>

{errors.email && (
  <span className={styles.errorText}>
    {errors.email}
  </span>
)}
      </div>


      <button
        type="button"
        onClick={handleBooking}
        className={styles.submitButton}
      >
        Send
      </button>


    </form>

  </div>


</div>
          </div>

        </div>

  );
}