import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import products from '../products';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CarouselProduct from '../components/CarouselProduct';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { listProducts } from '../actions/productAction';
const HomeScreen = ({match}) => {
  // const [products, setProducts] = useState([]);

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  // console.log(productList);
  const { loading, error, products,page,pages } = productList;
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

    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);

  // const products =[]

  return (
    <>
       {!keyword ? (
        <CarouselProduct />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>List Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
            <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={4} lg={3} xl={3}>
              <Product product={product} />
            </Col>
          ))}
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword ? keyword:''}/>
              </>
      )}
    </>
  );
};

export default HomeScreen;
