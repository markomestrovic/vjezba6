import { useEffect, useState } from 'react';

import Spinner from '../components/Spinner';
import api from '../api';

import { safeLocalStorage } from '../helpers';

import styles from '../styles/login.module.scss';

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

        await api
            .login(email, password)
            .then(({ token }) => {
                safeLocalStorage.setItem('token', token);
                safeLocalStorage.setItem('isLoggedIn', true);
                setIsLoggedIn(true);
                setError('');
            })
            .catch((err) => {
                setError(err.message);
            });

        setLoading(false);
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
                            safeLocalStorage.removeItem('token');
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
