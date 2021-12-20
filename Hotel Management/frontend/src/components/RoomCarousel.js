import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

function RoomCarousel() {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  console.log(product.imageII);
  console.log(product.imageIII);
  console.log(product.image);
  return (
    <div>
      <Carousel id="rooms" pause="hover" className="bg-dark">
        <Carousel.Item>
          <Link to={`${product.image}`}>
            <Image
              src={product.image}
              style={{ borderRadius: "0%" , padding: "0px" }}
              alt="Normal 1"
              className="d-block w-100"
              fluid
            />
          </Link>
          <Carousel.Caption className="carousel.caption">
            <h4>View 1</h4>
          </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
          <Link to={`#`}>
            <Image
              src={product.imageII}
              style={{ borderRadius: "0%", padding: "0px" }}
              alt="Normal 2"
              className="d-block w-100"
              fluid
            />
          </Link>
          <Carousel.Caption className="carousel.caption">
            <h4> View 2 </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`#`}>
            <Image
              src={product.imageIII}
              style={{ borderRadius: "0%"  , padding: "0px" }}
              alt="Bathroom"
              className="d-block w-100"
              fluid
            />
          </Link>
          <Carousel.Caption className="carousel.caption">
            <h4 color="dark"> Bathroom </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default RoomCarousel;
