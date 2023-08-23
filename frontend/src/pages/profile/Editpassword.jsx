import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { passwordAsync } from '../../store/profileSlice';

const Editpassword = () => {

    const [input, setinput] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    });

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.profile);

    const change = (e) => {
        const { name, value } = e.target;
        setinput((val) => {
            return {
                ...val,
                [name]: value
            }
        })
    }

    const passwordupdate = () => {
        dispatch(passwordAsync(input));
    };

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {error !== null ? <div className={error !== "Password Changed Successfully" ? "errorhandlepassword" : "successmsg"} dangerouslySetInnerHTML={{ __html: error }}></div> : null}
                            <div className="input">
                                <input type="password" onChange={change} name="oldpassword" id="oldpassword" placeholder='Old password' />
                            </div>
                            <div className="input">
                                <input type="password" onChange={change} name="newpassword" id="newpassword" placeholder='New password' />
                            </div>
                            <div className="input">
                                <input type="password" onChange={change} name="confirmpassword" id="confirmpassword" placeholder='Confirm password' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={passwordupdate} className="btn btn-primary">Update Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editpassword
