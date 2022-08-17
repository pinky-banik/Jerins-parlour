import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../../Firebase/Firbase.init';
import BookingCard from './BookingCard';
import Loading from '../Shared/Loading';

const BookingList = () => {
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [user] = useAuthState(auth);
    const {email} = user;


    const navigate = useNavigate();

 
    useEffect(()=>{
        fetch(`https://mighty-garden-92013.herokuapp.com/orders/${email}`)
        .then(res=>res.json())
        .then(data=>{
            setOrders(data);
            setLoading(false);
            console.log(data);
        } 
        );
    },[email]);


    const handleDelete = id =>{
        
        const url = `https://mighty-garden-92013.herokuapp.com/orders/${id}`;
        
        Swal.fire({
          icon: "warning",
          title: "Are you sure to delete this product?",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(url, {
              method: 'delete'
          })
          .then(res => res.json())
          .then(data => {
              if(data.deletedCount){
                  const remaining = orders.filter(order =>  order._id !== id);
                  setOrders(remaining);
                  Swal.fire("Deleted!", "", "success");
                  }
                  ;
              } );
          }
        });

    }
    if(loading)
    {
        return <Loading/>
    }
    return (
        <div className=''>
       {
        orders.length <1 ?
        <div>
            <div className='h-screen text-center flex justify-center '>
            <div>
                <h1 className='py-5 text-4xl font-bold'>No Appointment Booked</h1>
                <button className='btn-pink'><Link to="/service">Get an Appointment</Link></button>
            </div>
  
        </div>
        </div>
        :
        <div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-3'>
            {
                orders.map(order=>
                    <BookingCard
                    
                    key={order._id}
                    order={order}
                    />)
            }
        </div>
        }
        </div>
    );
};

export default BookingList;