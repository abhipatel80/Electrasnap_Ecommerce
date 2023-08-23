import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetpassAsync } from '../../store/resetpasswordSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Reset = () => {

    const [input, setinput] = useState({ password: "", confirmpassword: "" });
    const { error } = useSelector(state => state.reset);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetoken } = useParams();

    const change = (e) => {
        const { name, value } = e.target;
        setinput((data) => {
            return {
                ...data,
                [name]: value
            }
        });
    };

    const reset = () => {
        dispatch(resetpassAsync({ input, resetoken }));
    };

    let token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            <div className="mainforget">
                {error ? <div className="errorhandle" dangerouslySetInnerHTML={{ __html: error }}></div> : null}
                <div className="input">
                    <input type="password" name="password" id="password" onChange={change} placeholder='New password' />
                </div>
                <div className="input">
                    <input type="password" name="confirmpassword" id="confirmpassword" onChange={change} placeholder='Confirm password' />
                </div>
                <div className="loginbtn">
                    <button className="btn btn-primary" onClick={reset}>Reset Password</button>
                </div>
            </div>
        </>
    )
}
export default Reset
