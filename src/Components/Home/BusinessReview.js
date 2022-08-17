import React from 'react';
import beauty from '../../assets/Image/beauty.png';

const BusinessReview = () => {
    return (
        <div className='bg-secondary'>
            
            <div className='lg:flex md:px-20 px-5 py-20'>
            <div className='lg:w-1/2'>
                <img className='w-auto p-10' src={beauty} alt="" />
            </div>
            <div className='lg:w-1/2 flex justify-center items-center p-10 md:p-2'>
                <div className='lg:w-4/5'>
                <h1 className='mt-5 uppercase md:text-4xl text-2xl font-bold font-sans leading-tight'>Let us handle <br/> your skin <span className='text-primary'>Professionally</span></h1>
                <p className='my-5 text-accent w-2/3 text-lg font-light' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit optio doloremque nostrum fugiat exercitationem dolorum.</p>
                <div className='sm:flex '>
                    <div  className='mr-16'>
                        <h1  className='text-4xl  p-4 font-bold text-primary'>
                            500+
                        </h1>
                        <p>Happy Customer</p>
                    </div>
                    <div>
                    <h1  className='text-4xl p-4  font-bold text-primary'>
                            16+
                        </h1>
                        <p>Total Service</p>
                    </div>
                </div>
                </div>
            </div>

            
            </div>
            
            
        </div>
    );
};

export default BusinessReview;