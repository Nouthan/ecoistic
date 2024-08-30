import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import clsx from 'clsx';
const testimonialList = [
    {
        author: {
            fullName: "Akshay Kumar",
            picture: "https://cdn.easyfrontend.com/pictures/users/user22.jpg",
        },
        rating: 3.5,
        description:
            "Over third given bring lights divide saying. Fowl, all creeping second saw creature isn't gathered likeness shall fruitful saying let.",
    },
    {
        author: {
            fullName: "Raima Sen",
            picture: "https://cdn.easyfrontend.com/pictures/users/user4.jpg",
        },
        rating: 4,
        description:
            "Tree the whales fifth for their whose. Deep From fruitful spirit creature morning, fowl greater said, it first creepeth after.",
    },
    {
        author: {
            fullName: "Arjun Kapur",
            picture: "https://cdn.easyfrontend.com/pictures/users/user20.jpg",
        },
        rating: 5,
        description:
            "Assumenda non repellendus distinctio nihil dicta sapiente, quibusdam maiores, illum at, aliquid blanditiis eligendi qui.",
    },
];
const AboutUs = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
            <h1 className="text-4xl font-extrabold my-8 underline">About Us</h1>
            <CompanyInfo />
            <Testimonials />
        </div>
    );
};

const CompanyInfo = () => {
    return (
        <div className="w-11/12 lg:w-3/4 my-8">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row items-center">
                    <img src="img1.jpeg" alt="Energy Analysis" className="w-10 h-28 object-cover object-center md:w-1/2" />
                    <p className="text-center md:text-left p-4 md:w-1/2">
                        Get started with ECOistic - Your path to Personalized energy savings. We analyze your habits and home to create a personalized plan for reducing your energy consumption.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <img src="img2.jpeg" alt="Energy Saving Plan" className="w-10 h-28 object-cover object-center md:w-1/2" />
                    <p className="text-center md:text-left p-4 md:w-1/2">
                        Stop wasting energy. Start saving with ECOistic! Save money on your bills while creating a more sustainable future.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <img src="img3.jpeg" alt="Sustainable Future" className="w-10 h-28 object-cover object-center md:w-1/2" />
                    <p className="text-center md:text-left p-4 md:w-1/2">
                        Join ECOistic and unlock personalized energy-saving plans tailored to your lifestyle and home needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

const Rating = ({ rating, showLabel, className, ...rest }) => (
    <div className={clsx("flex items-center", className)} {...rest}>
        <span className="flex">
            {[...Array(5)].map((_, i) => {
                const index = i + 1;
                let content = "";
                if (index <= Math.floor(rating))
                    content = <FaStar className="text-yellow-500" />;
                else if (rating > i && rating < index + 1)
                    content = <FaStarHalfAlt className="text-yellow-500" />;
                else if (index > rating)
                    content = <FaRegStar className="text-yellow-200 dark:text-opacity-20" />;
                return <React.Fragment key={i}>{content}</React.Fragment>;
            })}
        </span>
        {showLabel && <span className="ml-2">{rating.toFixed(1)}</span>}
    </div>
);

const TestimonialItem = ({ testimonial }) => (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 lg:p-12 h-full">
        <img
            src={testimonial.author.picture}
            alt={testimonial.author.fullName}
            className="max-w-full h-auto rounded-full mb-6 border"
            width="100"
        />
        <div className="flex flex-row justify-between items-center mb-4">
            <h4 className="text-xl font-medium text-white">{testimonial.author.fullName}</h4>
            <Rating rating={testimonial.rating} showLabel={false} />
        </div>
        <p className="opacity-80 text-white">{testimonial.description}</p>
    </div>
);

const Testimonials = () => {
    return (
        <div className="w-11/12 lg:w-3/4 my-8">
            <h2 className="text-3xl font-extrabold my-8 text-center underline">Testimonials</h2>
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-3 gap-6">
                    {testimonialList.map((testimonial, i) => (
                        <div className="col-span-3 md:col-span-1" key={i}>
                            <TestimonialItem testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
