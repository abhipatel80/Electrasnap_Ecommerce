import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getorderAsync, neworderAsync } from '../../../store/orderSlice';
import CSC from './CSC';
import { useNavigate } from 'react-router-dom';

const Address = ({ data, price }) => {


  const { orderDetails, error } = useSelector(state => state.order);
  const findLastOrder = orderDetails?.at(orderDetails.length - 1);
  const orderData = findLastOrder?.shippingInfo;

  const [isError, setisError] = useState(error);
  const [input, setinput] = useState({
    username: orderData?.name || "",
    address: orderData?.address || "",
    pincode: orderData?.pincode || "",
    phoneNo: orderData?.phoneNo || "",
  });
  const [edit, setEdit] = useState(false);
  const [state, setstate] = useState(orderData?.state);
  const [country, setcountry] = useState(orderData?.country);
  const [city, setcity] = useState(orderData?.city);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartdata } = useSelector(state => state.cart);

  const filter = cartdata?.filter((val) => {
    return val.product._id === data._id;
  });

  let quantity = filter[0]?.quantity;

  useEffect(() => {
    dispatch(getorderAsync())
    // eslint-disable-next-line
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setinput((data) => {
      return {
        ...data,
        [name]: value
      }
    })
  };

  const submitOrder = () => {
    dispatch(neworderAsync({ input, data, quantity, price, city, state, country }));
  };

  const dataOfStateAndCountry = (city, state, country) => {
    setcity(city);
    setstate(state);
    setcountry(country);
  };

  if (isError === "Order placed successfully") {
    navigate("/myorders");
    setisError(null);
  };

  return (
    <>
      <div className="address-head">
        <h4 className='delivery-h4'>Delivery Address</h4>
        {orderData?.name === undefined || orderData?.address === undefined || orderData?.city === undefined || orderData?.phoneNo === undefined || orderData?.pincode === undefined || orderData?.state === undefined || orderData?.country === undefined ? null : <div className="allbtn-address">
          {!edit ?
            <button className='btn btn-primary btn-address edit-address btn-sm' onClick={() => setEdit(true)}>Edit Address</button> :
            null
          }
        </div>}
      </div>
      {typeof error !== "object" ? <div className="errorhandle ordererror" dangerouslySetInnerHTML={{ __html: error }}></div> : null}
      {orderData?.name === undefined || orderData?.address === undefined || orderData?.city === undefined || orderData?.phoneNo === undefined || orderData?.pincode === undefined || orderData?.state === undefined || orderData?.country === undefined ?
        <div className="addressinputs">
          <div className="orderAllInput">
            <div className="orderAddressInput">
              <label htmlFor="Name">Name</label>
              <input type="text" name="username" onChange={change} defaultValue={orderData?.name} placeholder='Enter name' />
            </div>
            <div className="orderAddressInput">
              <label htmlFor="Mobile number">Mobile number</label>
              <input type="number" name="phoneNo" onChange={change} defaultValue={orderData?.phoneNo} placeholder='Enter mobile number' />
            </div>
            <div className="orderAddressInput">
              <label htmlFor="Pincode">Pincode</label>
              <input type="number" name="pincode" onChange={change} defaultValue={orderData?.pincode} placeholder='Enter pincode' />
            </div>
          </div>
          <div className="orderAddressTextarea orderAddressInput">
            <label htmlFor="Address">Address</label>
            <textarea type="text" name="address" onChange={change} defaultValue={orderData?.address} placeholder='Enter address' />
          </div>
          <div className="orderAllInput">
            <CSC dataOfStateAndCountry={dataOfStateAndCountry} />
          </div>
          <button className="btn btn-primary placeorder-btn" onClick={submitOrder}>Place Order</button>
        </div>
        :
        edit ?
          <>
            <div className="addressinputs">
              <div className="orderAllInput">
                <div className="orderAddressInput">
                  <label htmlFor="Name">Name</label>
                  <input type="text" name="username" onChange={change} defaultValue={orderData?.name} placeholder='Enter name' />
                </div>
                <div className="orderAddressInput">
                  <label htmlFor="Mobile number">Mobile number</label>
                  <input type="number" name="phoneNo" onChange={change} defaultValue={orderData?.phoneNo} placeholder='Enter mobile number' />
                </div>
                <div className="orderAddressInput">
                  <label htmlFor="Pincode">Pincode</label>
                  <input type="number" name="pincode" onChange={change} defaultValue={orderData?.pincode} placeholder='Enter pincode' />
                </div>
              </div>
              <div className="orderAddressTextarea orderAddressInput">
                <label htmlFor="Address">Address</label>
                <textarea type="text" name="address" onChange={change} defaultValue={orderData?.address} placeholder='Enter address' />
              </div>
              <div className="orderAllInput">
                <CSC dataOfStateAndCountry={dataOfStateAndCountry} />
              </div>
            </div>
            <button className="btn btn-primary placeorder-btn" onClick={submitOrder}>Place Order</button>
          </>
          :
          <>
            <div className="showsavedaddress">
              <p>{orderData?.name}</p>
              <p>{orderData?.address}, {orderData?.city}, {orderData?.state} - {orderData?.pincode}, {orderData?.country}</p>
              <p>Phone Number : {orderData?.phoneNo}</p>
            </div>
            <button className="btn btn-primary placeorder-btn" onClick={submitOrder}>Place Order</button>
          </>
      }
    </>
  )
}


export default Address
