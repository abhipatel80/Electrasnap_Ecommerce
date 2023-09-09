import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from './components/spinner/Spinner';
import './App.css';

const Login = React.lazy(() => import('./pages/userAuthentication/Login'));
const Register = React.lazy(() => import('./pages/userAuthentication/Register'));
const Forget = React.lazy(() => import('./pages/userAuthentication/Forget'));
const Reset = React.lazy(() => import('./pages/userAuthentication/Reset'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));

const Cart = React.lazy(() => import('./pages/cart/Cart'));
const Search = React.lazy(() => import('./pages/search/Search'));

const CateProduct = React.lazy(() => import('./pages/cateproducts/Cateproduct'));
const RateFilterProduct = React.lazy(() => import('./pages/allproducts/RateFilterProduct'));
const SingleProDetails = React.lazy(() => import('./pages/singleproductdetails/SingleProDetails'));

const Order = React.lazy(() => import('./pages/Orders/Order'));
const Myorder = React.lazy(() => import('./pages/MyOrders/Myorder'));
const SingleOrder = React.lazy(() => import('./pages/MyOrders/singleOrder/SingleOrder'));

const Home = React.lazy(() => import('./pages/home/Home'));
const Footer = React.lazy(() => import('./components/footer/Footer'));
const Navbar = React.lazy(() => import('./components/navbar/Navbar'));

const App = () => {

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/products/:category' element={<CateProduct />} />
            <Route exact path='/product/:id' element={<SingleProDetails />} />
            <Route exact path='/allproduct' element={<RateFilterProduct />} />

            <Route exact path='/search' element={<Search />} />
            <Route exact path='/cart' element={<Cart />} />

            <Route exact path='/order/:id' element={<Order />} />
            <Route exact path='/myorders' element={<Myorder />} />
            <Route exact path='/singleorder/:id' element={<SingleOrder />} />

            <Route exact path='/login' element={<Login />} />
            <Route exact path='/forget' element={<Forget />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/password/reset/:resetoken' element={<Reset />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
