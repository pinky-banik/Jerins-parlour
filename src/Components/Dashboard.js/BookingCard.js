import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const BookingCard = ({order}) => {
    const{img,name,service,status,details} = order;
    return (
        <div>
            <div className='h-60 bg-white w-80 p-5 rounded-2xl'>
                <div className=' flex justify-between items-center'>
                    <img src={img} className="w-16 h-16 rounded" alt="" />
                    <button
                      style={{ width: "100px" }}
                      className={
                        order.status === "Pending"
                          ? "py-2 rounded-md bg-red-100 hover:bg-red-400 btn-disabled  text-red-600"
                          : order.status === "Done"
                          ? "py-2 rounded-md bg-green-100 hover:bg-green-400 btn-disabled  text-green-600"
                          : ""
                      }
                    >
                      {order.status}
                    </button>
                </div>
                <h1 className='pt-3  text-lg font-bold'>{service}</h1>
                <p className='text-accent'>{details}</p>
            </div>
        </div>
    );
};

export default BookingCard;