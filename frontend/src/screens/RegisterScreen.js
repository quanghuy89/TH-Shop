import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, password));
    //DISPATCH REGISTER
    if (password !== confirmPassword) {
      setMessage('Password not match !!! ')
    } else {
      dispatch(register(name,email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading &&<Loader/> }
      <Form onSubmit={submitHandler}>
        
      <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='name'
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}></FormControl>
        </FormGroup>
        
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

        <FormGroup controlId='confirmpassword'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type='password'
            value={confirmPassword}
            placeholder='Comfirm your password'
            onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
        </FormGroup>

        <Button type='submit' variant='primary' className='my-3' >
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have Account???
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
