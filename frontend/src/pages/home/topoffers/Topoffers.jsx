import React, { useEffect } from 'react';
import CardSlider from '../../../cardSlider/CardSlider';
import { useDispatch, useSelector } from 'react-redux';
import { rateproductsAsync } from '../../../store/productSlice';
import Skeleton from '../../../components/skeleton/Skeleton';

const Topoffers = () => {

    const dispatch = useDispatch();
    const { rateProducts, loading } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(rateproductsAsync());
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {loading ? <>
                <Skeleton />
            </> :
                <CardSlider title="Top Rated Products" navlink="/allproduct" data={rateProducts} />
            }
        </>
    )
}

export default Topoffers

