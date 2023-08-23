import Navbar from './components/navbar/Navbar';
import Cateproduct from './pages/cateproducts/Cateproduct';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import SingleProDetails from './pages/singleproductdetails/SingleProDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/userAuthentication/Login';
import Register from './pages/userAuthentication/Register';
import Search from './pages/search/Search';
import Cart from './pages/cart/Cart';
import Forget from './pages/userAuthentication/Forget';
import Reset from './pages/userAuthentication/Reset';
import Profile from './pages/profile/Profile';
import Order from './pages/Orders/Order';
import Myorder from './pages/MyOrders/Myorder';
import SingleOrder from './pages/MyOrders/singleOrder/SingleOrder';
import RateFilterProduct from './pages/allproducts/RateFilterProduct';
import './App.css';
   
const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:category' element={<Cateproduct />} />
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
      </Router>
    </div>
  );
};

export default App;
