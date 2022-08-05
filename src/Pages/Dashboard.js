import React from 'react';
import logo from '../assets/Image/jerins-parlour.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/Firbase.init';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const [user] = useAuthState(auth); 
    const navigate = useNavigate();

    const handleSignOut = ()=>{
        signOut(auth);
        navigate('/');
    }
    return (
        <div>
            <div className='flex justify-between p-5 bg-base-100 lg:px-10'>
            <div className='flex'>
            <label tabIndex="0" for="my-drawer-2" className="btn bg-transparent border-none hover:btn-nutral lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <Link to='/' className="normal-case text-xl "><img className='h-12 ' src={logo} alt="Jerin's Parlour" /></Link>
            </div>
            <div className='hidden sm:block'>
            <div className='flex'>
            <h1 className='p-2 font-bold text-primary lg:text-primary px-4'>{user?.displayName}</h1>
            <div class="avatar ">
            <div class="w-12 rounded-full ring ring-primary ">
                <img src={user?.photoURL} alt="user"/>
            </div>
            </div>
            </div>
            </div>
            </div>
            
           <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center bg-base-200">
            <Outlet/>
            
            </div> 
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label> 
                <ul class="menu p-4 overflow-y-auto w-72 bg-base-100 text-accent">
                <Link className='dash-link' to="/">Home</Link>
                <Link className='dash-link' to="/dashboard/book">Book</Link>
                <Link className='dash-link' to="/dashboard/bookingList">Booking List</Link>
                <Link className='dash-link' to="/dashboard/review">Review</Link>
                <Link className='dash-link' to="/dashboard/orderList">Order List</Link>
                <Link className='dash-link' to="/dashboard/addService">Add Service</Link>
                <Link className='dash-link' to="/dashboard/allUsers">All Users</Link>
                <Link className='dash-link' to="/dashboard/message">Messages</Link>
                <Link className='dash-link' to="/dashboard/manageService">Manage Service</Link>
                <button onClick={handleSignOut} className='btn-pink btn'>Log Out</button>
                
                </ul>
            
            </div>
            </div>
        </div>
    );
};

export default Dashboard;