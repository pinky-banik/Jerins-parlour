import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from './../Firebase/Firbase.init';
import Loading from './Shared/Loading';
import logo from '../assets/Image/jerins-parlour.png';


const Navbar = ({sidebar}) => {
  const [changeHeader, setChangeHeader] = useState(false);
  const[user, loading] = useAuthState(auth);
  console.log(user?.photoURL);
  const image = user?.photoURL;
  const navigate = useNavigate();
  

  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
        setChangeHeader(true)
    } else {
        setChangeHeader(false)
    }
  }
  window.addEventListener('scroll', onChangeHeader);
  const handleSignOut = () =>{
    signOut(auth);
    // localStorage.removeItem('accessToken');
    navigate('/');
  }
    if (loading ) {
      return <Loading/>
    }
  
  const menuItemslg =
  <>
        <li className='px-2 focus:bg-acent'><Link to = "/">Home</Link></li>
        <li className='px-2 focus:bg-acent'><Link to = "/products">Products</Link></li>
        {
          user?.uid ?
         
          <div className='lg:flex justify-center items-center'>
            <div>
            <h1 className='p-2 font-bold text-accent lg:text-primary px-4'>{user?.displayName}</h1>
            </div>
            <div className="dropdown lg:dropdown-end">
            <label tabIndex="0" className="cursor-pointer">
              <div className='avatar px-5 lg:px-0'>
              <div className="w-10 rounded-full ring ring-accent">
                <img className='object-contain rounded-full' src={image} />
              </div>
            </div></label>
            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <Link className='mx-auto w-full text-center my-1 hover:bg-gray-200 focus:bg-secondary focus-visible:text-white p-2 rounded-lg' to = "/dashboard">My Profile</Link>
            <Link className='mx-auto w-full text-center my-1 hover:bg-gray-200 focus:bg-secondary focus-visible:text-white p-2 rounded-lg' to = "/dashboard">Dashboard</Link>
            <li><button onClick={handleSignOut} className='btn w-full btn-primary cursor-pointer text-white'>Logout</button></li>
            </ul>
          </div>
           
           
          </div>
          :
          <div className='lg:flex '>
            <li className='px-2 focus:bg-acent'><Link to = "/login">Login</Link></li>
            <li className='px-2 focus:bg-acent'><Link to = "/register">Register</Link></li>
 
          </div>
        }
        </>
  const menuItemsSm =
  <>    
       {
        user &&
        <div>
        <div className='avatar flex items-center justify-center my-3'>
              <div className="w-20 rounded-full ring ring-accent">
                <img className='object-contain rounded-full' src={image} />
              </div>
        </div>
 
        <p className='font-bold text-center'>{user?.displayName}</p>
        <p className='text-sm text-gray-500 text-center'>{user?.email}</p>
 
        <div className='flex justify-center items-center my-3'>
        <Link  to = "/"><button className='btn-accent text-white px-10 py-2 rounded-full text-center' >My Profile</button></Link>
        </div>
        <div className='border-b-2 my-2'></div>
        </div>
       }
        <li className='px-2 focus:bg-acent'><Link to = "/">Home</Link></li>
        <li className='px-2 focus:bg-acent'><Link to = "/products">Products</Link></li>
 
           
          {
           user?.uid  ?
           
            <div>
          <li className='px-2 focus:bg-acent'><Link to = "/dashboard">Dashboard</Link></li>
          <li><button onClick={handleSignOut} className='btn w-full btn-primary cursor-pointer text-white'>Logout</button></li>  
          </div>  :
          <div>
            <li className='px-2 focus:bg-acent'><Link to = "/login">Login</Link></li>
            <li className='px-2 focus:bg-acent'><Link to = "/register">Register</Link></li>
          </div>}
        </>
    return (
      <div className={changeHeader ? "bg-secondary  w-full shadow-md transition duration-500 navbar fixed lg:px-20" : "bg-transparent w-full  transition duration-500 navbar lg:px-20"}>
      <div className="navbar-start block">
        <div className="dropdown">
            <label tabIndex="0" htmlFor={sidebar ? '':'dashboard'} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64">
            {menuItemsSm}
          </ul>
        </div>
        <div className='flex justify-start items-start'><Link to='/' className="normal-case text-xl "><img className='h-12' src={logo} alt="Jerin's Parlour" /></Link></div>
      </div>
      {/* large device */}
      <div className="navbar-end lg:flex hidden">
        <ul className="menu menu-horizontal p-0 ">
          {menuItemslg}
        </ul>
      </div>
     
    </div>
    );
};
 
export default Navbar;
