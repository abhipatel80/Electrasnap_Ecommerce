import React from 'react'
import { useDispatch } from 'react-redux'
import { cateproductAsync } from '../../../store/cateProductSlice';
import { NavLink } from 'react-router-dom';
import './style.scss'
import { carouselData } from '../../../JSONdata/dataOfCarousel';
import Img from '../../../components/lazyloading/Img';

const Carousel = () => {

    const dispatch = useDispatch();

    return (
        <>
            <div className="maincarousel">
                {carouselData.map((val, id) => {
                    return (
                        <div className="carouselitem" key={id} onClick={() => dispatch(cateproductAsync(val.category))}>
                            <NavLink className="navlinkcate" to={`/products/${val.category}`}>
                                <Img src={val.img} alt="carousel" />
                                <h6>{val.name}</h6>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Carousel
