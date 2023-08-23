import React from 'react'

const Pricedetails = ({ delprice, save, totalamt, discount, data }) => {
    return (
        <>
            <div className="main-right-cart">
                <div className="right-cart">
                    <h5>PRICE DETAILS</h5>
                    <hr />
                    <div className="all-price">
                        <div className="left-price">
                            <p>Price ({data?.length} items)</p>
                            <p className='cart-totalamt'> &#8377;{delprice?.toLocaleString()}</p>
                        </div>
                        <div className="left-price">
                            <p>Discount</p>
                            <p className='cart-totalamt cart-green'> -&#8377;{discount?.toLocaleString()}</p>
                        </div>
                        <div className="left-price">
                            <p>Delivery Charges</p>
                            <p className='cart-totalamt cart-green'>Free</p>
                        </div>
                    </div>
                    <hr className='hr' />
                    <div className="totalamt">
                        <p>Total Amount</p>
                        <p className='cart-totalamt'>&#8377;{totalamt?.toLocaleString()}</p>
                    </div>
                    <hr className='hr' />
                    <p className='cart-green saveonorder'>You will save &#8377;{save?.toLocaleString()} on this order</p>
                </div>
                <p className='safe-para ml-5'><i className="fa-solid fa-shield"></i> &nbsp;Safe and Secure Payments.Easy returns.100% Authentic products.</p>
            </div>
        </>
    )
}

export default Pricedetails
