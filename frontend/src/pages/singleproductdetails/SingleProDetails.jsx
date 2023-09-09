import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { TbTruckDelivery } from 'react-icons/tb';
import { TbReplace } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';
import { MdSecurity } from 'react-icons/md';
import { getsingleproAsync } from '../../store/singleDetailSlice';
import { cartAsync } from '../../store/cartSlice';
import { delreviewAsync } from '../../store/reviewSlice';
import { userAsync } from '../../store/userSlice';
import SimilarProduct from './SimilarProduct';
import Star from '../../components/ratingstar/Star';
import Img from '../../components/lazyloading/Img';
import Spinner from '../../components/spinner/Spinner';
import './style.scss';

const SingleProDetails = () => {

    const dispatch = useDispatch();
    const { singleproduct, loading } = useSelector(state => state.singleproduct);
    let data = singleproduct;
    const user = useSelector(state => state.user.userData);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getsingleproAsync(id));
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        dispatch(userAsync());
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line
    }, []);

    const delprice = data.price * 1.2;
    const discount = data.price * 100 / delprice - 100;
    const token = localStorage.getItem("token");

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <div className="mainsinglepro">
                        <div className="left-div">
                            <div className="product-img">
                                {data?.images?.map((val, id) => {
                                    return (
                                        <div key={id}>
                                            <Img src={val.url} alt="singleProduct" />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="singleprobtn">
                                {token ?
                                    <NavLink to={data.stock <= 0 ? null : "/cart"}>
                                        <button
                                            className="btn btn-primary btn-lg cartbtn"
                                            disabled={data.stock <= 0 ? true : false}
                                            onClick={() => dispatch(cartAsync(data))}>ADD TO CART
                                        </button>
                                    </NavLink> :
                                    <NavLink to="/login">
                                        <button className="btn btn-primary btn-lg cartbtn">ADD TO CART</button>
                                    </NavLink>
                                }
                                {token ?
                                    <NavLink to={data.stock <= 0 ? null : `/order/${id}`}>
                                        <button
                                            className="btn btn-primary btn-lg cartbtn"
                                            disabled={data.stock <= 0 ? true : false}>BUY NOW
                                        </button>
                                    </NavLink> :
                                    <NavLink to="/login">
                                        <button className="btn btn-primary btn-lg cartbtn">BUY NOW</button>
                                    </NavLink>
                                }
                            </div>
                        </div>
                        <div className="product-div">
                            <h2>{data.name}</h2>
                            <Star rating={data.ratings} numofreviews={data?.numOfReviews} />
                            <div className="price">
                                <p className='price'>&#8377;{Math.round(data.price).toLocaleString()} &nbsp;<del className='delprice'>&#8377;{Math.round(delprice).toLocaleString()}</del>&nbsp; <span className='green'>{Math.round(Math.abs(discount))}% off</span> </p>
                            </div>
                            <p className='desc'>{data.description}</p>
                            <div className="allicons">
                                <div className="first">
                                    <div className='logo'><TbTruckDelivery /></div>
                                    <h5>Free Delivery</h5>
                                </div>
                                <div className="first">
                                    <div className='logo'><TbReplace /></div>
                                    <h5>15 Days Replacement</h5>
                                </div>
                                <div className="first">
                                    <div className='logo'><TbTruckDelivery /></div>
                                    <h5>Flipkart Delivered</h5>
                                </div>
                                <div className="first">
                                    <div className='logo'><MdSecurity /></div>
                                    <h5>2 Year Warranty</h5>
                                </div>
                            </div>
                            <hr />
                            <div className="morefeature">
                                <p>Product ID : <span>{id}</span></p>
                                <p>Seller : <span>{data.seller}</span></p>
                                {data.stock > 0 ? <p className='instock'>In stock</p> : <p className='outofstock'>Out of stock</p>}
                            </div>
                            <div className="specification">
                                <h2>Specifications</h2>
                                <h4>General</h4>
                                <div className="all-title">
                                    <div className="left-title">
                                        <p>Sales Package</p>
                                        <p>Model Name</p>
                                        <p>Color</p>
                                        <p>Battery Backup</p>
                                        <p>Power Supply</p>
                                        <p>Processor Name</p>
                                        <p>Processor Generation</p>
                                        <p>Processor Speed</p>
                                        <p>Opeating System</p>
                                        <p>SSD</p>
                                        <p>RAM</p>
                                        <p>Screen Resolution</p>
                                    </div>
                                    <div className="right-title">
                                        <p>Laptop, Battery, Adapter, Cables and User Manuals</p>
                                        <p>15IHU6</p>
                                        <p>Shadow Black</p>
                                        <p>Upto 8 hours</p>
                                        <p>135W Slim Tip (3-pin)</p>
                                        <p>Intel core i3</p>
                                        <p>11th Gen</p>
                                        <p>2.5 GHz upto max turbo frequency at 4.5 Ghz</p>
                                        <p>64 bit - Windows 11 Home</p>
                                        <p>512 GB</p>
                                        <p>8 GB</p>
                                        <p>1920 x 1080 Pixel</p>
                                    </div>
                                </div>
                            </div>
                            <div className="reviews">
                                <div className="rateuser">
                                    <h2>Ratings & Reviews</h2>
                                </div>
                                <div className="show-all-rating">
                                    {data?.reviews?.map((val) => {
                                        let reviewid = val._id;
                                        let check = user?._id === val.user;
                                        return (
                                            <div className="usereviews" key={val._id}>
                                                <p className='username'>
                                                    <span className='useratestar'>{val.rating} <AiFillStar className='aistar' />
                                                    </span> &nbsp; {val.name}
                                                    {token ?
                                                        check ? <i className="del-rev-btn fa-solid fa-trash" onClick={() => dispatch(delreviewAsync({ reviewid, id }))} ></i> : null
                                                        : null
                                                    }
                                                </p>
                                                <p className='rev-comment'>{val.comment}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SimilarProduct category={data.category} />
                </>
            }
        </>
    )
}

export default SingleProDetails
