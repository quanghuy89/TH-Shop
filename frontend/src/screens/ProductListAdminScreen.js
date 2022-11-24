import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import FormContainer from '../components/FormContainer';
import { listProducts, deleteProduct, createProduct } from '../actions/productAction';
import { PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListAdminScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber||1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products,page,pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success } = productDelete;

  // const productCreate = useSelector((state) => state.productCreate);
  // const { loading: loadingCreate, error: errorCreate, success:successCreate,product:createdProduct } = productCreate;

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    // if (userInfo && userInfo.isAdmin) {
    //   dispatch(listProducts());
    // } else {
    //   history.push('/login');
    // }

    if (!userInfo ||!userInfo.isAdmin) {
      history.push('/login');
    }

    
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('',pageNumber));
    }
  }, [dispatch, history, userInfo, success,successCreate,createdProduct,pageNumber]);

  console.log(products);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete??')) {
      // dispatch(deleteUsers(id))
      dispatch(deleteProduct(id));
      //delete product
    }
  };

  const createProductHandle = () => {
    dispatch(createProduct())
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandle}>
            <i className='fas fa-plus mx-1'></i>
            Create New Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
            <>
        <Table striped bordered variant='dark' hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRANCH</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className='justify-content-center'>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
            </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
              </>
      )}
    </>
  );
};

export default ProductListAdminScreen;
