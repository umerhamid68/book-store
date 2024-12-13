//import Link from 'next/link';

// export default function BookCard({ id, title, authorId, description, price, genreId, rating }) {
//   return (
//     <div className="book-card">
//       <h2>{title}</h2>
//       <p><strong>Author:</strong> {authorId}</p>
//       <p><strong>Description:</strong> {description}</p>
//       <p><strong>Price:</strong> ${price}</p>
//       <p><strong>Genre:</strong> {genreId}</p>
//       <p><strong>Rating:</strong> {rating}</p>
//       <Link href={`/books/${id}`}>
//         <button>View Details</button>
//       </Link>
//     </div>
//   );
// }



import Link from 'next/link';
import styles from '../styles/BookCard.module.css';

export default function BookCard({ id, title, authorId, description, price, genreId, rating }) {
  return (
    <div className={styles.bookCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.rating}>★ {rating}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.metaInfo}>
          <p><strong>Author:</strong> <Link href={`/books/${id}/author`} className={styles.authorLink}>{authorId}</Link> </p>
          <p><strong>Genre:</strong> {genreId}</p>
          <p className={styles.price}>${price}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <Link href={`/books/${id}`} className={styles.detailsButton}>
        View Details
      </Link>
    </div>
  );
}