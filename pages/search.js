import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const { getBooks } = require('../lib/bookUtils');
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

export default function Search({ initialSearchResults, initialQuery }) {
    const router = useRouter();
    const { q } = router.query;
    const [searchResults, setSearchResults] = useState(initialSearchResults);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchSearchHistory = async () => {
            try {
                const token = localStorage.getItem('token') || 'dummy-token';
                const response = await axios.get('/api/user/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (isMounted) {
                    const uniqueHistory = [...new Set(response.data.map(item => item.query))];
                    setRecentSearches(uniqueHistory);
                }
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        const addSearchToHistory = async () => {
            if (q) {
                try {
                    const token = localStorage.getItem('token') || 'dummy-token';
                    await axios.post('/api/user/history', 
                        { query: q }, 
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } catch (error) {
                    console.error('Error adding search to history:', error);
                }
            }
        };

        if (typeof window !== 'undefined') {
            if (q) {
                addSearchToHistory();
            }
            fetchSearchHistory();
        }

        return () => {
            isMounted = false;
        };
    }, [q]);

    const handleRecentSearch = (search) => {
        router.push(`/search?q=${encodeURIComponent(search)}`, undefined, { shallow: false });
    };

    useEffect(() => {
        if (q && initialSearchResults) {
            const filteredBooks = initialSearchResults.filter(book =>
                book.title.toLowerCase().includes(q.toLowerCase())
            );
            setSearchResults(filteredBooks);
        }
    }, [q, initialSearchResults]);

    return (
        <Layout>
            <h1>Search Results for {q || initialQuery}</h1>
            {recentSearches.length > 0 && (
                <div>
                    <h2>Recent Searches</h2>
                    <ul>
                        {recentSearches.map((search, index) => (
                            <li key={index}>
                                <button onClick={() => handleRecentSearch(search)}>{search}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map(book => (
                        <li key={book.id}>
                            <BookCard {...book} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found for {q || initialQuery}. Please try a different search term.</p>
            )}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { q } = context.query;
    const allBooks = await getBooks();
  
    const filteredBooks = q
      ? allBooks.filter(book =>
          book.title.toLowerCase().includes(q.toLowerCase())
        )
      : [];
  
    return {
      props: {
        initialSearchResults: filteredBooks,
        initialQuery: q || '',
      },
    };
}