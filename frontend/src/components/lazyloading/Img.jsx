import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Img = ({ src, alt }) => {
    return (
        <>
            <LazyLoadImage src={src} alt={alt} />
        </>
    )
}

export default Img
