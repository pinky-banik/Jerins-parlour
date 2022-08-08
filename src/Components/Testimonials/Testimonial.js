import React from 'react';
import {AiFillStar} from 'react-icons/ai';

const Testimonial = ({testimonial}) => {
    const {_id,img,name,email,review,rating} = testimonial;
    return (
        <div class="card w-96 bg-base-100 shadow-xl px-10 m-24">
        <div class="flex p-5 ">
        <div className='avatar px-5'>
        <div className="w-16 h-16 rounded-full ring ring-primary">
        <img className='object-contain  rounded-full' src={img} />
        </div>
        </div>
        <div className='sm:flex justify-center items-start'>
            <div>
            <h1 className='text-xl font-bold'>{name}</h1>
            <p className='text-accent'>{email}</p>
            </div>
        </div>
        </div>
        <div class="flex items-center text-start">
            <div>
                <p className='text-accent '>{review} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit vitae reiciendis exercitationem asperiores quia praesentium.</p>
            </div>
            
            </div>
            <div className='flex text-2xl py-5 text-primary'>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
            </div>
        </div>
    );
};

export default Testimonial;