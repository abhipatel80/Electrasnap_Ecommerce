import React from 'react'
import Img from '../../../components/lazyloading/Img'
import { NavLink } from 'react-router-dom'

const OrderSummary = ({ delprice, val, quantity }) => {
    return (
        <>
            <div className="ordersummary">
                <h4 className="delivery-h4">Order Summary</h4>
                <div className="cart-item">
                    <NavLink to={`/product/${val._id}`}>
                        <div className="cart-img">
                            {val?.images?.map((val) => {
                                return (
                                    <div key={val._id}>
                                        <Img src={val.url} alt="cart" />
                                    </div>
                                )
                            })}
                        </div>
                    </NavLink>
                    <div className="cart-content">
                        <p className='cart-category'>{val.category}</p>
                        <h5>{val.name}</h5>
                        <p className='cart-seller'>Seller : {val.seller}</p>
                        <p className='cart-price'>&#8377;{(val?.price * quantity).toLocaleString()} &nbsp;<del className='cart-delprice'>&#8377;{delprice.toFixed(0)}</del>&nbsp; <span className='cart-green'>17% off</span> </p>
                    </div>
                    <div className="cart-delivery-date">
                        <p>Delivery by Wed Jul 5 | <span className='cart-green'>Free</span> <del> &#8377;40</del></p>
                        <p className='inc-dec-quantity'>Quantity : {quantity}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSummary
