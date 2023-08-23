import React from 'react';
import Star from '../ratingstar/Star';
import './style.scss';
import { NavLink } from 'react-router-dom';
import Img from '../lazyloading/Img';

const Card = ({ data }) => {
    return (
        <>
            {data && data?.map((val) => {
                return (
                    <NavLink className="navlinkcard" to={`/product/${val._id}`} key={val._id}>
                        <div className="maincard">
                            <div className="card-img">
                                <Img src={val.images[0].url} alt="card" />
                            </div>
                            <div className="card-content">
                                <p className="card-company">{val.category}</p>
                                <p className='card-title'>{val.name.slice(0, 20)}</p>
                                <p className='card-price'>&#8377;{Math.round(val.price).toLocaleString()} &nbsp; <del className='del-price'>&#8377;{Math.round(val.price * 1.2).toLocaleString()}</del></p>
                                <Star rating={val.ratings} numofreviews={val.numOfReviews} />
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </>
    )
}

export default Card
