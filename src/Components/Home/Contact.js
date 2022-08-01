import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit =async data => {
        console.log('abcd');
    }
    return (
        <div id="contact" className='bg-secondary py-5'>
            <h1 className='mt-5 uppercase md:text-4xl text-2xl font-bold font-sans leading-tight text-center py-20'>Let us  Know</h1>
            <div className='w-full flex justify-center items-center py-5 '>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex'>
                    <div className="form-control w-full mr-3 max-w-xs">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("name")}
                        />
                        
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("name")}
                        />
                        
                    </div>

                    </div>
                    <div className='flex'>
                    <div className="form-control w-full max-w-xs mr-3">
                        
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("email")}
                        />
                        
                    </div>
                    <div className="form-control w-full max-w-xs">
                        
                        <input
                            type="email"
                            placeholder="Phone Number"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("email")}
                        />
                    </div>
                    </div>
                    <div className="form-control w-full">
                        <textarea
                            type="text"
                            placeholder="Your Message"
                            className="my-2 p-5 rounded focus:outline-none "
                            {...register("password")}
                        />
                    </div>
                    <div className='flex justify-center'>
                    <input className='my-2 btn-pink  text-white' type="submit" value="Send message" />
                    </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Contact;