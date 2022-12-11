import { useRouter } from 'next/router';

const SomeBlogPost = () => {
    const router = useRouter();

    return (
        <h1 className="text-2xl">
            HI! You are on{' '}
            <span className="text-red-500">{router.query.someId}</span>
        </h1>
    );
};

export default SomeBlogPost;