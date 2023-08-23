import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Card from '../cards/Card';
import filter from '../filters/filter';
import Spinner from '../spinner/Spinner';
// import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';

const Allproducts = ({ data, loading }) => {

    const [value, setvalue] = useState("");

    let maindata = filter(data, value);

    return (
        <>
            {loading ? <Spinner /> :

                <>
                    <div className="mainallproducts">
                        {data?.length <= 0 ?
                            <div className='no-item no-product-found'>
                                <h2>No Product Found</h2>
                                <NavLink to="/">
                                    <button className='btn noresult-btn btn-primary'>Shop Now</button>
                                </NavLink>
                            </div> :
                            <div className="mainfilterdiv">
                                <div className="headproduct">
                                    <h2 className='headcate'>{maindata?.length} Products</h2>
                                    <div className="price-drop-down">
                                        <select name="filter" id="filter" onChange={(e) => setvalue(e.target.value)} className='filter-drop-down'>
                                            <option value="Select Option">Select Option</option>
                                            <option value="Price (High to Low)">Price (High to Low)</option>
                                            <option value="Price (Low to High)">Price (Low to High)</option>
                                            <option value="Product (A - Z)">Product (A - Z)</option>
                                            <option value="Product (Z - A)">Product (Z - A)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {/* <InfiniteScroll
                        dataLength={data?.length}
                        next={fetchData}
                        hasMore={true}
                        loader={<Spinner />}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    > */}
                    <div className="cateproduct">
                        <Card data={maindata} />
                    </div>
                    {/* </InfiniteScroll> */}
                </>
            }
        </>
    )
}

export default Allproducts
