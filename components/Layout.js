import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Layout.module.css';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';

export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        
        document.body.classList.toggle('dark-mode', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>BookHub</Link>
          
          <div className={styles.navLinks}>
            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <button className={styles.button} onClick={logout}>Logout</button>
              </>
            ) : (
              <Link href="/login" className={styles.button}>Login</Link>
            )}
            <Link href="/">Home</Link>
            <Link href="/genres">Genres</Link>
            <Link href="/books">All Books</Link>
            <Link href="/authors">Authors</Link>
            <Link href="/info">Info</Link>
            
            
          </div>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
            />
            <button type="submit" className={styles.button}>Search</button>
          </form>
          
          <button 
            className={styles.button} 
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        
        <main className={styles.main}>{children}</main>
      </div>
    );
}