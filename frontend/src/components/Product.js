import React from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Product.scss';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card border="info" className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
              <Card.Img className="img__product__home__screen" src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
