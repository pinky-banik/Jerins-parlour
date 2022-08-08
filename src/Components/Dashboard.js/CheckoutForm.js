import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../Firebase/Firbase.init';
const CheckoutForm = ({service}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError] = useState('');
    const [success,setSuccess] = useState('');
    const [clientSecret,setClientSecret ] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [transectionId,setTransectionId] = useState('');
    const [processing,setProcessing] = useState(false);

    const {img,_id,title,details,price} = service;
    const [user] = useAuthState(auth);
    const {displayName,photoUrl,email} = user;

    useEffect(() => {
        fetch('http://localhost:4000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [price])



    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
    
        if (error) {
            console.log('[error]', error);
            setCardError(error.message || '');
            setSuccess('');
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true) ;
        //confirm card payment

        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: displayName,
                  email :email,
                },
              },
            },
          );
          if(intentError){
            setCardError(intentError?.message);
            setProcessing(true);

          }else{
            setCardError('');
            setTransectionId(paymentIntent.id);
            setSuccess(' Congrates! Your payment is completed');
            setDisabled(true);
            toast.success("Payment Successfull");
            console.log(paymentIntent);
            
            //store payment data on database
            const formattedDate = Moment().format('YYYY-MM-DD');
            const payment = {
                name : user.displayName,
                service : title,
                email : user.email,
                price : price,
                transectionId : paymentIntent.transectionId,
                date: formattedDate,

            }
            // fetch(`http://localhost:4000/service/orders/${_id}`,{
            //     method:'PATCH',
            //     headers : {
            //         'content-type' : 'application/json',
            //     },
            //     body : JSON.stringify(payment)
            // })
            // .then(res=>res.json())
            // .then(data=>{
            //     console.log(data);
            //     setProcessing(false);
            // })
          }
    }    
    return (
        <div>
            <form className='border rounded py-2 p-2 my-2' onSubmit={handleSubmit}>
        <CardElement className='focus:outline-none'
            options={{
            style: {
                base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                },
                invalid: {
                color: '#9e2146',
                },
            },
            }}
        />
      <button className='btn btn-primary btn-xs mt-2' type="submit" disabled={!stripe || !clientSecret ||disabled}>
        Pay
      </button>
    </form>
     { cardError && <p className='w-96 mx-auto text-red-500'>{cardError}</p>}
     { success && <p className='w-96 mx-auto text-green-500'>{success}</p>}
     {
        transectionId && <p className='w-96 mx-auto text-blue-500'> Transection id : {transectionId}</p>
     }
    </div>
    );
};

export default CheckoutForm;


/***
 * install stripe react stripe js
 * open stripe account on stripe website
 * get publishable key pk__
 * create elements wrapper using publishable key
 * create checkout form using card element, useStripe, useElements
 * get card elements indo (credit card info)
 * -----------
 * get credit card info /error + display card error (if any)
 * get client secret from backend via payment intent post api
 * store clientsecret on the client side
 */