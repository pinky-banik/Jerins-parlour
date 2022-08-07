import React from 'react';
import logo from '../assets/Image/jerins-parlour.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/Firbase.init';
import { signOut } from 'firebase/auth';
import { AiOutlineHome } from 'react-icons/ai';
import {MdOutlineRateReview, MdOutlineShoppingCart,MdListAlt} from 'react-icons/md';
import {RiMessage2Line} from 'react-icons/ri' ;
import {BsCardChecklist,BsUiChecks} from 'react-icons/bs';
import {IoMdAdd,IoPeopleOutline} from 'react-icons/io';
import {FiGrid,FiUsers}  from  'react-icons/fi';
 
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
            <label tabIndex="0" htmlFor="my-drawer-2" className="btn bg-transparent border-none hover:btn-nutral lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <Link to='/' className="normal-case text-xl "><img className='h-12 ' src={logo} alt="Jerin's Parlour" /></Link>
            </div>
            <div className='hidden sm:block'>
            <div className='flex'>
            <h1 className='p-2 font-bold text-primary lg:text-primary px-4'>{user?.displayName}</h1>
            <div className="avatar ">
            <div className="w-12 rounded-full ring ring-primary ">
                <img src={user?.photoURL} alt="user"/>
            </div>
            </div>
            </div>
            </div>
            </div>
            
           <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col  bg-base-200 w-full">
            <div className='p-10'>
            <Outlet/>
            </div>
            
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 text-accent">
                <li><Link className='dash-link' to="/"><AiOutlineHome className='text-xl'/>Home</Link></li>
                <li><Link className='dash-link' to="/dashboard/book"><MdOutlineShoppingCart className='text-xl'/>Book</Link></li>
                <li><Link className='dash-link' to="/dashboard/bookingList"><MdListAlt className='text-xl'/>Booking List</Link></li>
                <li><Link className='dash-link' to="/dashboard/review"><MdOutlineRateReview className='text-xl'/>Review</Link></li>
                <li><Link className='dash-link' to="/dashboard/allReview"><BsUiChecks className='text-xl'/>All Review</Link></li>
                <li><Link className='dash-link' to="/dashboard/orderList"><BsCardChecklist className='text-xl'/>Order List</Link></li>
                <li><Link className='dash-link' to="/dashboard/addService"><IoMdAdd className='text-xl'/>Add Service</Link></li>
                <li><Link className='dash-link' to="/dashboard/allUsers"><FiUsers className='text-xl'/>All Users</Link></li>
                <li><Link className='dash-link' to="/dashboard/message"><RiMessage2Line className='text-xl'/>Messages</Link></li>
                <li><Link className='dash-link' to="/dashboard/manageService"><FiGrid className='text-xl'/>Manage Service</Link></li>
                <button onClick={handleSignOut} className='btn-pink btn'>Log Out</button>
                
                </ul>
            
            </div>
            </div>
        </div>
    );
};

export default Dashboard;