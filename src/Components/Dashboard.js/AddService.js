import React, { useState } from 'react';
import Loading from '../Shared/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const AddService = () => {
    const [loading,setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey ='e45298c57c6b915f179ec8d9543b8284';
    if(loading){
        return <Loading/>
    }
    
    

    const onSubmit = async data => {
        setLoading(true);
        const image= data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        let img;
        const formData = new  FormData(); //this thing is coming from uploading a file.. mozila cdn docs
        formData.append('image',image);
        await fetch(url,{
            method:'POST',
            body: formData,
        })
        .then(res=>res.json())
        .then(result=>{
             if(result.success){
                img = result.data.url;
                // send to your database 
            }        
        });
        const service = {
            title: data.title,
            price: data.price,
            details: data.details,
            img: img
        }
        await fetch('https://mighty-garden-92013.herokuapp.com/service', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(service)
        })
        .then(res =>res.json())
        .then(inserted =>{
            if(inserted.insertedId){
                toast.success('Service added successfully');
                reset();
                setLoading(false);
            }
            else{
                toast.error('Failed to add the service');
            }
        });
        
    }
    
    
    return (
        <div className=' pb-20'>
            <div>
            {/* <h2 className="text-2xl text-primary">Add a New Product</h2> */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2">

                <div className="form-control w-full ">
                    <input
                        type="text"
                        placeholder="Service Title"
                        className="input input-bordered w-full input-white h-14"
                        {...register("title", {
                            required: {
                                value: true,
                                message: 'Service title is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.title?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.title.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full ">
                    <input
                        type="number"
                        placeholder="$ price"
                        className="input input-bordered w-full  input-white h-14"
                        {...register("price", {
                            required: {
                                value: true,
                                message: 'Price per unit is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.price?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.price.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full ">
                    <textarea
                        type="text"
                        placeholder="details"
                        className="input input-bordered w-full  focus:outline-none  h-20 input-white"
                        {...register("details", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.details?.type === 'required' && <span className="label-text-alt text-red-500">{errors.details.message}</span>}
                    </label>
                </div>

                    

                {/* <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Catagory</span>
                    </label>
                    <select {...register('catagory')} className="select input-bordered w-full max-w-xs focus:outline-none">
                        {
                            catagory.map((cata,index) => <option
                                key={index}
                                value={cata.name}
                            >{cata.name}</option>)
                        }
                    </select>
                </div> */}

                <div className="form-control w-full ">
                            <input
                                type="file"
                                className="p-3 border-2 bg-white rounded-xl w-full focus:outline-none text-sm text-gray-500
                                file:mr-5 file:py-3 file:px-5
                                file:rounded-full
                                file:text-md file:font-semibold  file:bg-neutral file:text-primary fil file:bg-opacity-40 file:border-primary
                                hover:file:cursor-pointer"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>

                <input className='btn btn-primary w-full text-white' type="submit" value="Add" />
            </form>
            </div>
        </div>
    );
};

export default AddService;