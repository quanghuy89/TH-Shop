import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap';
import './ProductScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productAction';
// import axios from 'axios'
// import products from '../products';

const ProductScreen = ({ history,match }) => {
  //quanity product

  const [qty, setQty] = useState(1);

  //use redux
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  //use axios
  // const [product, setProduct] = useState({});

  // const product = products.find((p) => p._id === match.params.id);

  // useEffect(() => {
  //   console.log('hello')
  //   const fetchProduct = async () => {
  //     const {data} = await axios.get(`/api/products/${match.params.id}`)
  //     setProduct(data)
  //     // res.data
  //   }

  //   fetchProduct()
  // },[match])

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);


  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // const product = {};

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image className="img__product" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>{product.name}</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>Price: {product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Staus:</Col>
                    <Col>
                      <strong>${product.countInStock > 0 ? 'In Stock' : 'Out Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quanity: </Col>
                      <Col>
                        <FormControl
                          style={{ width: '100%' }}
                          as='select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                              }}>
                              {/* {console.log(...Array(product.countInStock).keys())} */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                {/* <ListGroupItem>
                  <Row>
                    <Col>Staus:</Col>
                    <Col><strong>${product.countInStock > 0 ? "In Stock" : "Out Stock"}</strong></Col>
                  </Row>
                </ListGroupItem> */}

                <ListGroupItem>
                  <Button
                    style={{ width: '100%' }}
                    className='btn-block'
                    type='button'
                        disabled={product.countInStock === 0}
                      onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
