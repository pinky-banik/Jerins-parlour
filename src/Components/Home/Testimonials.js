import React, { useEffect } from 'react';
import "swiper/css/bundle";
import "./Testimonials.css";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import Loading from '../Shared/Loading';
import Testimonial from '../Testimonials/Testimonial';

const Testimonials = () => {
    const [testimonials,setTestimonials] = useState([]);

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch("http://localhost:4000/review")
        .then(res=>res.json())
        .then(data=>setTestimonials(data));
    },[]);


    return (
        <div className='h-screen'>
            <h1 className='text-4xl text-center py-20 text-primary'>Testimonials</h1>
            <div>
            <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
            {
            testimonials.map(testimonial=>
                <SwiperSlide key={testimonial._id}>
                    <Testimonial testimonial={testimonial}/>
                </SwiperSlide>
                )
            }
        </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;