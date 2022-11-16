import { useState } from 'react';
import { useRouter } from 'next/router';

import Spinner from '../components/Spinner';
import api from '../api';

import styles from '../styles/login.module.scss';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { removeAuth, setAuth, token } = useAuth();
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        await api
            .login(email, password)
            .then(({ token }) => {
                setError('');
                setAuth(token);
                router.push('/home');
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
                    {token ? 'You are logged in!' : 'Log in'}
                </h1>
                {!token && (
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
                {token && (
                    <button
                        onClick={() => {
                            removeAuth();
                            router.push('/home');
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
