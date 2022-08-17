import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../Components/Home/Service';
import Footer from '../Components/Shared/Footer';
import Loading from '../Components/Shared/Loading';
import Navbar from '../Components/Shared/Navbar';

const Services = () => {
    const[services,setServices] = useState([]);
    const[loading,setLoading] = useState(true);
    console.log(services);

    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/service")
        .then(res=>res.json())
        .then(data=>{
            setServices(data)
            setLoading(false)
        });
    },[]);
    if(loading)
    {
        return <Loading/>
    }
    return (
        <div id="services" className=' bg-white min-h-screen'>
            <Navbar/>
            <h1 className='text-4xl text-center py-20'>Our All <span className='text-primary'>Servcies</span></h1>
            <div className='grid md:grid-cols-3 grid-cols-1 lg:w-5/6 px-5 mx-auto'>
                {
                    services.map(service=><Service key={service._id} service={service}/>)
                }
            </div>
            <Footer/>
        </div>
    );
};

export default Services;