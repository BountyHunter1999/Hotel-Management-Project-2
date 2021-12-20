import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopFoods, listTopProducts } from "../actions/productActions";
import { listTopRooms } from "../actions/roomActions";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const {
    error: errorProductTop,
    loading: loadingProductTop,
    products,
  } = productTop;

  const roomTop = useSelector((state) => state.roomTop);
  const { error: errorRoomTop, loading: loadingRoomTop, rooms } = roomTop;

  const foodTop = useSelector((state) => state.foodTop);
  const { error: errorFoodTop, loading: loadingFoodTop, foods } = foodTop;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  console.log(products);

  return loadingProductTop ? (
    <Loader />
  ) : errorProductTop ? (
    <Message variant="danger">{errorProductTop}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              
            />
            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (Rs.{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
