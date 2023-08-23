import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addreviewAsync } from '../../store/reviewSlice';
import ReactStars from 'react-rating-stars-component';
import './style.scss';

const Reviews = ({ productId }) => {

    const [rating, setrating] = useState();
    const [comment, setcomment] = useState();

    const dispatch = useDispatch();

    const options = {
        edit: true,
        color: 'rgba(20,20,20,0.1)',
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 30 : 35,
        isHalf: true
    };

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Review</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className='ratemsgpara'>Note :- Enter Rating and Message both are compulsary, Otherwise Review not submited.</p>
                            <div className="input">
                                <div className="reviewstar">
                                    <ReactStars {...options} value={rating} onChange={(e) => setrating(e)} />
                                </div>
                            </div>
                            <div className="input">
                                <input type="text" name="comment" onChange={(e) => setcomment(e.target.value)} placeholder='Enter message' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" onClick={() => dispatch(addreviewAsync({ comment, productId, rating }))} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews
