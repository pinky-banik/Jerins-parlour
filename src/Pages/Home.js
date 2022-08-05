import React from 'react';
import Banner from '../Components/Home/Banner';
import BusinessReview from '../Components/Home/BusinessReview';
import Contact from '../Components/Home/Contact';
import Ourservice from '../Components/Home/Ourservice';
import Testimonials from '../Components/Home/Testimonials';
import Footer from './../Components/Shared/Footer';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Ourservice/>
            <BusinessReview/>
            <Testimonials/>
            <Contact/>
            <Footer/>
        </div>
    );
};

export default Home;