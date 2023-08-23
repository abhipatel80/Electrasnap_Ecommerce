import React, { useEffect } from 'react'
import Carousel from './carousel/Carousel'
import Slider from './slider/Slider'
import Topoffers from './topoffers/Topoffers'
import Featured from './featured/Featured'
import './style.scss'
import Bestdeal from './bestdeal/Bestdeal'

const Home = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <>
            <div className="home">
                <Carousel />
                <Slider />
                <Topoffers />
                <Featured />
                <Bestdeal />
            </div>
        </>
    )
}

export default Home
