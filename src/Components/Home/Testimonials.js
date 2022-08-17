import React, { useEffect } from 'react';
import "swiper/css/bundle";
import "./Testimonials.css";
import {  useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


// import required modules
import { Pagination ,FreeMode} from "swiper";
import Loading from '../Shared/Loading';
import Testimonial from '../Testimonials/Testimonial';

const Testimonials = () => {
    const [testimonials,setTestimonials] = useState([]);

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/review")
        .then(res=>res.json())
        .then(data=>setTestimonials(data));
    },[]);


    return (
        <div id="testimonials" className=' my-20'>
            <h1 className='text-4xl text-center text-primary'>Testimonials</h1>
            <div>
            <Swiper
            
        breakpoints={{
            // when window width is >= 640px
            // when window width is >= 768px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1080: {
              width: 1080,
              slidesPerView: 3,
              spaceBetween : 50,
            },
          }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        Navigation={true}
            // centeredSlides={true}
            slidesPerView={1}
            // spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper mx-auto"
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