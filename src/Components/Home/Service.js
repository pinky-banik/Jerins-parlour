import React from 'react';
import img from '../../assets/Icon/service1.png';

const Service = ({service}) => {
    const {name,price,details} = service;
    return (
        <div className="hover:cursor-pointer hover:bg-white m-3 hover:shadow-2xl rounded-lg ">
        <figure className="px-10 pt-10 flex justify-center">
        <div className="avatar">
        <div className="w-24 rounded-full">
            <img src={img} />
        </div>
        </div>
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
            
            </div>
        </div>
        </div>
    );
};

export default Service;