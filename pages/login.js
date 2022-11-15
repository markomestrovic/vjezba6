import { useEffect, useState } from 'react';

import Spinner from '../components/Spinner';
import { safeLocalStorage } from '../helpers';

import styles from '../styles/login.module.scss';

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
    },
    {
        id: 2,
        username: 'user',
        password: 'user',
        name: 'User',
        email: 'user@example.com',
    },
];

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(safeLocalStorage.getItem('isLoggedIn') === 'true');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            const user = users.find(
                (user) => user.username === email && user.password === password
            );
            if (user) {
                setError('');
                setLoading(false);
                alert('Login successful!');
                setIsLoggedIn(true);
                safeLocalStorage.setItem('isLoggedIn', true);
                safeLocalStorage.setItem('user', JSON.stringify(user));
            } else {
                setError('Invalid credentials');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <main className={styles.page}>
            <section className={styles.content}>
                <h1 className={styles.title}>
                    {isLoggedIn ? 'You are logged in!' : 'Log in'}
                </h1>
                {!isLoggedIn && (
                    <section className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input
                                value={email}
                                type="email"
                                id="email"
                                className={styles.emailInput}
                                placeholder="Email or username"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <input
                                value={password}
                                type="password"
                                id="password"
                                placeholder="Password"
                                className={styles.passwordInput}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className={styles.submitButton}
                            >
                                Login
                            </button>
                        )}
                    </section>
                )}
                {error && <p className={styles.error}>{error}</p>}
                {isLoggedIn && (
                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                            safeLocalStorage.removeItem('isLoggedIn');
                            safeLocalStorage.removeItem('user');
                        }}
                        className={styles.submitButton}
                    >
                        Logout
                    </button>
                )}
            </section>
        </main>
    );
};

export default Login;
