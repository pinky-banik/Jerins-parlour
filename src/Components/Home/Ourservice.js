import React, { useEffect, useState } from "react";
import Service from "./Service";
import { Link } from "react-router-dom";

const Ourservice = () => {
  const [services, setServices] = useState([]);
  console.log(services);

  useEffect(() => {
    fetch("https://mighty-garden-92013.herokuapp.com/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div id="service" className=" bg-white">
      <h1 className="text-4xl text-center py-20">
        Our Awesome <span className="text-primary">Servcies</span>
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 lg:w-5/6 px-5 mx-auto">
        {services.slice(0, 3).map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>

      <div className=" flex justify-center items-center pb-16 pt-5">
        <Link to="/service">
          <button className="btn btn-pink">Explore More</button>
        </Link>
      </div>
    </div>
  );
};

export default Ourservice;
