import Image from 'next/image';

const SSRImages = ({ images }) => {
    return (
        <div>
            <h1 className="text-4xl" align="center">
                SSR Images
            </h1>
            <ul>
                {images.map((image) => (
                    <li key={image}>
                        <p align="center">{image}</p>
                        <div
                            style={{
                                position: 'relative',
                                height: '300px',
                            }}
                        >
                            <Image
                                src={'/vjezba6/' + image}
                                alt={image}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SSRImages;
