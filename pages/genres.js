import { getGenres } from "../lib/bookUtils";
import Link from 'next/link';
import Layout from "../components/Layout";
import styles from '../styles/Layout.module.css';
export default function Genres({ genres }) {
    return (
        <Layout>
            <h1>Book Genres</h1>
            <div className={styles.cardGrid}>
                {genres.map((genre) => (
                    <div key={genre.id} className={styles.card}>
                        <Link href={`/books?genre=${genre.id}`} className={styles.cardLink}>
                            {genre.name}
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const genres = await getGenres();
    return {
        props: {
            genres,
        },
    };
}