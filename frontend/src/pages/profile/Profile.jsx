import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileAsync } from '../../store/profileSlice';
import Editpassword from './Editpassword';
import { userAsync } from '../../store/userSlice';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';

const Profile = () => {

    const data = useSelector(state => state.user.userData);
    const loading = useSelector(state => state.user.loading);
    const [input, setinput] = useState({
        name: data?.name || "",
        email: data?.email || "",
        role: data?.role || "",
    });
    const [edit, setedit] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const change = (e) => {
        const { name, value } = e.target;
        setinput((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const savechanges = () => {
        dispatch(profileAsync(input));
        setedit(false);
    };

    const editprofile = () => {
        setedit(true);
    }

    function disabled() {
        if (edit === false) {
            return true;
        }
    };

    let token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            dispatch(userAsync());
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            {loading ?
                <Spinner /> :
                <div className="mainprofile">
                    <div className="left-profile">
                        <div className="profile-img">
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="profile" />
                        </div>
                        <div className="profile-content">
                            <h5>Welcome,&nbsp;<span className='profile-name'>{data.name}</span></h5>
                            {!edit ?
                                <button className="btn btn-primary btn-profile" onClick={editprofile}>Edit Profile</button> :
                                <button className="btn btn-primary btn-profile" onClick={savechanges}>Save Changes</button>
                            }
                            <Editpassword />
                        </div>
                    </div>
                    <div className="right-profile">
                        <div className="personal-profile">
                            <div className="profile-head">
                                <h4>Personal Information</h4>
                                <button type="button" className="btn btn-primary ratebtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Update password</button>
                            </div>
                            <div className="profile-input">
                                <input type="text" name="name" disabled={disabled()} onChange={change} defaultValue={data?.name} placeholder='Enter your name' />
                            </div>
                        </div>
                        <div className="email-profile">
                            <h4>Email Address</h4>
                            <div className="profile-input">
                                <input type="text" name="email" disabled={disabled()} onChange={change} defaultValue={data?.email} placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className="role-profile">
                            <h4>Role</h4>
                            <div className="profile-input">
                                <input type="text" name="role" defaultValue={data?.role} disabled={disabled()} onChange={change} placeholder='Enter your role : user | seller' />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
