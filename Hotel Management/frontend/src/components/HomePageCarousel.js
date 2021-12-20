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
      <Carousel.Item>
        <Link
          to={`https://cdn.discordapp.com/attachments/714109485899186306/865291284947533864/image0.jpg`}
        >
          <Image
            src={
              "https://cdn.discordapp.com/attachments/714109485899186306/865291284947533864/image0.jpg"
            }
            alt={"Ew"}
            style={{ borderRadius: "0%" , padding: "0px" }}
            className="d-block w-90"
            fluid
          />
          <Carousel.Caption className="carousel.caption">
            <h4>Night View</h4>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link
          to={`https://cdn.discordapp.com/attachments/714109485899186306/865287951785394186/image0.jpg`}
        >
          <Image
            src={
              "https://cdn.discordapp.com/attachments/714109485899186306/865287951785394186/image0.jpg"
            }
            alt={"Ew"}
            style={{ borderRadius: "0%" , padding: "0px" }}
            className="d-block w-90"
            fluid
          />
          <Carousel.Caption className="carousel.caption">
            <h4>Lake View</h4>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link
          to={`https://cdn.discordapp.com/attachments/714109485899186306/865288283357446194/image0.jpg`}
        >
          <Image
            src={
              "https://cdn.discordapp.com/attachments/714109485899186306/865288283357446194/image0.jpg"
            }
            alt={"Ew"}
            style={{ borderRadius: "0%" , padding: "0px" }}
            className="d-block w-90"
            fluid
          />
          <Carousel.Caption className="carousel.caption">
            <h4>Swimming Pool View </h4>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarousel;
