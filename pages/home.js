import Header from '../components//header.js';
import Image from 'next/image';

import CTAImg from '../assets/grow_business.jpg';
import Footer from '../components/Footer.js';
import CTA from '../components/CTA.js';
import Testimonials from '../components/Testimonials.js';

// TBD: Refactor this

const Hello = () => {
    return (
        <>
            <Header />

            {/* Call to action (CTA) section */}
            <CTA />
            {/* Testimonials section */}
            <Testimonials />
            {/* Footer section */}
            <Footer />
        </>
    );
};

export default Hello;
