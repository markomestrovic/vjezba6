# HCI-vježbe-2022-2023

## Vježba 3: Styling in React and Layouts

Za početak, naslanjamo se na prošlu vježbu te ćemo pokušati smanjiti duplikaciju koda još malo koristeći **Layout component**. Nakon toga ćemo poraditi na navigacijskog traci i dodati highlight za trenutnu stranicu. Za to će nam trebati _styling_.

Pokazat ćemo nekoliko načina stiliziranja komponenti u React-u. Osnovni princip je isti kao i kod običnih HTML stranica; HTML je sadržaj i struktura, a CSS "šminka".

Za stiliziranje u React-u postoji više pristupa:

-   CSS
    -   Modules
    -   Global (Vanilla ili BEM)
-   CSS in JS
    -   Styled components
    -   `style` property
    -   Generated ClassNames
-   No CSS, Utility classes
    -   **Tailwind / Bootstrap i slično**

Referenca: https://jsramblings.com/understand-the-react-styling-paradigms/

Toplo preporučamo SASS (SCSS) za one koji se odluče na CSS pristup.
https://sass-lang.com/

Naši materijali za CSS:  
https://github.com/kula124/HCi_2020_Fresh/tree/bonus--sytling-and-css

Kao i prije, vježba se radi u koracima po commitovima. Ovaj put ćemo smanjiti veličinu commitova što znači da ćemo commitati češće, što je i poželjno u praksi i omogućit će nam da se lakše pratimo za vrijeme vježbi.

## Commit 1: Create new About Us page

Stvaramo novi page unutar `pages` foldera i nazivamo ga `about.js`.

```jsx
const About = () => (
    <div>
        <h1>About</h1>
    </div>
);

export default About;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Create about page"`

## Commit 2: Add Header and Footer to about page

Da ne bismo imali totalno prazan page, dodajmo gotove _Header_ i _Footer_ komponente kroz import.

```jsx
import Header from "../components/Header";
import Footer from "../components/Footer";


const About = () => (
  <Header />
  <main>
    <h1>About</h1>
  </main>
  <Footer />
);

export default About;
```

Kod iznad ne radi. Razlog je taj što React komponenta može vratiti samo jedan top level element, a ovdje su tri (Header, main, Footer). Ključna riječ je _**top-level**_, što znači ako ih sve zamotamo u npr. `div` ili `main` onda imamo jedan top-level što je dopušteno.

```jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => (
    <div> // <--- top level element
        <Header />
        <main>
            <h1>About</h1>
        </main>
        <Footer />
    </div>
);

export default About;
```

Međutim, na ovaj način dodajemo novi `div` tag što može poremetiti naše CSS selektore u nekim slučajevima i dodaje nepotreban HTML tag u DOM. React nam daje prazan tag koji se zove **_React Fragment_** baš za ovaj use-case:

```jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => (
    <> // <--- top level Fragment element
        <Header />
        <main>
            <h1>About</h1>
        </main>
        <Footer />
    </>
);

export default About;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Header and Footer to about page"`

## Commit 3: Create Layout component

Primijetimo da na novoj stranici i na Home stranici radimo import za _Header_ i _Footer_. To je isto nepotrebna duplikacija koda što možemo popraviti. Želimo postići da se Header i Footer pojave iznad i ispod nekog danog sadržaja. Ponekad želimo i Sidebar, Comments Section i slično na svim svojim stranicama što znači da dupliciramo kod. Komponenta koja rješava taj problem zove se **Layout** komponenta.

Stvaramo novi folder kojeg nazivamo `Layouts` i unutar novi file kojeg zovemo `HeaderFooterLayout.js`.

```jsx
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const HeaderFooterLayout = ({ children, ...rest }) => {
    return (
        <>
            <Header />
            <main {...rest}>{children}</main>
            <Footer />
        </>
    );
};

export default HeaderFooterLayout;
```

Primijetimo da je pattern isti kao za `about.js` page, ali umjesto sadržaja stranice nalazi se `children` prop. Children može biti bilo koji sadržaj što znači da je ova komponenta sad **reuseable**.

> ℹ️ `children` je poseban prop u React-u koji označava sadržaj unutar komponente ili u HTML-u sadržaj unutar HTML taga.

Primjer:

```html
<section id="comments-section">
    <h3>View comments</h3>
    <ul id="comments-list">
        <li class="comment-post">
            <p>This is a comment</p>
        </li>
        <li class="comment-post">
            <p>This is a also a comment</p>
        </li>
        . . .
    </ul>
</section>
```

Sve unutar `comment-section` taga je njegov _children_ ,znači _h3_ i _ul_. To onda znači da su _h3_ i _ul_ **siblings**.
To, također, znači da je text `"View comments"` children od _h3_, a komentari (`<li>`) su children od _ul_. Svi _li_ elementi su također i **siblings**.

U _React-u_ to bi bilo ovako nešto:

```JSX
<GenericContainer direction='column' justify='center'>
    <CommentsList title='View comments' comments={arrayOfComments} />
</GenericContainer>
```

`GenericContainer` komponenta je samo container koji prima sadržaj kao parametar. U ovom slučaju prima drugu komponentu koja se zove `CommentsList`.Znači da je `CommentsList` njen **children** prop. Međutim, prima i druge parametre: `direction` i `justify`. Znači da bi njen potpis bio ovo:

```jsx
const GenericContainer = ({
    children,
    direction,
    justify,
    josNekiParamMozda,
    ...rest,
}) => (...);
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Create Layout component"`

## Commit 4: Use Layout

Mijenjamo `home.js` i `about.js` tako da koriste `Layout`.

```jsx
// pages/home.js
import CTA from '../components/CTA.js';
import Testimonials from '../components/Testimonials.js';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout.js';

const Home = () => {
    return (
        <>
            <HeaderFooterLayout>
                <CTA />
                <Testimonials />
            </HeaderFooterLayout>
        </>
    );
};

export default Home;
```

```jsx
// pages/about.js
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const About = () => (
    <HeaderFooterLayout>
        <main>
            <h1>About</h1>
        </main>
    </HeaderFooterLayout>
);

export default About;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Use Layout component"`

## Commit 5: Add /about to navigation items

Unutar `constants/navbar.js` datoteke imamo niz navigacijskih linkova. Za svaki od njih definirana su dva polja:

-   `label`: Ono što vidimo na stranici
-   `path`: URL slug (putanja) na kojoj se nalaze

Za početak, dodajmo novu putanju za `/about` page.

```jsx
export const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'About us', path: '/about' },
    { label: 'Showcase', path: '' },
    { label: 'Blog', path: '' },
    { label: 'Contact', path: '' },
    { label: 'Sign in', path: '' },
];
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Add /about to navigation items"`

## Commit 6: Style active navigation item

Želimo posebno označiti trenutno selektiran navigacijski tab. Unutar `Navbar.js` datoteke vidimo sljedeći kod:

```jsx
import { useRouter } from 'next/router';
// ...
const router = useRouter();
const currentPage = router.pathname;
```

Koristeći `next/router` dohvaćamo trenutni page. Za `home.js` page to će biti `/home`, a za `about.js` bit će `/about`

Želimo primijeniti CSS stil na onaj koji je trenutno aktivan i želimo da se to događa dinamički.

Vidimo poznatu `.map()` funkciju koja ide kroz niz svih navigacijskih tabova i stvara `<li>` elemente.  
Unutar te funkcije trebamo napraviti provjeru:

-   Ako je `path` polje trenutnog elementa niza jednako trenutnoj stranici (`currentPage`) onda prikažemo drugačiji CSS
-   Ako nije vraćamo `<li>` kao prije.

Rješenje je ispod:

<details>
<summary>Solution 1</summary>

```jsx
import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label, path }) => {
                if (currentPage === path)
                    return (
                        <li
                            key={label}
                            className="px-5 py-2 whitespace-nowrap text-hci-lila-light bg-hci-lila bg-opacity-60 hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer"
                        >
                            {label}
                        </li>
                    );

                return (
                    <li
                        key={label}
                        className="px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer"
                    >
                        {label}
                    </li>
                );
            })}
        </nav>
    );
};

export default NavBar;
```

</details>

Umjesto da imamo dva puta `return` možemo i pomoću varijable:

<details>
<summary>Solution 2</summary>

```jsx
import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label, path }) => {
                const activeClasses =
                    currentPage === path
                        ? 'text-hci-lila-light bg-hci-lila bg-opacity-60'
                        : '';

                return (
                    <li
                        key={label}
                        className={`px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer ${activeClasses}`}
                    >
                        {label}
                    </li>
                );
            })}
        </nav>
    );
};

export default NavBar;
```

</details>

Ili još kraće, ternarnim operatorom unutar samog stringa čime izbjegavamo varijablu i return:

<details>
<summary>Solution 3</summary>

```jsx
import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label, path }) => (
                <li
                    key={label}
                    className={`px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer ${
                        currentPage === path
                            ? 'text-hci-lila-light bg-hci-lila bg-opacity-60'
                            : ''
                    }`}
                >
                    {label}
                </li>
            ))}
        </nav>
    );
};

export default NavBar;
```

</details>

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Style active navbar item"`

## Commit 7: Add new CSS file

Dodajemo sadržaj u `about.js`.  
Stvorimo novi file `styles/about.css` za CSS kod i pokušajmo ga import u `about.js`:

```jsx
// pages/about.js
import '../styles/about.css';
```

I imamo error u konzoli:

```
error - ./styles/about.css
Global CSS cannot be imported from files other than your Custom <App>. Due to the Global nature of stylesheets, and to avoid conflicts, Please move all first-party global CSS imports to pages/_app.js. Or convert the import to Component-Level CSS (CSS Modules).
Read more: https://nextjs.org/docs/messages/css-global
Location: pages/about.js
```

Izbrišimo taj import!

Da bismo koristili **globalni** CSS moramo ga importati u globalni (root) file, a to je `_app.js`.

```jsx
// _app.js
import '../styles/globals.css';
import '../styles/about.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Style active navbar item"`

## Commit 8: Add about content

Dodajmo sadržaj

<details>
<summary>about.js</summary>

```jsx
import Image from 'next/image';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const About = () => (
    <HeaderFooterLayout>
        <main className="container">
            <section className="description">
                <h1 className="title">About</h1>
                <p className="text">
                    We are software developers, designers, and entrepreneurs who are
                    passionate about building products that make a difference in
                    peoples lives. We are a team of 5 people based in the United
                    States and Canada. We use React and NextJS to build our web
                    applications.
                </p>
                <button className="learn-more-button">
                    <a href="https://nextjs.org/">Learn more</a>
                </button>
            </section>
            <section className="image">
                <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                    src="/about-us.png"
                    alt="about us image"
                    className="about-us-img"
                />
            </section>
        </main>
    </HeaderFooterLayout>
);

export default About;
```

</details>

<details>
<summary>styles/about.css</summary>

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    padding-right: 0;
    max-width: unset;
}

.container .title {
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0;
}

.container .description {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container .description .learn-more-button {
    display: inline-block;
    padding: 16px 32px;
    background-color: blueviolet;
    color: white;
    width: 50%;
    border-radius: 16px;
    cursor: pointer;
    margin-top: 32px;
}

.container .description .learn-more-button:hover {
    background-color: purple;
}

.image {
    position: relative;
    height: 100%;
    width: 50%;
    object-fit: contain;
}
```

</details>

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Add about content"`

## Commit 9: CSS modules

Ako dodamo `.container` selektor u bilo koji drugi file možemo neželjeno utjecati na izgled `pages/about.js` jer koristimo `.container` tamo. Zapravo, _Tailwind_ već utječe na .container tako što stavlja `max-width`. Probajte izbrisati liniju 7 u `styles/about.css`. Ili, da bude očitije, dodajmo

```css
// styles/global

.container {
    background-color: red;
}
```

Trebali bi promijeniti ime u `.about-container` ili nešto slično. Tako isto bi trebali raditi i za svaki drugi page te za svaku komponentu.

Međutim činjenica je da s rastom projekta raste i broj klasa, a time i šansa da se neka klasa ponovi. Bilo bi super kad bi nazivi klasa u različitim datotekama mogli uvijek biti unikatni (bez kolizije) ako znamo da će se primijeniti na samo jednu React komponentu.

To se može napraviti s **CSS Modulima.**  
Pretvorimo about.css u modul tako da promijenimo naziv u `about.module.css`

> ℹ️ .module. je rezervirana riječ u nazivu datoteke za CSS module. To daje do znanja Reactu da taj file nije globalan. Ako toga nema, onda je globalan.

Za korištenje modula potrebno je ispraviti import i importati objekt iz CSS filea. Umjesto stringova, koristimo polja iz tog objekta za nazive klasa.

```jsx
import Image from 'next/image';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

import styles from '/styles/about.module.css';

const About = () => (
    <HeaderFooterLayout>
        <main className={styles.container}>
            <section className={styles.description}>
                <h1 className={styles.title}>About</h1>
                <p className={styles.text}>
                    We are software developers, designers, and entrepreneurs who are
                    passionate about building products that make a difference in
                    peoples lives. We are a team of 5 people based in the United
                    States and Canada. We use React and NextJS to build our web
                    applications.
                </p>
                <button className={styles['learn-more-button']}>
                    <a href="https://nextjs.org/">Learn more</a>
                </button>
            </section>
            <section className={styles.image}>
                <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="cover"
                    src="/about-us.png"
                    alt="about us image"
                    className="about-us-img"
                />
            </section>
        </main>
    </HeaderFooterLayout>
);

export default About;
```

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: About CSS module"`

## Commit 10: Responsive about page

Ako je ekran uređaja premalen da prikaže sadržaj, onda ga želimo smanjiti ili pretvoriti retke u stupce i sl. Recimo, ako je ekran manji od 768px onda neka `flex-direction` bude `column`, neka padding bude 16px umjesto 32px i sl. Upravo tako se i radi responzivnost na Webu. API za to daje nam **@media query**.

```css
@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
        padding: 16px;
    }

    .container .description {
        width: 100%;
        margin-top: 32px;
    }

    .container .description .learn-more-button {
        width: 100%;
    }

    .image {
        width: 100%;
    }
}
```

U prijevodu, ako je širina ekrana manja od 768px (tj. do maksimalno 768px) onda primijeni sljedeće stilove.

Dodajmo taj kod na kraj `/styles/about.module.css` datoteke.

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Responsive about page"`

## Commit 11: Responsive Footer

Tailwind responsivness je jednostavnan:  
https://tailwindcss.com/docs/responsive-design

Ide mobile first znači da su sve klase za mobile i onda dodajemo breakpoint sa npr. `md:` ili `xl:` i sl.

Pogledajte docs. Jedan jednostavan primjer je `Footer.js`.

Dodajmo padding od 16px za large screen i 8px za manji od `:md` što je 768px.

Linija 6:

```jsx
...
 <main className="max-w-4xl flex flex-col mx-auto p-8 md:p-16">
 ...
```

Sakrijmo formu za mobitele. Linija 40:

```jsx
<div className="hidden md:block">
```

Gotov file:

```jsx
import Image from 'next/image';
import LogoImg from '../assets/logo.png';

const Footer = () => (
    <section className="py-12 bg-hci-lila-dark text-hci-lila-light">
        <main className="max-w-4xl flex flex-col mx-auto p-8 md:p-4">
            <div className="flex items-start justify-between">
                <div>
                    <Image
                        src={LogoImg}
                        layout="fixed"
                        width={50}
                        height={50}
                        alt="Design logo"
                    />
                    <div className="mt-8">
                        <div className="flex items-center">
                            <Image
                                src={'/phone.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Phone icon"
                            />
                            <p className="ml-4">+385 123 0000</p>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src={'/email.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Email icon"
                            />
                            <p className="ml-4">design@fesb.hr</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <h3 className="capitalize text-3xl font-roboto-condensed font-bold text-white">
                        Contact us
                    </h3>
                    <h4 className="text-xl">Drop us a quick message</h4>
                    <div className="mt-2 flex flex-col text-hci-lila-dark">
                        <input
                            className="mt-4 p-2 w-4/5 opacity-80"
                            placeholder="Your Name"
                            type="text"
                        />
                        <input
                            className="mt-4 p-2 w-4/5 opacity-80"
                            placeholder="Your E-mail"
                            type="text"
                        />
                        <textarea
                            className="mt-4 p-2 resize-none opacity-80"
                            placeholder="Your Message"
                            cols="30"
                            rows="8"
                        ></textarea>
                    </div>
                </div>

                <div>
                    <h3 className="capitalize text-3xl font-roboto-condensed font-bold text-white">
                        Sitemap
                    </h3>
                    <h4 className="text-xl">Explore our pages</h4>
                    <ul className="mt-4 list-none font-medium text-white">
                        <li className="whitespace-nowrap cursor-pointer">Home</li>
                        <li className="whitespace-nowrap cursor-pointer mt-1">
                            About us
                        </li>
                        <li className="whitespace-nowrap cursor-pointer mt-1">
                            Products
                        </li>
                        <li className="whitespace-nowrap cursor-pointer mt-1">
                            Blog
                        </li>
                        <li className="whitespace-nowrap cursor-pointer mt-1">
                            Contact us
                        </li>
                        <li className="whitespace-nowrap cursor-pointer mt-1">
                            Private
                        </li>
                    </ul>
                </div>
            </div>
            <p className="mt-12">Copyright @ 2021 FESB. All rights reserved.</p>
        </main>
    </section>
);

export default Footer;
```

Za pune primjere responzivnosti u Tailwindu pogledajte našu gotovu implementaciju:

https://github.com/mcagalj/next-course-app

> ✅ Commit  
> `git add .`  
> `git commit -m "Vjezba 3: Responsive Footer"`
