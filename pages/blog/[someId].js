const SomeBlogPost = ({someId}) => {
    return (
        <h1 className="text-2xl">
            HI! You are on{' '}
            <span className="text-red-500">{someId}</span>
        </h1>
    );
};

export default SomeBlogPost;

export function getServerSideProps(context) {
    return {
        props: {
            someId: context.params.someId,
        },
    };
}