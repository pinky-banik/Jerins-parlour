import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {RiDeleteBin2Fill} from  'react-icons/ri';


const AllUser = () => {
    const [loading,setLoading] = useState(true);
    const[users,setUsers] = useState([]);
    // const [selectedTool,setSelectedTool] = useState({});
    // const [openBooking, setBookingOpen] = useState(false);


    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/user")
        .then(res=>res.json())
        .then(data=>setUsers(data));
        setLoading(false);
    },[users]);


    if(loading){
        return <Loading/>
    }
    
    // const handleId =async tool=>{
    //   setSelectedTool(tool);
    //   setBookingOpen(true)
    //   }

    const handleDelete = async id =>{
      await fetch(`https://mighty-garden-92013.herokuapp.com/user/${id}`,{
        method:'DELETE',
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.deletedCount > 0){
          toast.success("User deleted Successfully");
        }
        else{
          toast.error("User deleting unsuccessful");
        }
      })
    }
    
    const handleMakeAdmin = email =>{
      fetch(`https://mighty-garden-92013.herokuapp.com/user/admin/${email}`,{
          method:'PUT',
      }).then(res=>res.json())
      .then(data =>{
          // console.log(data);
      })
  };


    return (
        <div>
            <div className="overflow-x-auto w-full">
  <table className="table w-full shadow-2xl">
    {/* <!-- head --> */}
    <thead className='bg-neutral border-2 rounded-t-full'>
      <tr className='bg-neutral'>
        <th>image</th>
        <th>Name</th>
        <th>email</th>
        <th>Make Admin</th>
        <th>Delete User</th>
      </tr>
    </thead>
    <tbody>
        {
            users?.map(user=>
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.img} alt={user.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                  {
                    user.role !== 'admin' ?
                    <button onClick={()=>handleMakeAdmin(user.email)} className="btn btn-xs btn-secondary" >Make Admin</button>:
                  <button className="btn btn-xs btn-disabled">Admin</button>
                  }

                  </td>
                  <td>
                    <button onClick={()=>handleDelete(user._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                  </td>
                  
                </tr>)
                  }
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default AllUser;