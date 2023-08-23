import React, { useEffect } from 'react'
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrderAsync, getsingleorderAsync } from '../../../store/orderSlice';
import { NavLink, useParams } from 'react-router-dom';
import Img from '../../../components/lazyloading/Img';
import Reviews from '../../reviews/Reviews';
import Spinner from '../../../components/spinner/Spinner';

const SingleOrder = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { singleOrderDetails, loading } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getsingleorderAsync(id));
        // eslint-disable-next-line
    }, [id]);

    const addressData = singleOrderDetails?.shippingInfo;
    const orderData = singleOrderDetails?.orderItems;

    return (
        <>
            <div className="mainSingleOrder">
                {loading ? <Spinner /> :
                    <>
                        <div className="left-order-details">
                            <div className="singleorder-img">
                                <NavLink className="navlinkcard" to={`/product/${orderData?.product}`}>
                                    <Img src={orderData?.image} alt="order" />
                                </NavLink>
                            </div>
                            <div className="order-content">
                                {singleOrderDetails?.orderStatus === "Processing" ?
                                    <p className='order-status'>Status : &#x1F7E0; {singleOrderDetails?.orderStatus}</p> :
                                    singleOrderDetails?.orderStatus === "Cancelled" ?
                                        <p className='order-status'>Status : &#128308; {singleOrderDetails?.orderStatus}</p> :
                                        <p className='order-status'>Status : &#x1F7E2; {singleOrderDetails?.orderStatus}</p>
                                }
                                <h5>{orderData?.name.slice(0, 30)}</h5>
                                <p className='cart-price'>&#8377;{orderData?.price?.toLocaleString()} &nbsp;<del className='cart-delprice'>&#8377;{(orderData?.price * 1.2)?.toLocaleString()}</del>&nbsp; <span className='cart-green'>17% off</span> </p>
                                <p className='order-quantity'>Quantity : {orderData?.quantity}</p>
                            </div>
                            <div className="cart-delivery-date single-order-delivery">
                                {singleOrderDetails?.orderStatus === "Cancelled" ? null : <p>Delivery by Wed Jul 5 | <span className='cart-green'>Free</span> <del> &#8377;40</del></p>
                                }
                                <p className='showdate order-status'>Ordered At : {new Date(singleOrderDetails?.createdAt).toLocaleDateString('en-IN')}</p>
                                <div className="singleorder-button">
                                    {singleOrderDetails?.orderStatus === "Delivered" ?
                                        <button
                                            type="button"
                                            className="btn btn-primary ratebtn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                        >Rate Product
                                        </button> :
                                        singleOrderDetails?.orderStatus === "Cancelled" ? null :
                                            <button
                                                className="btn btn-primary ratebtn"
                                                onClick={() => dispatch(cancelOrderAsync(id))}>
                                                Cancel Order
                                            </button>
                                    }
                                </div>
                                <Reviews productId={orderData?.product} />
                            </div>
                        </div>
                        <div className="right-address">
                            <div className="order-saved-address">
                                <div className="show-address">
                                    <h4>Delivery Address</h4>
                                    <p className='address-name'>{addressData?.name}</p>
                                    <p>{addressData?.address}, {addressData?.city}, {addressData?.state} - {addressData?.pincode}, {addressData?.country}</p>
                                    <p>Phone Number : {addressData?.phoneNo}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SingleOrder
