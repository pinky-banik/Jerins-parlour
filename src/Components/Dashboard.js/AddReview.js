import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../Firebase/Firbase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    // console.log(user.photoURL);
    const [loading,setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

   
        

        const onSubmit = async data =>{

            const review ={
                name: user.displayName,
                email: user.email,
                rating: data.rating,
                review: data.review,
                img: user.photoURL,
            }
            fetch("http://localhost:4000/review",{
            method :'POST',
            headers :{
                'content-type' :'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(res=>res.json())
        .then(inserted =>{
            if(inserted.insertedId){
                toast.success('Review added successfully');
                reset();
                setLoading(false);
            }
            else{
                toast.error('Failed to add the Review');
            }

        });
        reset();
        }

    return (
        <div className='rounded min-h-screen'>
            <div>
            {/* <h2 className="text-2xl text-primary">Add a Review</h2> */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2">


                <div className="form-control w-full  ">
                    <input
                        type="text"
                        value={user.displayName}
                        placeholder="Product Name"
                        className="input input-bordered w-full  h-14 input-white "
                        
                    />
                </div>
                <div className="form-control w-full ">
                    <input
                        type="email"
                        value={user.email}
                        placeholder="Your email"
                        className="input input-bordered w-full  h-14 input-white"
                    
                    />
                </div>
                <div className="form-control w-full border-none">
                    <input
                        type="number"
                        min="1" max="5"
                        placeholder="Rating"
                        className="input input-bordered w-full  h-14  input-white"
                        {...register("rating", {
                            required: {
                                value: true,
                                message: 'rating is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.rating.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full flex justify-center items-center">
                    <textarea
                        type="text"
                        placeholder="Share your experience with us"
                        className="input input-bordered w-full h-24 input-white flex"
                        {...register("review", {
                            required: {
                                value: true,
                                message: 'Review is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                    </label>
                </div>
                <input className='btn btn-primary w-full text-white my-3' type="submit" value="Add a Review" />
            </form>
            </div>
        </div>
    );
};

export default AddReview;