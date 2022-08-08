import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '../Shared/Loading';

const stripePromise = loadStripe('pk_test_51L4fzAB4WYmpQRJkrlqBLtG4kegFippsYXIR8Y9ueD7p1htdcxx20iWMT6ABOwc2Dci8QTY6iCd93EfX0A9y0XlQ00wosJ9Fcj');
const Book = () => {
    const[service,setService] = useState([]);
    const {paymentId} = useParams();

    const navigate = useNavigate();

    const {img,_id,title,details,price,email} = service;
 
    useEffect(()=>{
        fetch(`https://mighty-garden-92013.herokuapp.com/service/${paymentId}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setService(data);
        });
    },[paymentId]);

    // if(loading){
    //    return <Loading/>
    // }



    return (
        <div className='pt-20 w-50 w-96 mx-auto '>
            <h1>{paymentId}</h1>
            <h1>name :{title}</h1>
            <h1>email : {email}</h1>
            <h1>price : {price}
            </h1>
            <p className='py-2'>Click <a  target="_blank" className='text-blue-500' href="https://stripe.com/docs/testing">here</a> to get some test numbers</p>
            <div >
            <Elements stripe={stripePromise}>
            <CheckoutForm service={service}/>
            </Elements>
            </div>
        </div>
    );
};

export default Book;