import React, { useEffect } from 'react'
import Pricedetails from '../cart/Pricedetails'
import { useDispatch, useSelector } from 'react-redux';
import Address from './address/Address';
import OrderSummary from './Order Summary/OrderSummary';
import Payment from './Payment/Payment';
import { getsingleproAsync } from '../../store/singleDetailSlice';
import { useParams } from 'react-router-dom';
import './style.scss';

const Order = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { singleproduct } = useSelector(state => state.singleproduct);
    let data = [singleproduct];

    const { cartdata } = useSelector(state => state.cart);

    const filter = cartdata?.filter((val) => {
        return val.product._id === singleproduct._id;
    });

    let quantity = filter[0]?.quantity || 1;

    useEffect(() => {
        dispatch(getsingleproAsync(id));
        // eslint-disable-next-line 
    }, [id]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line
    }, []);

    const delprice = Math.round(data?.reduce((acc, val) => (val.price * 1.2) * quantity + acc, 0));
    const price = Math.round(data?.reduce((acc, val) => (val.price) * quantity + acc, 0));
    const discount = delprice - price;
    const totalamt = delprice - discount;
    const save = delprice - totalamt;

    return (
        <>
            <div className="mainorderdiv">
                <div className="left-order">
                    <OrderSummary delprice={delprice} val={singleproduct} quantity={quantity} />
                    <Address data={singleproduct} price={price} />
                    <Payment />
                </div>
                <div className="right-order">
                    <Pricedetails totalamt={totalamt} discount={discount} delprice={delprice} data={data} save={save} />
                </div>
            </div>
        </>
    )
}

export default Order
