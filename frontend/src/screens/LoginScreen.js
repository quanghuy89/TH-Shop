import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);

       if (userInfo.isAdmin) {
        history.push('/admin/home');
      }
    }

   
    }, [history, userInfo, redirect]);
    
    console.log(userInfo)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            value={email}
            placeholder='Enter your email address'
            onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}></FormControl>
        </FormGroup>

        <Button type='submit' variant='primary' className='my-3'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer???
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
