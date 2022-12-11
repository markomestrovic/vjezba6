import api from '../../api';

const Blogs = ({ posts }) => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">Blog</h1>
            <ul className="flex flex-col items-center">
                {posts.map((post) => (
                    <li key={post.id} className="my-4">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Blogs;

export async function getStaticProps() {
    // Get list of all posts
    const posts = await api.getPosts();

    return {
        props: { posts },
    };
}