import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {RiDeleteBin2Fill} from  'react-icons/ri';
import {FiEdit} from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';
import UpdateServiceModal from './UpdateServiceModal';
import { useNavigate } from 'react-router-dom';


const ManageServices = () => {
    const [loading,setLoading] = useState(true);
    const[tools,setTools] = useState([]);
    const [selectedTool,setSelectedTool] = useState({});
    const [openBooking, setBookingOpen] = useState(false);
    const navigate =  useNavigate();

    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/service")
        .then(res=>res.json())
        .then(data=>setTools(data));
        setLoading(false);
    },[tools]);


    if(loading){
        return <Loading/>
    }
    
    const handleId =async tool=>{
      setSelectedTool(tool);
      setBookingOpen(true)
      }

    const handleDelete = async id =>{
      await fetch(`https://mighty-garden-92013.herokuapp.com/service/${id}`,{
        method:'DELETE',
      })
      .then(res=>res.json())
      .then(data=>{
        // console.log(data);
        if(data.deletedCount > 0){
          toast.success("Product deleted Successfully");
        }
        else{
          toast.error("Product deleting unsuccessful");
        }
      })
    }
    

    return (
        <div>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead >
      <tr className='border rounded' >
        <th>image</th>
        <th>title</th>
        <th>price</th>
        <th>watch</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
        {
            tools.map(tool=>
                <tr key={tool._id}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={tool.img} alt={tool.title} />
              </div>
            </div>
          </div>
        </td>
        <td>
          {tool.title}
        </td>
        <td>
          $ {tool.price}
        </td>
        <td>
        <AiFillEye onClick={()=>navigate(`/serviceDetails/${tool._id}`)} className='text-2xl text-blue-500'/>
        </td>
        <th>
          <button onClick={()=>handleDelete(tool._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
        </th>
        <th>
        <label onClick={()=> handleId(tool)} htmlFor="updateModal" className="text-blue-500 text-2xl"><FiEdit/></label>
        {
          <UpdateServiceModal data={selectedTool} openBooking={openBooking} setBookingOpen={setBookingOpen}/>
        }
        </th>
      </tr>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageServices;