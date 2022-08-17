import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const OrderList = () => {
    const [orders,setOrders] = useState([]);
    const [status,setStatus] = useState('');

 
    useEffect(()=>{
        fetch(`https://mighty-garden-92013.herokuapp.com/orders`)
        .then(res=>res.json())
        .then(data=>{
            setOrders(data);
            console.log(data);
        } 
        );
    },[orders]);


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

    const handleStatusChange = (id, status) => {
        let modifiedOrders = [];
        orders.forEach((order) => {
          if (order._id === id) {
            order.status = status;
          }
          modifiedOrders.push(order);
        });
        setOrders(modifiedOrders);
        const modifiedStatus = { id, status };
    
        fetch(`https://mighty-garden-92013.herokuapp.com/orders/${id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(modifiedStatus),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success(<b style={{ color: "#198754" }}>Set to {status}</b>);
            } else {
              toast.error("something went wrong!");
            }
          })
          .catch((error) => toast.error(error.message));
      };
    return (
        <div className=''>
        <div className="overflow-x-auto w-full">
        <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
            <tr>
                <th>image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Status</th>
                
            </tr>
            </thead>
            <tbody>
                {
                    orders.map(order=>
                        <tr key={order._id}>
                <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={order.img} alt={order.name} />
                    </div>
                    </div>
                </div>
                </td>
                <td>
                {order.name}
                </td>
                <td>
                {order.email}
                </td>
                <td>
                {order.service}
                </td>
                <td>
                ${order.price}
                </td>
                <td>
                <button onClick={()=>handleDelete(order._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                </td>
                <td>
                {/* <button
                      style={{ width: "100px" }}
                      className={
                        order.status === "Pending"
                          ? "btn text-primary"
                          : order.status === "Done"
                          ? "btn text-green-600"
                          : "btn text-primary"
                      }
                    >
                      {order.status}
                    </button> */}
                    <select
                className={
                    order.status === "Pending"
                      ? "btn bg-red-100  hover:bg-red-200 text-red-600"
                      : order.status === "Done"
                      ? "btn bg-green-100 hover:bg-green-200 text-green-600"
                      : ""
                  }
                defaultValue={order.status}
                onChange={(e) =>
                handleStatusChange(order._id, e.target.value)
                }
            >
                {/* <option className="bg-white text-muted">Pending</option> */}
                <option className="bg-white text-red-600">Pending</option>
                <option className="bg-white text-green-600">Done</option>
            </select>
                </td>
                
            </tr>)
                }
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default OrderList;