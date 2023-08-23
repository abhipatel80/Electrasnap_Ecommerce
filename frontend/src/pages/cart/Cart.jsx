import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deletecartAsync, editcartAsync, getcartAsync, increaseQuantity } from '../../store/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Img from '../../components/lazyloading/Img';
import Pricedetails from './Pricedetails';
import Spinner from '../../components/spinner/Spinner';
import './style.scss';

const Cart = () => {

    const { cartdata, singlecart, loading } = useSelector(state => state.cart);
    const product = cartdata.map(val => val.product);

    let token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quantity = singlecart?.quantity || 1;

    useEffect(() => {
        if (token) {
            dispatch(getcartAsync());
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const increment = (_id, cartId, quantity, stock) => {
        if (stock > quantity) {
            dispatch(increaseQuantity(_id));
            quantity += 1;
        }
        dispatch(editcartAsync({ cartId, quantity }));
    };

    const decrement = (_id, cartId, quantity) => {
        dispatch(decreaseQuantity(_id));
        quantity -= 1;
        dispatch(editcartAsync({ cartId, quantity }));
    };

    const delprice = Math.round(product?.reduce((acc, val) => (val?.price * 1.2) * quantity + acc, 0));
    const price = Math.round(product?.reduce((acc, val) => (val?.price) * quantity + acc, 0));
    const discount = delprice - price;
    const totalamt = delprice - discount;
    const save = delprice - totalamt;

    return (
        <>
            {loading ?
                <Spinner /> :
                cartdata?.length <= 0 ?
                    <div className='no-item'>
                        <h2>Your cart is empty!</h2>
                        <NavLink to="/">
                            <button className='btn noresult-btn btn-primary'>Shop Now</button>
                        </NavLink>
                    </div> :
                    <div className="maincart">
                        <div className="left-cart">
                            {cartdata && cartdata?.map((val) => {
                                const product = val?.product;
                                const delprice = product?.price * 1.2;
                                const discount = product?.price * 100 / delprice - 100;
                                return (
                                    <div className="map_main_cart_div" key={val?._id}>
                                        <div className="cart-item">
                                            <div className="left-img-btn-div">
                                                <div className="cart-img">
                                                    <NavLink className="navlinkcard" to={`/product/${product?._id}`}>
                                                        <Img src={product?.images[0]?.url} alt="cart" />
                                                    </NavLink>
                                                </div>
                                                <div className="iteminc">
                                                    <button
                                                        className={val?.quantity === 1 ? "plusbtn-disabled" : "plusbtn"}
                                                        disabled={val?.quantity === 1 ? true : false}
                                                        onClick={() => decrement(val?.product._id, val?._id, val?.quantity)}>
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <input type="text" value={val?.quantity} onChange={(e) => e.target.value} className='cart-input' />
                                                    <button
                                                        className={val?.quantity === 5 || product?.stock <= val?.quantity ? "plusbtn-disabled" : "plusbtn"}
                                                        disabled={val?.quantity === 5 || product?.stock <= val.quantity ? true : false}
                                                        onClick={() => increment(val?.product._id, val?._id, val?.quantity, product?.stock)}>
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-content">
                                                <p className='cart-category'>{product?.category}</p>
                                                <h4>{product?.name}</h4>
                                                <p className='cart-seller'>Seller : {product?.seller}</p>
                                                <p className='cart-price'>&#8377;{(product?.price * val?.quantity)?.toLocaleString()} &nbsp;<del className='cart-delprice'>&#8377;{Math.round(delprice * val?.quantity)?.toLocaleString()}</del>&nbsp; <span className='cart-green'>{Math.round(Math.abs(discount))}% off</span> </p>
                                                <button className="cart-btn btn btn-danger btn-sm" onClick={() => dispatch(deletecartAsync(val?._id))}>Remove</button>
                                                {product?.stock >= val?.quantity ?
                                                    <NavLink to={`/order/${product._id}`}>
                                                        <button className="cart-btn btn btn-primary place-order btn-sm">Place Order</button>
                                                    </NavLink> :
                                                    <button disabled className="cart-btn btn btn-primary place-order btn-sm">Place Order</button>
                                                }
                                            </div>
                                            <div className="cart-delivery-date">
                                                <p>Delivery by Wed Jul 5 | <span className='cart-green'>Free</span> <del> &#8377;40</del></p>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                        <Pricedetails totalamt={totalamt} discount={discount} delprice={delprice} data={product} save={save} />
                    </div>
            }
        </>
    )
}

export default Cart
