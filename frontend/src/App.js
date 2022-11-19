import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          {/* <Row> */}
          {/* <Col><h1>Lets go</h1></Col> */}
          {/* <Routes> */}
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id'  component={ProductScreen} />
          <Route path='/login'  component={LoginScreen} />
          <Route path='/cart/:id?'  component={CartScreen} />
          {/* </Routes> */}
          {/* </Row> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

