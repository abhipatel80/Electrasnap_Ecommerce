import React, { useEffect, useState } from 'react'
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { forgetAsync } from '../../store/forgetSlice';
import { useNavigate } from 'react-router-dom';

const Forget = () => {

    const [input, setinput] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.forget);

    const change = (e) => {
        setinput(e.target.value);
    }

    const forget = () => {
        dispatch(forgetAsync(input))
    }

    let token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [token])

    return (
        <>
            <div className="mainforget">
                {typeof error !== "object" ? <div className={error === "User not found with this email" ? "errorhandlepassword" : "successmsg"} dangerouslySetInnerHTML={{ __html: error }}></div> : null}
                <h5>Enter only that email which you are use in your account</h5>
                <div className="input">
                    <input type="email" name="email" id="email" onChange={change} placeholder='Enter your Email' />
                </div>
                <div className="loginbtn">
                    <button className="btn btn-primary" onClick={forget}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Forget
