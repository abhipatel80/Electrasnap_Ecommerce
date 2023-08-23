import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { input } from '../../store/inputSlice'
import { getcartAsync } from '../../store/cartSlice'
import { getlogoutAsync } from '../../store/loginSlice'
import './navbar.scss'

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let inpdata = useSelector(state => state.input.value);
  const { cartdata } = useSelector(state => state.cart);

  const change = (e) => {
    dispatch(input(e.target.value));
  };

  const inputsubmit = (e) => {
    if (e.key === "Enter" && inpdata.length > 0) {
      navigate('/search')
    }
  }

  let token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getcartAsync())
    // eslint-disable-next-line
  }, [token])

  return (
    <>
      <nav>
        <ul className='mainul'>
          <li><NavLink className="navlinknav first-li electrasnap" to="/">ElectraSnap</NavLink>
          </li>
          <div className="searchnav">
            <input type="search" onChange={change} onKeyUp={inputsubmit} name="search" id="search" placeholder='Search for products, brands and more' />
          </div>
          <div className="right">
            {token ?
              <li><NavLink className="navlinknav" to="/cart"><i className="fa-solid nav-icons fa-lg fa-cart-shopping" title="Cart"></i><sup className='ml-1 sup'>{cartdata?.length <= 0 ? null : cartdata?.length}</sup></NavLink></li> :
              <li><NavLink className="navlinknav" to="/login"><i className="fa-solid nav-icons fa-lg fa-cart-shopping" title="Cart"></i></NavLink></li>}

            {!token ? (
              <li><NavLink className="navlinknav loginbtn" to="/login">Login</NavLink></li>
            ) : (
              <div className="dropdown">
                <i className="fa-solid dropdown-i dropdown-toggle fa-user fa-xl profile-btn" data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/profile" className="navlinknav profile dropdown-item" title="Profile"><i className="fa-solid fa-user drop-icon"></i>My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/myorders" className="navlinknav profile dropdown-item" title="Orders"><i className="fa-solid fa-bag-shopping drop-icon"></i>My Orders</NavLink>
                  </li>
                  <li>
                    <a className="navlinknav dropdown-item profile" title='Logout' onClick={() => dispatch(getlogoutAsync())} href="/login"><i className="fa-solid drop-icon fa-right-from-bracket"></i>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
