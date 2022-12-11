import Image from 'next/image';

import api from '../../api';

const BlogPost = ({ post }) => (
    <main className="w-2/3 mx-auto my-0 flex flex-col items-center">
        <h1 className="text-center text-8xl text-gray-800">{post.title}</h1>
        <h2 className="text-center text-5xl my-8 text-gray-600">
            Some subtitle can go here
        </h2>
        <Image
            className="mx-auto"
            src={post.imgSrc}
            alt="post image"
            layout="fixed"
            width={800}
            height={400}
        />
        <p className="text-gray-800 text-xl mt-16">{post.body}...</p>
        <p>Read more below</p>
        <a href={post.link}>
            <span>Learn more</span>
        </a>
    </main>
);

export default BlogPost;

export async function getStaticPaths() {
    const posts = await api.getPosts();

    const paths = posts.map((post) => ({
        params: {
            someId: post.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { someId } }) {
    const post = await api.getPostBySlug(someId);

    return {
        props: {
            post,
        },
    };
}