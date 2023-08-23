import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproductsAsync } from '../../../store/productSlice';
import CardSlider from '../../../cardSlider/CardSlider';
import Skeleton from '../../../components/skeleton/Skeleton';

const Featured = () => {

    const { products, loading } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getproductsAsync());
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {loading ? <>
                <Skeleton />
            </> :
                <CardSlider title="Featured Products" navlink="/allproduct" data={products} />
            }
        </>
    )
}

export default Featured
