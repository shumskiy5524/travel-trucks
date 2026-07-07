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

interface Props {
  camper: Camper | null;
}

export default function CamperDetails({ camper }: Props) {
  if (!camper) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Верхняя часть */}
      <section className={styles.topSection}>
        {/* Левая колонка */}
        <div className={styles.leftSide}>
          <div className={styles.mainImage}>
            <Image
              src={camper.gallery[0]}
              alt={camper.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.thumbsGrid}>
            {camper.gallery.slice(1, 5).map((img, index) => (
              <div className={styles.thumb} key={index}>
                <Image
                  src={img}
                  alt={`photo-${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка */}
        <div className={styles.infoCard}>
          <h1 className={styles.title}>{camper.name}</h1>

          <div className={styles.metaInfo}>
            <span>
              ★ {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>

            <span>📍 {camper.location}</span>
          </div>

          <div className={styles.price}>
            €{camper.price.toFixed(2)}
          </div>

          <p className={styles.description}>
            {camper.description}
          </p>

          <h2>Vehicle details</h2>

          <ul className={styles.tags}>
            <li>{camper.transmission}</li>

            {camper.AC && <li>AC</li>}

            <li>{camper.engine}</li>

            {camper.kitchen && <li>Kitchen</li>}

            <li>{camper.form}</li>
          </ul>

          <ul className={styles.detailsList}>
            <li>
              <span>Form</span>
              <span>{camper.form}</span>
            </li>

            <li>
              <span>Length</span>
              <span>{camper.length}</span>
            </li>

            <li>
              <span>Width</span>
              <span>{camper.width}</span>
            </li>

            <li>
              <span>Height</span>
              <span>{camper.height}</span>
            </li>

            <li>
              <span>Tank</span>
              <span>{camper.tank}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Нижняя часть */}
      <section className={styles.bottomSection}>
        {/* Reviews */}
        <div className={styles.reviewsColumn}>
          <h2>Reviews</h2>

          {camper.reviews?.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <h4>{review.reviewer_name}</h4>

              <div>★ {review.reviewer_rating}</div>

              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Форма */}
        <div className={styles.rightColumn}>
          <div className={styles.formCard}>
            <h3>Book your campervan now</h3>

            <p>Stay connected! We are always ready to help you.</p>

            <form
              className={styles.formFields}
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="text" placeholder="Name*" required />

              <input type="email" placeholder="Email*" required />

              <input type="date" required />

              <button type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}