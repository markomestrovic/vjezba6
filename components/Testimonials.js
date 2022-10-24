import Image from 'next/image';

const Testimonials = () => (
    <section className="mt-12 py-12 bg-gray-50">
        <main className="max-w-4xl flex flex-col mx-auto">
            <div>
                <h2 className="capitalize text-4xl font-roboto-condensed font-bold text-gray-700">
                    What our customers are saying
                </h2>
                <h4 className="text-xl text-gray-400 mt-2">
                    Read case studies of our happy customers
                </h4>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="h-96 border hover:cursor-pointer">
                    <div className="h-4/5 bg-gray-100 relative">
                        <Image
                            src={'/design-system.jpg'}
                            layout="fill"
                            objectFit="cover"
                            alt="Grow business"
                        />
                    </div>
                    <div className="h-1/5 bg-gray-300 flex items-center justify-center relative">
                        <p className="capitalize font-roboto-condensed text-xl text-hci-lila">
                            New design system
                        </p>
                        <div className="absolute right-4 h-full flex items-center">
                            <Image
                                src={'/right.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Right icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-96 border hover:cursor-pointer">
                    <div className="h-4/5 bg-gray-100 relative">
                        <Image
                            src={'/from-scratch.jpg'}
                            layout="fill"
                            objectFit="cover"
                            alt="Grow business"
                        />
                    </div>
                    <div className="h-1/5 bg-gray-300 flex items-center justify-center relative">
                        <p className="capitalize font-roboto-condensed text-xl text-hci-lila">
                            Design from scratch
                        </p>
                        <div className="absolute right-4 h-full flex items-center">
                            <Image
                                src={'/right.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Right icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-96 border hover:cursor-pointer">
                    <div className="h-4/5 bg-gray-100 relative">
                        <Image
                            src={'/brand.png'}
                            layout="fill"
                            objectFit="cover"
                            alt="Grow business"
                        />
                    </div>
                    <div className="h-1/5 bg-gray-300 flex items-center justify-center relative">
                        <p className="capitalize font-roboto-condensed text-xl text-hci-lila">
                            Brand transformation
                        </p>
                        <div className="absolute right-4 h-full flex items-center">
                            <Image
                                src={'/right.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Right icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-96 border hover:cursor-pointer">
                    <div className="h-4/5 bg-gray-100 relative">
                        <Image
                            src={'/book-cover.jpg'}
                            layout="fill"
                            alt="Grow business"
                        />
                    </div>
                    <div className="h-1/5 bg-gray-300 flex items-center justify-center relative">
                        <p className="capitalize font-roboto-condensed text-xl text-hci-lila">
                            Book cover design
                        </p>
                        <div className="absolute right-4 h-full flex items-center">
                            <Image
                                src={'/right.svg'}
                                layout="fixed"
                                width={15}
                                height={15}
                                alt="Right icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="capitalize mt-12 mb-12 mx-auto w-1/3 py-3 border shadow-md whitespace-nowrap text-xl text-hci-lila font-medium hover:bg-gray-100">
                View showcase
            </button>
        </main>
    </section>
);

export default Testimonials;
