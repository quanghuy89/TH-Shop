import { useEffect } from 'react';
import {
  Button, Card, Col, Image, ListGroup,
  ListGroupItem, Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckOutStep from '../components/CheckOutStep';
import Message from '../components/Message';

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate
  

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
 // eslint-disable-next-line
  },[history,success])

  console.log(cart);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice:cart.totalPrice
      
    }))
  };
  //Calculate prices for
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => Number((acc + item.price * item.qty).toFixed(2)),
    0
  );
  cart.shippingPrice = cart.shippingPrice > 100 ? 0 : 30;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number((cart.shippingPrice + cart.itemsPrice+cart.taxPrice).toFixed(2));


  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <ListGroup>
                <h2>Shipping</h2>
                <p>
                  <strong>
                    Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                    {cart.shippingAddress.country}
                  </strong>
                </p>
                <strong>Phone Number: {cart.shippingAddress.numberPhone}</strong>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              <b>{cart.paymentMethod}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, idx) => (
                    <ListGroupItem key={idx}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} =${+(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPrice} $</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice} $</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>{cart.taxPrice} $</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice} $</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  style={{ width: '100%' }}
                  type='button'
                  className='btn-clock'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}>
                  {' '}
                  Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;