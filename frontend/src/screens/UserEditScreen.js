import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormCheck,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserAdmin } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
  console.log(userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAdmin({ _id: userId, name, email, isAdmin }));
  };
  console.log(isAdmin);

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        {' '}
        Go back{' '}
      </Link>
      <FormContainer>
        <h1>Update User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <FormGroup controlId='isadmin'>
              <FormLabel>Is Admin</FormLabel>
              <FormCheck
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></FormCheck>
            </FormGroup>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
