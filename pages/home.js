import CTA from '../components/CTA.js';
import Testimonials from '../components/Testimonials.js';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout.js';

const Hello = () => {
    return (
        <>
            <HeaderFooterLayout>
                <CTA />
                <Testimonials />
            </HeaderFooterLayout>
        </>
    );
};

export default Hello;
