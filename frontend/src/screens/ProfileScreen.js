import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails,updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log(userDetails)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userLogin)
    
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {  success } = userUpdateProfile;

  //   const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
          console.log(user.name)
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo,user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password not match !!! ');
    } else {
      //DISPATCH UPDATE PROFILE
        dispatch(updateUserProfile({id:user._id,name,email,password}))
    }
  };
 
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Update Success</Message>}
        {loading && <Loader />}
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
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Orders Here</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
