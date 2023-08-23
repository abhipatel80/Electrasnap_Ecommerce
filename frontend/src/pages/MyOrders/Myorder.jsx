import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getorderAsync } from '../../store/orderSlice';
import Img from '../../components/lazyloading/Img';
import { NavLink } from 'react-router-dom';
import './style.scss';
import Spinner from '../../components/spinner/Spinner';

const Myorder = () => {

    const dispatch = useDispatch();
    const { orderDetails, loading } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(getorderAsync());
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line
    }, []);

    if (orderDetails?.length <= 0) {
        return (
            <div className='no-item'>
                <h2>Your haven't order yet !</h2>
                <NavLink to="/">
                    <button className='btn noresult-btn btn-primary'>Shop Now</button>
                </NavLink>
            </div>
        )
    }

    return (
        <>
            <div className="myorders-main">
                {loading ? <Spinner /> :
                    <div className="all-orders-main">
                        {orderDetails?.map((val, id) => {
                            const orderData = val.orderItems;
                            const { image, name, price, quantity } = orderData;
                            return (
                                <NavLink className="navlink-order" key={id} to={`/singleorder/${val._id}`}>
                                    <div className="all-orders">
                                        <div className="order-img">
                                            <Img src={image} alt="order" />
                                        </div>
                                        <div className="order-content">
                                            {val.orderStatus === "Processing" ?
                                                <p className='order-status'>Status : &#x1F7E0; {val.orderStatus}</p> :
                                                val.orderStatus === "Cancelled" ?
                                                    <p className='order-status'>Status : &#128308; {val.orderStatus}</p> :
                                                    <p className='order-status'>Status : &#x1F7E2; {val.orderStatus}</p>
                                            }
                                            <h5 className='order-name'>{name.slice(0, 20)}</h5>
                                            <p className='cart-price myorder-price'>&#8377;{price?.toLocaleString()} &nbsp;<del className='cart-delprice'>&#8377;{(price * 1.2)?.toLocaleString()}</del>&nbsp; <span className='cart-green'>17% off</span> </p>
                                            <p className='order-quantity'>Quantity : {quantity}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Myorder
