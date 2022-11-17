import React,{ useState,useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'
import axios from 'axios'
const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('hello')
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products')

      setProducts(data)
      // res.data
    }

    fetchProducts()
  },[])
  
  return (
      <>
          <h1> Last product</h1>
          <Row>
              {products.map(product => (
                  <Col key={ product._id } sm={12} md={4} lg={3} xl={3}>
                        <Product product={product}/>
                  </Col>
              ))}
          </Row>
    </>
  )
}

export default HomeScreen