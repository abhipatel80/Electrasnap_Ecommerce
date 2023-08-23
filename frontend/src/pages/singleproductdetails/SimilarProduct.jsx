import React, { useEffect } from 'react'
import CardSlider from '../../cardSlider/CardSlider';
import { useDispatch, useSelector } from 'react-redux';
import { cateproductAsync } from '../../store/cateProductSlice';

const SimilarProduct = ({ category }) => {

    const dispatch = useDispatch();
    const catedata = useSelector(state => state.cateproduct.cateproducts);

    useEffect(() => {
        dispatch(cateproductAsync(category));
        // eslint-disable-next-line
    }, [category]);

    return (
        <>
            <CardSlider title="Similar Products" navlink="/allproduct" data={catedata} />
        </>
    )
}

export default SimilarProduct
