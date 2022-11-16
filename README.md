# HCI-vježbe-2022-2023

## Vježba 5: Login and hooks

U prethodnim vježbama upoznali smo React state, čemu služi i koje vrste state-a postoje. Naučili smo manipulirati state-om za stvaranje interaktivne aplikacije. Danas idemo još jedan korak dalje i implementiramo Login proces.

Za seminarske radove Login nije neophodan, ali potičemo studente da ga pokušaju implementirati zbog iskustva.

Prvo radimo mockup implementaciju i nakon toga radimo pravu implementaciju koristeći JWT token.

### Commit 1: Implement mock login logic

Dan nam je početni kod u `/pages/login`. Koristeći znanje o state-u probajmo završiti kod. Potrebno je implementirati `hanleSubmit` funkciju:

-   Kad login process krene stavljamo loading na `true`
-   Provjeravamo postoji li korisnik
-   Ako korisnik postoji login je uspješan
-   U suprotnom stavljamo error poruku
-   Login na `false`

Koristimo `setTimeout` da dočaramo Loading

```jsx
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
        } else {
            setError('Invalid credentials');
            setLoading(false);
        }
    }, 1000);
};
```

### Commit 2: Store login state [WIP]

Nakon što se korisnik logira želimo spremiti činjenicu da je logiran i prikazati poruku:

-   Stvaramo novi state `isLoggedIn`
-   Ako je `true` korisnik je logiran i pokažemo poruku

```jsx
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            </section>
        </main>
    );
};
```

Čini se da radi. Što se dogodi kad napravimo refresh?

Kako to riješiti?

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Store login state"`

### Commit 2: Actually store loggedIn state [WIP]

React state je **ephemeral** što je cool grčka riječ za kratkotrajan tj. živi u memoriji. Da bi se sačuvao kroz refresh, treba trajno spremište: browser storage.

Browser nam daje API za trajno spremanje stvari:
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

To je key-value-par store koji prima samo jednostavne vrijednosti. Znači da ako želimo spremiti objekt treba ga spremiti kao JSON. Međutim, nama je dovoljan _bool_.

Ako je login uspješan spremamo ključ `isLoggedIn` kao `true`.

Trebamo:

-   Nakon logina staviti `localStorage.isLoggedin` na `true`
-   Na početku povući `loggedIn` iz LS kao početnu vrijednost

```jsx
...
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
...

if (user) {
    setError('');
    setLoading(false);
    alert('Login successful!');
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
}
```

I sad imamo error:

```
ReferenceError: localStorage is not defined
```

Razlog ovog je **NextJS**

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Actually store loggedIn state [WIP]"`

### Commit 3: Actually store loggedIn state fixed

Sljedeći link objašnjava što se događa.

https://developer.school/snippets/react/localstorage-is-not-defined-nextjs

NextJS je server side rendering framework. Budući da server nije browser, a localStorage je browser API onda je logično da localStorage ne postoji dok se izvršava serverski dio koda.

Jednom kad se aplikacija učita i dođe do klijenta, `localStorage` postoji. Kao što link kaže, postoje dva pristupa:

-   Provjerimo jesmo li na serveru tako što provjerimo postoji li `window` što je browser object tj. `typeof window !== 'undefined'`
-   Čekamo da aplikacija dođe do klijenta. Znamo da je aplikacija na klijentu ako se dogodi `React mount event`. Funkcija `useEffect` se tad pozove.

Mi ćemo napraviti oboje.

```jsx
const safeLocalStorage = {
    getItem: (key) => typeof window !== 'undefined' && localStorage.getItem(key),
    setItem: (key, value) =>
        typeof window !== 'undefined' && localStorage.setItem(key, value),
    removeItem: (key) =>
        typeof window !== 'undefined' && localStorage.removeItem(key),
};

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
            </section>
        </main>
    );
};
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Actually store loggedIn state fixed"`

### Commit 4: Add logout button and create helper file

Dodat ćemo logout button:

```jsx
{
    isLoggedIn && (
        <button
            onClick={() => {
                setIsLoggedIn(false);
                safeLocalStorage.removeItem('isLoggedIn');
            }}
            className={styles.submitButton}
        >
            Logout
        </button>
    );
}
```

I novi file gdje ćemo maknuti `safeLocalStorage`.  
Stvaramo `helpers.js` u rootu:

```jsx
export const safeLocalStorage = {
    getItem: (key) => typeof window !== 'undefined' && localStorage.getItem(key),
    setItem: (key, value) =>
        typeof window !== 'undefined' && localStorage.setItem(key, value),
    removeItem: (key) =>
        typeof window !== 'undefined' && localStorage.removeItem(key),
};
```

Napravimo i import u `login.js`.

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Add logout button and create helper file"`

### Commit 5: Save object with boolean

Iako smo logirani, `/self` page nam ne dopušta pristup. Razlog je taj što `/self` traži objekt `user` u _localStorageu_. Dodajmo ga.

> Local storage ne može direktno spremiti object. Potrebno ga je prvo serijalizirati u JSON.

```jsx
if (user) {
    setError('');
    setLoading(false);
    alert('Login successful!');
    setIsLoggedIn(true);
    safeLocalStorage.setItem('isLoggedIn', true);
    safeLocalStorage.setItem('user', JSON.stringify(user));
}
...

onClick={() => {
    setIsLoggedIn(false);
    safeLocalStorage.removeItem('isLoggedIn');
    safeLocalStorage.removeItem('user');
}}
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Save object with boolean"`

### Commit 6: Do the real login

Što se tiče potreba seminarskog rada mock login je dovoljan. U nastavku je dan pravi login implementiran pomoću JWT tokena.

JWT je **Json Web Token** i koristi se za login. Za razliku od **session cookiea**, JWT ne traži pohranu ičega u bazi podataka. **JWT** je objekt koji sadrži JSON podatke po našem izboru. Ono što je tu bitno je da:

-   JWT stvara, puni i potpisuje server
-   JWT ima expire time
-   JWT je nepromjenjiv što znači da može sadržavati podatke o korisniku-najčešće to bude id
-   JWT je dan clientu
-   Server ne može poništiti JWT (može ga samo blacklistat)

Login proces je sljedeći:

1. Klijent zove `/login` API rutu i šalje email password combo
2. Server provjerava validnost podataka i zahtjeva
3. Ako je sve ok, server stvara JWT i šalje ga klijentu
4. Klijent sad može pristupiti zaštićenim resursima koristeći JWT kao propusnicu (u našem primjeru `/self` rutu)
5. Server može znati koji korisnik radi zahtjev tako da pročita JWT
6. Bilo kakva modifikacija JWT-a učinit će token nevažećim što će server lako detektirati

U `api.js` fileu imamo spreman REST client, a u `pages/api/login.js` logiku koja radi login.

Trebamo samo zamjeniti mock logiku sa pravom:

```jsx
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
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Do the real login"`

### Commit 7: Rework self page

Budući da se user više ne sprema, potrebno je dohvatiti usera koristeći token.

Odgovor servera na `api/self` ruti je user čiji token šaljemo. Znači samo da umjesto da uzimamo usera iz _localStoragea_ uzimamo ga sa servera.

```jsx
const Self = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        api.self(token).then(({ user }) => {
            setLoading(false);
            setCurrentUser(user);
        });
    }, []);

    if (loading) {
        return null;
    }

    if (!isLoggedIn || !currentUser) {
        return (...)
    }
}
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Rework self page"`

### Commit 8: Create useAuth hook

Vidimo da ponavljamo dosta logike vezano za token. Možemo to izvući u zasebnu funkciju koja sprema state. Takva funkcija se zove **React Hook**.

React Hook uvijek počinje s `use`. Znači da `useEffect` i `useState` su hook funkcije. Sada ćemo stvoriti svoju.

Cilj je:

-   Da funkcija odradi dohvaćanje tokena
-   Ako token postoji onda ga i vrati
-   Vraća nam i funkciju za poništavanje tokena i za postavljanje tokena (dakle 3 stvari)

Stvaramo `hooks` folder i file koji ćemo nazvati `useAuth.js`:

```jsx
// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { safeLocalStorage } from '../helpers';

const useAuth = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(safeLocalStorage.getItem('token'));
    }, []);

    const setAuth = (token) => {
        safeLocalStorage.setItem('token', token);
        setToken(token);
    };

    const removeAuth = () => {
        safeLocalStorage.removeItem('token');
        setToken(null);
    };

    return { token, setAuth, removeAuth };
};

export default useAuth;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Create useAuth hook"`

### Commit 9: Use the new hook

Možemo zamijeniti svu logiku vezanu za login u `login.js` i `self.js` .

Login:

```jsx
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
```

Self:

```jsx
import { useEffect, useState } from 'react';

import Link from 'next/link';
import api from '../api';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import useAuth from '../hooks/useAuth';

const Self = () => {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        api.self(token).then(({ user }) => {
            setLoading(false);
            setCurrentUser(user);
        });
    }, [token]);

    if (loading) {
        return null;
    }

    if (!token || !currentUser) {
        return (...)
    }
}
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Use the new hook"`

### Commit 9: Use the new hook in navigation

Recimo da ne želimo prikazati `Me` ako korisnik nije logiran. Možemo ubaciti novi property u `const` koji govori da je rute protected i onda koristeći hook napraviti usporedbu.

Dva koraka!

Prvi:

```jsx
export const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'About us', path: '/about' },
    { label: 'State Showcase', path: '/state' },
    { label: 'Blog', path: '' },
    { label: 'Sign in', path: '/login' },
    { label: 'Me', path: '/self', needsAuth: true },
];
```

Drugi:

```jsx
import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    const { token } = useAuth();

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label, path, needsAuth }) =>
                needsAuth && !token ? null : (
                    <Link href={path} key={label} passHref>
                        <li
                            key={label}
                            className={`px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer ${
                                currentPage === path
                                    ? 'text-hci-lila-light bg-hci-lila bg-opacity-60'
                                    : ''
                            }`}
                        >
                            {path === '/login' && token ? 'Logout' : label}
                        </li>
                    </Link>
                )
            )}
        </nav>
    );
};

export default NavBar;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 5: Use the new hook in navigation"`
