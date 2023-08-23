import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Allproducts from '../../components/allproductswithfilter/Allproducts';

const Cateproduct = () => {

    const catedata = useSelector(state => state.cateproduct.cateproducts);
    const loading = useSelector(state => state.cateproduct.loading);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <Allproducts data={catedata} loading={loading} />
        </>
    )
}

export default Cateproduct
