import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, NavLink } from 'react-router-dom';
import { Col, Row, ListGroup, Image,FormControl, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import { addToCart,removerFromCart } from '../actions/cartActions';
import './CartScreen.scss'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // const [qty, setqty] = useState('1');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
    
    const removerFromCartHandler =(id) => {
        // console.log('remove')
        dispatch(removerFromCart(id))
    }

    const handlerCheckOut = () => {
        history.push('/login?redirect=shipping')
    }

  return (
    <Row>
      <Col md={8}>
        <h1 className="heading-cart-screen">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty<Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                        <Col md={2}>{ item.price}</Col>
                        <Col md={2}>
                        <FormControl
                          style={{ width: '100%' }}
                          as='select'
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(addToCart(item.product,Number(e.target.value)));
                              }}>
                              {/* {console.log(...Array(product.countInStock).keys())} */}
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                        </Col>
                        <Col md={2}>
                            <Button type="button" variant='light' onClick={() => removerFromCartHandler(item.product)}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
          <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroupItem className="label-subtotal">
                          <h2 className="total-item-sub">Subtotal ({cartItems.reduce((total,item) => {
                              return total+item.qty
                          }, 0)}) items</h2>
                          
                          ${cartItems.reduce((total, item) => {
                            return total+item.qty * item.price
                          },0).toFixed(2)}
                      </ListGroupItem>
                      <ListGroupItem>
                          <Button type='button' className="btn-checkout btn-clock" disabled={cartItems.length===0} onClick={handlerCheckOut}>Check Out</Button>
                      </ListGroupItem>
                  </ListGroup>
              </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
