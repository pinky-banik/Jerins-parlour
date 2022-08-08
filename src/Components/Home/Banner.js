import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/Image/banner.png';
import Navbar from './../Shared/Navbar';

const Banner = () => {
    return (
        <div className='bg-secondary'>
            <Navbar/>
            <div className='lg:flex md:px-20 px-5'>
            <div className='lg:w-1/2 flex justify-center items-center'>
                <div className='lg:w-4/5'>
                <h1 className='mt-5 uppercase md:text-6xl text-3xl font-bold font-sans leading-tight text-black'>Beauty salon<br/> for every women</h1>
                <p className='my-5 text-accent w-2/3 text-lg font-light' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit optio doloremque nostrum fugiat exercitationem dolorum.</p>
                <button className='btn-pink'><Link to="/service">Get an Appointment</Link></button>
                </div>
            </div>
            <div className='lg:w-1/2'>
                <img className='w-auto p-10' src={banner} alt="" />
            </div>
            </div>
            
            
        </div>
    );
};

export default Banner;