import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {listOrdersAdmin } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrdersAdmin());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);
    console.log(orders);


  return (
    <>
      
      <Link to='/admin/home' className='btn btn-light my-3'>
        {' '}
        Go back</Link>
      <h1>User List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>SHIPMENT</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user&& order.user.name}</td>
                <td>
                {order.createdAt.substring(0, 10)}
                </td>
                <td>
                {+(order.totalPrice).toFixed(2)}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='dark' className='btn-sm'>
                     Details
                    </Button>
                  </Link>
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
