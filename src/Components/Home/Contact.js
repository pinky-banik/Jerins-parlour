import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../Firebase/Firbase.init';
import Loading from '../Shared/Loading';

const Contact = () => {
    const [user] = useAuthState(auth);
    const [loading,setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit,reset } = useForm();


    const onSubmit =async data => {
        setLoading(true);
        const review ={
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            number: data.number,
            message: data.message,
            img: user.photoURL,
        }
        fetch("http://localhost:4000/message",{
        method :'POST',
        headers :{
            'content-type' :'application/json'
        },
        body: JSON.stringify(review)
    })
    .then(res=>res.json())
    .then(inserted =>{
        if(inserted.insertedId){
            toast.success('Message sent successfully');
            reset();
            setLoading(false);
        }
        else{
            toast.error('Failed to sending the message');
        }

    });
    reset();
    }
    if(loading){
        return <Loading/>
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
                            {...register("firstName")}
                            required
                        />
                        
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("lastName")} required
                        />
                        
                    </div>

                    </div>
                    <div className='flex'>
                    <div className="form-control w-full max-w-xs mr-3">
                        
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("email")} required
                        />
                        
                    </div>
                    <div className="form-control w-full max-w-xs">
                        
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="my-2 p-5 rounded w-full max-w-xs focus:outline-none"
                            {...register("number")} required
                        />
                    </div>
                    </div>
                    <div className="form-control w-full">
                        <textarea
                            type="text"
                            placeholder="Your Message"
                            className="my-2 p-5 rounded focus:outline-none "
                            {...register("message")} required
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