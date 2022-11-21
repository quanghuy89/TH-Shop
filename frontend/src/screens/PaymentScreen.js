import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckOutStep from '../components/CheckOutStep';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({history}) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('shipping');
    dispatch(savePaymentMethod(paymentMethod));

    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckOutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>

          <Form.Label as='legend'>Select Method</Form.Label>

              
          <Col>

            {/* <Form.Check
              type='radio'
              label='Stripe'
              name='paymentMethod'
              value='Stripe'
              id='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
            <Form.Check
              // className='my-3'
              type='radio'
              label='PayPal or Credit Card'
              name='paymentMethod'
              value='PayPal'
              checked
              id='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>


        <Button variant='primary' type='submit' className='my-4'>
          {' '}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
