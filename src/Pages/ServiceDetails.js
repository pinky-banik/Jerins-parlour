import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Navbar from './../Components/Shared/Navbar';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const[service,setService] = useState([]);
    const {serviceId} = useParams();

    const navigate = useNavigate();

    const {img,_id,title,details,price} = service;
    console.log(service);
    console.log(typeof(price));
 
    useEffect(()=>{
        fetch(`https://mighty-garden-92013.herokuapp.com/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data));
    },[serviceId]);

    const handlePayment = id =>{
        Swal.fire({
          icon: "warning",
          title: "Are you sure want to book this appointment?",
          text : "You will redirected to the payment page",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/dashboard/book/${id}`); 
          }
        });

    }
    return (
        <div>
            <Navbar/>
            <div className='h-screen sm:p-14 lg:w-4/5 mx-auto flex justify-center items-center'>
            <div className=''>
               <div className='p-5 flex justify-center items-center '>
                    <img src={img} alt={title} />
                </div>
                <div className='p-5 flex justify-center items-center text-center'>
                    <div>
                    <h1 className='text-2xl text-primary'>{title}</h1>
                    <p className='text-accent text-md my-5 w-1/2 mx-auto'>{details}</p>
                    <h3 className='text-primary text-xl font-bold'>${price}</h3>
                    <button className='btn btn-pink my-5' onClick={()=>handlePayment(_id)}>Book Appointment</button>
                    </div>
                </div>
                
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default ServiceDetails;