import React, { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from './../Hooks/useToken';
import Loading from '../Components/Shared/Loading';
import auth from '../Firebase/Firbase.init';

const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const[regiloading,setRegiLoading] = useState(false);
    const imgStorageKey ='e45298c57c6b915f179ec8d9543b8284';


    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, uError] = useUpdateProfile(auth);

    const [token] = useToken(user||gUser);
    console.log(user||gUser);

    let signInError;
    const navigate = useNavigate();


    if (updating  || loading || gLoading ||regiloading) {
        return <Loading/>
    }

    if(error || gError || uError){
        signInError= <p className='text-red-500'><small>{error?.message || gError?.message || uError.message }</small></p>
    }
    if(token){
        navigate('/');
    }

    /**
     * 3 ways to store images
     * 1. use third party storage //free open public storage is ok htmlFor practise project..but.not htmlFor real world websites
     * 2.Your own storage in your own server(file system)
     * 3. Database :mongodb //we are using  mongodb free.. so the verifing, sizing, or validate images is much tricky than email or password
     * 
     * THere are some systems htmlFor doing it like:--
     * 1.YUP: to validate file :  Search : Yup file validation htmlFor react hook form
     * 
     * But now we will use third party storage like imgbb
    */

    const onSubmit =async data => {
        setRegiLoading(true);
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
               img= result.data.url;
            }
            console.log(result);
        });
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name ,photoURL:img});
        setRegiLoading(false);
        const currentUser = {
            name : data.name,
            img : img,
        };
        await fetch(`http://localhost:4000/user/${data.email}`,{
            method : 'PUT',
            headers:{
                'content-type' :'application/json'
            },
            body: JSON.stringify(currentUser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('data inside useToken',data);
            
        //     const accessToken = data.token;
        //     localStorage.setItem('accessToken',accessToken);
        });
    }

    
    
    return (
        <div className='hero min-h-screen bg-base-200 py-20'> 
        <div className="hero-content">


        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold text-primary">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs focus:outline-none"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs focus:outline-none"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs focus:outline-none"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {/* Photo upload */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                className="p-3 border-2 rounded-xl w-full max-w-xs focus:outline-none"
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
                        {signInError}
                        <input className='btn btn-primary w-full max-w-xs text-white' type="submit" value="Register" />
                    </form>
                     <Link to="/login"><p className='btn-animate text-center text-sm font-semibold text-gray-600 cursor-pointer'>Already Regisred? <span className='text-accent'>Please Login</span></p></Link>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-primary"
                    >Continue with Google</button>
                </div>
            </div>
        </div >
    </div>
</div >
    );
};

export default Register;