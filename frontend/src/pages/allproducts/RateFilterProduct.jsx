import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rateproductsAsync } from '../../store/productSlice';
import Allproducts from '../../components/allproductswithfilter/Allproducts';

const RateFilterProduct = () => {

    const { rateProducts, loading } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        dispatch(rateproductsAsync());
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Allproducts data={rateProducts} loading={loading} />
        </>
    )
}

export default RateFilterProduct
