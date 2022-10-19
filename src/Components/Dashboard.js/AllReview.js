import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {RiDeleteBin2Fill} from  'react-icons/ri';
import {AiFillStar } from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import ReviewShowModal from './ReviewShowModal';

const AllReview = () => {
    const [loading,setLoading] = useState(true);
    const[review,setReview] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState({});
  const [openBooking, setBookingOpen] = useState(false);

    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/review")
        .then(res=>res.json())
        .then(data=>setReview(data));
        setLoading(false);
    },[review]);


    if(loading){
        return <Loading/>
    }
    

    const handleDelete = async id =>{
      await fetch(`https://mighty-garden-92013.herokuapp.com/review/${id}`,{
        method:'DELETE',
      })
      .then(res=>res.json())
      .then(data=>{
        // console.log(data);
        if(data.deletedCount > 0){
          toast.success("Review deleted Successfully");
        }
        else{
          toast.error("Failed to Delete this review");
        }
      })
    }

    const handleId = async (review) => {
        setSelectedBlog(review);
        setBookingOpen(true);
      };
    
    return (
        <div>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th>image</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>rating</th>
                    <th>watch</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                       review.map(review=>
                            <tr key={review._id}>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={review.img} alt={review.name} />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {review.name}
                    </td>
                    <td>
                    {review.email}
                    </td>
                    <td ><div className='flex justify-center items-center'><AiFillStar className='mx-2 text-yellow-500 text-2xl'/>{review.rating}</div></td>
                    
                    <td>
                  <label
                    onClick={() => handleId(review)}
                    htmlFor="reviewShowModal"
                    className="text-blue-500 text-2xl cursor-pointer"
                  >
                    <AiFillEye />
                  </label>
                  {
                    <ReviewShowModal
                      data={selectedBlog}
                      openBooking={openBooking}
                      setBookingOpen={setBookingOpen}
                    />
                  }
                </td>


                    <th>
                    <button onClick={()=>handleDelete(review._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                    </th>
                </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AllReview;