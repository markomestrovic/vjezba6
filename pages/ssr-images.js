import Image from 'next/image';

export async function getStaticProps() {
    const images = fs.readdirSync('public/vjezba6');

    return {
        props: {
            images,
        },
    };
}

export default SSRImages;
