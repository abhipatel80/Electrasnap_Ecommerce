import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getloginAsync } from '../../store/loginSlice';
import './style.scss';

const Login = () => {

  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(state => state.login);

  const change = (e) => {
    const { name, value } = e.target;
    setinput((data) => {
      return {
        ...data,
        [name]: value
      }
    })
  };

  const login = () => {
    dispatch(getloginAsync(input));
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate("/")
      window.location.reload();
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <div className="mainlogin">
        <h2 className='text-center mt-5 mb-4'>Login</h2>
        {typeof error !== "object" ? <div className="errorhandle" dangerouslySetInnerHTML={{ __html: error }}></div> : null}
        <div className="allinput">
          <div className="input">
            <input type="email" name="email" id="email" onChange={change} placeholder='Enter your Email' />
          </div>
          <div className="input">
            <input type="password" name="password" id="password" onChange={change} placeholder='Enter your Password' />
          </div>
          <NavLink to="/forget">
            <p className="forget-password">forget password ?</p>
          </NavLink>
          <div className="msg">
            <p>don't have an account, <NavLink to="/register">Register</NavLink> now</p>
          </div>
          <div className="loginbtn">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
