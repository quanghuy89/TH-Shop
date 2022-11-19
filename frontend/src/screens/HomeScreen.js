import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch ,useSelector} from 'react-redux'
import products from '../products';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import {listProducts} from '../actions/productAction'
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList)
  
  // console.log(productList);
  const { loading, error, products } = productList;
  // console.log(products);

  useEffect(() => {
    // console.log('hello');
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products');
    //   setProducts(data);
    //   // res.data
    // };
    // fetchProducts();

    //use redux

    dispatch(listProducts())

  }, [dispatch]);

  // const products =[]

  return (
    <>
      <h1> Lastest product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ):
        <Row>
      {
        products.map((product) => (
          <Col key={product._id} sm={12} md={4} lg={3} xl={3}>
            <Product product={product} />
          </Col>
        ))
      }
      </Row>
    }
    </>
  );
};

export default HomeScreen;
