import axios from 'axios';
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
import { listProductDetails, updateProduct } from '../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdateAdmin = useSelector((state) => state.productUpdateAdmin);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdateAdmin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadingImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(true);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        {' '}
        Go back{' '}
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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
                placeholder='Enter name product.....'
                onChange={(e) => setName(e.target.value)}></FormControl>
            </FormGroup>

            <FormGroup controlId='Price'>
              <FormLabel>Price</FormLabel>
              <FormControl
                type='number'
                value={price}
                placeholder='Enter your price '
                onChange={(e) => setPrice(e.target.value)}></FormControl>
            </FormGroup>

            {/* <FormGroup controlId='formFile'>
              <FormLabel>Image upload</FormLabel>
              <FormControl
                type='text'
                value={image}
                placeholder='Enter image URL.... '
                onChange={(e) => setImage(e.target.value)}></FormControl>
              <Form.Control type='file' label='Choose File' onChange={uploadingImageHandler}>
                {uploading && <Loader />}
              </Form.Control>
                              </FormGroup> */}
                              
                              <Form.Group controlId="formFile" className="mb-3">
                                  <FormLabel>Image upload</FormLabel>
                                  <FormControl
                type='text'
                value={image}
                placeholder='Enter image URL.... '
                onChange={(e) => setImage(e.target.value)}></FormControl>
        <FormControl type="file" onChange={uploadingImageHandler}/>
      </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              ADD PRODUCT
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
