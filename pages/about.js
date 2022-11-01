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
