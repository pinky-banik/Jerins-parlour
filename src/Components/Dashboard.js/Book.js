import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from './../Shared/Loading';
import payment from '../../assets/Image/payment.gif';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firbase.init';
import {FaCcMastercard} from 'react-icons/fa';

const stripePromise = loadStripe('pk_test_51L4fzAB4WYmpQRJkrlqBLtG4kegFippsYXIR8Y9ueD7p1htdcxx20iWMT6ABOwc2Dci8QTY6iCd93EfX0A9y0XlQ00wosJ9Fcj');
const Book = () => {
    const[service,setService] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [processing,setProcessing] = useState(false);
    const {paymentId} = useParams();
    const [user] = useAuthState(auth);
    

    const {img,_id,title,details,price,email} = service;
 
    useEffect(()=>{
        fetch(`https://mighty-garden-92013.herokuapp.com/service/${paymentId}`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false);
            console.log(data);
            setService(data);
        });
    },[paymentId]);

    if(loading){
       return <Loading/>
    }

    if(processing)
    {
      return <div className='flex h-screen justify-center items-center'><img className='w-56'  src={payment} alt="" /></div>
    }

    return (
        <div className='w-50 sm:w-96'>
            <div className='py-3 my-2 bg-white w-full p-5'>
                <h1>{user.displayName}</h1>
            </div>
            <div className='py-3 my-2 bg-white w-full p-5'>
                <h1>{user.email}</h1>
            </div>
            <div className='py-3 my-2 bg-white w-full p-5'>
                <h1>{title}</h1>
            </div> 
            
            <div >
            <Elements stripe={stripePromise}>
            <CheckoutForm service={service} setProcessing={setProcessing}/>
            </Elements>
            <div className='flex items-center'>
            <FaCcMastercard className='text-blue-900 text-2xl'/>
            <h1 className='py-2 text-accent mx-2'>
             Click <a  target="_blank" className='text-blue-500' href="https://stripe.com/docs/testing">here</a> to get some test numbers</h1>
            </div>
            </div>
        </div>
    );
};

export default Book;