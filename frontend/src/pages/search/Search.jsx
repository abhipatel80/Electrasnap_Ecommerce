import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchproductsQuery } from '../../store/searchSlice';
import Allproducts from '../../components/allproductswithfilter/Allproducts';
import { NavLink } from 'react-router-dom';
import usePage from '../../components/infinitescroll/usePage';

const Search = () => {

    const input = useSelector(state => state.input.value);
    const { data, isLoading } = useSearchproductsQuery(input);

    const { page, setpage } = usePage();
    let loading = isLoading;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    function fetchData() {
        setpage(page + 1);
    };

    return (
        <>
            {input !== "" ?
                <Allproducts data={data} loading={loading} fetchData={fetchData} /> : (
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
