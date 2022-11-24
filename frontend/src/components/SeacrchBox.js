import React,{ useState, useEffect }from 'react'
import { Form, Button, FormControl, } from "react-bootstrap";
import './SearchBox.scss'
const SeacrchBox = ({history}) => {

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()){
            history.push(`/search/${keyword}`);
        } else {
            history.push(`/`)
        }
    }


  return (
      <Form onSubmit={submitHandler} inline className='form-search'>
          <FormControl type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search product...."  className='mr-sm-2 ml-sm-5'>
          </FormControl>
          <Button type="submit" variant="outline-success" className='p-2 mx-2'>Search</Button>
    </Form>
  )
}

export default SeacrchBox