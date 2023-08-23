import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchproductsQuery } from '../../store/searchSlice';
import Allproducts from '../../components/allproductswithfilter/Allproducts';
import { NavLink } from 'react-router-dom';

const Search = () => {

    const input = useSelector(state => state.input.value);
    const { data, isLoading } = useSearchproductsQuery(input);

    let loading = isLoading;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <>
            {input !== "" ?
                <Allproducts data={data} loading={loading} /> : (
                    <div className='no-item'>
                        <h2>No Product Found</h2>
                        <NavLink to="/">
                            <button className='btn noresult-btn btn-primary'>Shop Now</button>
                        </NavLink>
                    </div>
                )
            }
        </>
    )
}

export default Search
