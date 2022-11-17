import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios'
// import products from '../products';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  // const product = products.find((p) => p._id === match.params.id);

  useEffect(() => {
    console.log('hello')
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      // res.data
    }

    fetchProduct()
  },[match])
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroupItem>
            <ListGroupItem>Price: {product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col>Price:</Col>
                <Col><strong>${product.price }</strong></Col>
              </Row>
            </ListGroupItem>
          
          

            <ListGroupItem>
              <Row>
                <Col>Staus:</Col>
                <Col><strong>${product.countInStock>0?"In Stock":"Out Stock" }</strong></Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Button style={{width: "100%"}} className="btn-block" type='button' disabled={product.countInStock===0}>Add to Cart</Button>
            </ListGroupItem>

            </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
