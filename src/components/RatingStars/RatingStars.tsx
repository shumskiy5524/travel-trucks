import styles from './RatingStars.module.css';

type Props = {
  rating: number;
};

export default function RatingStars({ rating }: Props) {
  return (
    <div className={styles.starsWrapper}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>
          {i < Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}