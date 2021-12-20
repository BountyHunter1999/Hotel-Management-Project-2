import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
  // console.log("CURRENT PRODUCT", product)
  // console.log("IsRoom", product.isRoom)
  return (
    <Card className="my-3 p-3 rounded">
      {/* <h2> INSIDE OF PRODUCT</h2> */}
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {/* {product.rating} from {product.numReviews} reviews */}
            <Rating value={product.rating} text={ `${product.numReviews} reviews`} color={'#f8e825'} />
          </div>
        </Card.Text>

        <Card.Text as="h3">Rs.{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
