import React from 'react';
import Rating from 'react-rating'; 
import {AiFillStar,AiOutlineStar} from 'react-icons/ai';

const Testimonial = ({testimonial}) => {
    const {_id,img,name,email,review,rating} = testimonial;
    return (
        <div className="card   w-fit md:w-96 bg-base-100 hover:shadow-xl p-5 m-24">
        <div className="sm:flex py-5 t">
        <div className='avatar pr-5'>
        <div className="w-16 h-16 rounded-full ring ring-primary">
        <img className='object-contain  rounded-full' src={img} />
        </div>
        </div>
        <div className='sm:flex  items-start'>
            <div>
            <h1 className='text-xl font-bold'>{name}</h1>
            <p className='text-accent'>{email}</p>
            </div>
        </div>
        </div>
        <div className="flex items-center text-start">
            <div className=''>
                <p className='text-accent line-clamp-3'>{review}</p>
            </div>
            
            </div>
            <div className='flex text-2xl py-5 text-primary'>
            <Rating
                    initialRating={rating}
                    readonly
                    fullSymbol={
                        <AiFillStar/>
                    }
                    emptySymbol={
                      <AiOutlineStar/>
                    }
                  />
            </div>
            
        </div>
    );
};

export default Testimonial;