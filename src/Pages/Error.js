import React from 'react';
import error from '../assets/Image/error.jpg'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen bg-white flex justify-center items-center'>
        <div >
        <img className='w-screen lg:h-screen lg:w-fit' src={error} alt="" />
        <div className='flex justify-center items-center pb-20'>
            <Link to="/"><button className="btn-pink btn">Go Back</button></Link>
        </div>
        </div>
        </div>
    );
};

export default Error;