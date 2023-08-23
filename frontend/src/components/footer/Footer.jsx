import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import { carouselData } from '../../JSONdata/dataOfCarousel'
import { useDispatch } from 'react-redux'
import { cateproductAsync } from '../../store/cateProductSlice'

const Footer = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    return (
        <>
            <footer>
                <div className="startfooter">
                    <h3 className="footer-head">ElectraSnap</h3>
                    <p className='footer-mobile'>we believe in providing you with a seamless and enjoyable shopping experience right from the comfort of your home. explore our vast collection of high-quality electronic products.</p>
                    <p className='footer-mobile'>Copyright<sup>&copy;</sup> 2023 electrasnap.com</p>
                </div>
                <div className="midfooter">
                    <h3 className="footer-head">Useful Links</h3>
                    <div className="allfooter">
                        <div className="first-midfooter">
                            <NavLink className="navlink-footer footer-mobile useful-links" to="/">Home</NavLink>
                            {token ?
                                <>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/cart">Cart</NavLink>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/myorders">Orders</NavLink>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/profile">Profile</NavLink>
                                </> :
                                <>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/login">Cart</NavLink>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/login">Orders</NavLink>
                                    <NavLink className="navlink-footer footer-mobile useful-links" to="/login">Profile</NavLink>
                                </>
                            }
                        </div>
                        <div className="second-midfooter">
                            {carouselData.slice(0, 4)?.map((val, id) => {
                                return (
                                    <div key={id} onClick={() => dispatch(cateproductAsync(val.category))}>
                                        <NavLink className="navlink-footer" to={`/products/${val.category}`}>
                                            <p className='footer-mobile'>{val.name}</p>
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="second-midfooter">
                            {carouselData.slice(4, 8)?.map((val, id) => {
                                return (
                                    <div key={id} onClick={() => dispatch(cateproductAsync(val.category))}>
                                        <NavLink className="navlink-footer" to={`/products/${val.category}`}>
                                            <p className='footer-mobile'>{val.name}</p>
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="endfooter">
                    <h3 className="footer-head">Contact</h3>
                    <p className='endfooter-name footer-mobile'><i className="fa-solid fa-user"></i> &nbsp;Abhishek Dobariya</p>
                    <p className='footer-mobile'><i className="fa-solid fa-phone"></i> +91 9265529857</p>
                    <p className='footer-mobile'><i className="fa-solid fa-envelope"></i> dobariyaabhishek8@gmail.com</p>
                    <p className='footer-mobile'><i className="fa-solid fa-location-dot"></i> Galath, Bhesan, Junagadh - 362020</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
