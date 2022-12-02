import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button,ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createOrder, getOrderDetails } from '../actions/orderActions.js';


const OrderScreen = ({ match }) => {
  const orderId = match.params.id



  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch,orderId])

  if (!loading) {
    console.log(order);
    console.log(order.orderItems)
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }




  // if (!loading) {
  //   //   Calculate prices
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2)
  //   }

  //   order.itemsPrice = addDecimals(
  //     order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //   )
  // }







  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
    <>
            <Link to='/' className='btn btn-light my-3'>
        {' '}
        Go Home</Link>
      <h1>Order {order._id}</h1>
      
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <ListGroup>
                <h2>Shipping</h2>
                <strong>Name: {order.user.name}</strong>
                <p>
                  Gmail:{' '}
                  <a style={{ textDecoration: 'underline' }} href={`mailto${order.user.email}`}>
                    {order.user.name}
                  </a>
                </p>
                <p>
                  <strong>
                    Address: {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.country}
                  </strong>
                </p>
                <strong>Phone Number: {order.shippingAddress.numberPhone}</strong>
                {order.isDelivered ? (
                  <Message variant='success'>Đang giao hàng</Message>
                ) : (
                  <Message variant='danger'>Chưa giao hàng</Message>
                )}
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              <b>{order.paymentMethod}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, idx) => (
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
                  <Col>{order.itemsPrice} $</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} $</Col>
                </Row>
              </ListGroupItem>

              {/* <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} $</Col>
                </Row>
              </ListGroupItem> */}

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>{+(order.totalPrice).toFixed(2)} $</Col>
                </Row>
              </ListGroupItem>

              {/* <ListGroupItem>
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
              </ListGroupItem> */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  
}

export default OrderScreen