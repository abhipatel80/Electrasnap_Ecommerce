import React from 'react';
import ReactStars from 'react-rating-stars-component';

const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 13 : 25,
    isHalf: true,
}

const Star = ({ rating, numofreviews }) => {
    return (
        <>
            <ReactStars className="mobile-star" {...options} value={rating} />
            <p className='mobile-review'>({numofreviews} Reviews)</p>
        </>
    )
}

export default Star
