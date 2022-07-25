import React from 'react';
import Navbar from '../Components/Navbar';
import Content from './../Components/Home/Content';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <h1 className='text-primary'>this is home</h1>
            <Content/>
        </div>
    );
};

export default Home;