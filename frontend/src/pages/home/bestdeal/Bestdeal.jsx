import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { cateproductAsync } from '../../../store/cateProductSlice';
import { useDispatch } from 'react-redux';
import { bestDealData } from '../../../JSONdata/dataOfBestDeal';
import Img from '../../../components/lazyloading/Img';

const Bestdeal = () => {

    const dispatch = useDispatch();

    return (
        <>
            <div className="featured-div">
                <h2 className='bestdeal-heading'>Best Deals on Electronics</h2>
                <hr className='featured-hr' />
                <div className="all-featured-card">
                    {bestDealData?.map((val, id) => {
                        return (
                            <div key={id} onClick={() => dispatch(cateproductAsync(val.category))}>
                                <NavLink to={`/products/${val.category}`}>
                                    <Img src={val.img} alt="bestdeal" />
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Bestdeal
