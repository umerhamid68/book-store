import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import styles from '../styles/Layout.module.css';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Layout>
      <div className={styles.loginContainer}>
      
      <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1>Login</h1>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      </div>
    </Layout>
  );
}