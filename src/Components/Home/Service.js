import React from 'react';
import { useNavigate } from 'react-router-dom';

const Service = ({service}) => {
    const navigate = useNavigate();
    const {_id,title,price,details ,img} = service;
    return (
        <div  onClick={()=>navigate(`/serviceDetails/${_id}`)} className="hover:cursor-pointer hover:bg-white m-3 hover:shadow-2xl rounded-lg ">
        <figure className="px-10 pt-10 flex justify-center">
        <div className="avatar">
        <div className="w-24 rounded-full">
            <img src={img} />
        </div>
        </div>
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{title}</h2>
            <h4 className='text-primary'>${price}</h4>
            <p className='text start text-sm text-accent'>{details.slice(0,100)}</p>
            <div className="card-actions">
            
            </div>
        </div>
        </div>
    );
};

export default Service;