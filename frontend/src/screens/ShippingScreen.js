import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckOutStep from '../components/CheckOutStep';
import FormContainer from '../components/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'

const ShipppingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress}=cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [numberPhone, setNumberPhone] = useState(shippingAddress.numberPhone);

    
    const dispatch = useDispatch();


    const submitHandler = (e) => {
      e.preventDefault();
        console.log('shipping')
        dispatch(saveShippingAddress({ address, city, postalCode, country, numberPhone }))

        history.push('/payment')
  };

  return (
      <FormContainer>
          <CheckOutStep step1 step2 />
      <h1>Check out</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='address'>
          <FormLabel>Address</FormLabel>
          <FormControl
            type='text'
            value={address}
            required
            placeholder='Enter your address'
            onChange={(e) => setAddress(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='city'>
          <FormLabel>City</FormLabel>
          <FormControl
            type='text'
            value={city}
            required
            placeholder='Enter your city'
            onChange={(e) => setCity(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='country'>
          <FormLabel>Country</FormLabel>
          <FormControl
            type='text'
            value={country}
            required
            placeholder='Enter your Country'
            onChange={(e) => setCountry(e.target.value)}></FormControl>
        </FormGroup>

        {/* <FormGroup controlId='postalCode'>
          <FormLabel>PostalCode</FormLabel>
          <FormControl
            type='text'
            value={postalCode}
            required
            placeholder='Enter your postalCode'
            onChange={(e) => setPostalCode(e.target.value)}></FormControl>
        </FormGroup> */}

        <FormGroup controlId='numberPhone'>
          <FormLabel>Number Phone</FormLabel>
          <FormControl
            type='text'
            value={numberPhone}
            //   required
            placeholder='Enter your Number Phone'
            onChange={(e) => setNumberPhone(e.target.value)}></FormControl>
              </FormGroup>
              
              <Button variant='primary' type='submit' className='my-4'> Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShipppingScreen;
