import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShipppingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListAdminScreen from './screens/ProductListAdminScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import './App.scss'
import AdminScreen from './screens/AdminScreen';

const App = () => {
  return (
    <Router>
      <header id="header">
      <Header />
      </header>
      <main>
        <Container className='py-3'>
          {/* <Row> */}
          {/* <Col><h1>Lets go</h1></Col> */}
          {/* <Routes> */}
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/admin' component={AdminScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShipppingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/userlist/' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' exact component={ProductListAdminScreen} />
          <Route path='/admin/productlist/:pageNumber' exact component={ProductListAdminScreen} />
          <Route path='/admin/product/:id/edit' exact component={ProductEditScreen} />
          <Route path='/search/:keyword' exact component={HomeScreen} />
          <Route path='/' exact component={HomeScreen} />
          <Route path='/page/:pageNumber' exact component={HomeScreen} />
          <Route path='/search/:keyword/page/:pageNumber' exact component={HomeScreen} />
          {/* </Routes> */}
          {/* </Row> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
