import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup, FormLabel, FormControl,Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProducts,deleteProduct} from '../actions/productAction';
 

const ProductListAdminScreen = ({history,match}) => {
    const dispatch = useDispatch();


    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList;
    
    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;
  
  const productDelete = useSelector((state) => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success } = productDelete;



    
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    },[dispatch,history,userInfo,success])
    
    console.log(products);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete??')) {
            // dispatch(deleteUsers(id))
          dispatch(deleteProduct(id))
          //delete product
            
        }
  }
  
  const createProductHandle = (product) => {
    console.log('add product')
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className='my-3' onClick={createProductHandle}>
            <i className='fas fa-plus mx-1'></i>
             Create New Product 
      </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
              <Table striped bordered variant ="dark" hover responsive className="table-sm">
                  
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
                <td>{product.category}
                </td>
                <td>{product.brand}
                </td>
                <td className="justify-content-center">
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button  variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

              </Table>
          )}
    </>
  )
}

export default ProductListAdminScreen