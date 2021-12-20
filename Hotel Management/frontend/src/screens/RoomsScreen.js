import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listRooms } from "../actions/roomActions";

function RoomsScreen({ history }) {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomList);
  const { error, loading, rooms } = roomList;

  let keyword = history.location.search;
  console.log("keyword in room is", keyword);

  useEffect(() => {
    dispatch(listRooms(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1>Available Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {rooms.map((room) => (
            <Col key={room._id} sm={12} ms={6} lg={4} xl={3}>
              <Product product={room} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RoomsScreen;
