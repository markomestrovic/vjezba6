const SomeBlogPost = ({someId}) => {
    return (
        <h1 className="text-2xl">
            HI! You are on{' '}
            <span className="text-red-500">{someId}</span>
        </h1>
    );
};

export default SomeBlogPost;

export function getStaticPaths() {
    return {
        paths: [
            { params: { someId: '1' } },
            { params: { someId: '2' } },
            { params: { someId: '3' } },
            { params: { someId: 'stop' } },
            { params: { someId: 'hammer' } },
            { params: { someId: 'time' } },
        ],
        fallback: false,
    };
}

export function getStaticProps(context) {
    return {
        props: {
            someId: context.params.someId,
        },
    };
}