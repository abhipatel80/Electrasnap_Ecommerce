import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerAsync } from '../../store/loginSlice';

const Register = () => {

  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
  }

  const register = () => {
    dispatch(registerAsync(input));
  }

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
        <h2 className='text-center mt-5 mb-4'>Register</h2>
        {typeof error !== "object" ? <div className="errorhandle" dangerouslySetInnerHTML={{ __html: error }}></div> : null}
        <div className="allinput">
          <div className="input">
            <input type="text" name="name" id="name" onChange={change} placeholder='Enter your Name' />
          </div>
          <div className="input">
            <input type="email" name="email" id="email" onChange={change} placeholder='Enter your Email' />
          </div>
          <div className="input">
            <input type="password" name="password" id="password" onChange={change} placeholder='Enter your Password' />
          </div>
          <div className="input">
            <input type="text" name="role" id="role" onChange={change} placeholder='Enter your Role : user | seller' />
          </div>
          <div className="msg">
            <p>Already have an account, <NavLink to="/login">Login</NavLink> now</p>
          </div>
          <div className="loginbtn">
            <button className="btn btn-primary" onClick={register} >Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
