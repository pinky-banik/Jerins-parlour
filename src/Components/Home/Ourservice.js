import React, { useEffect, useState } from 'react';
import Service from './Service';

const Ourservice = () => {
    const[services,setServices] = useState([]);
    console.log(services);

    useEffect(()=>{
        fetch('services.json')
        .then(res=>res.json())
        .then(data=>setServices(data));
    },[])
    return (
        <div id="services" className=' bg-white'>
            <h1 className='text-4xl text-center py-20'>Our Awesome <span className='text-primary'>Servcies</span></h1>
            <div className='grid md:grid-cols-3 grid-cols-1 lg:w-5/6 px-5 mx-auto'>
                {
                    services.map(service=><Service key={service.id} service={service}/>)
                }
            </div>
        </div>
    );
};

export default Ourservice;